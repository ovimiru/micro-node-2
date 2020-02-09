const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const { Client } = require('pg');
const connectionString = 'postgres://swgfcvgpdzfngk:f18ef9a38f07f6305729863fb75a5bd4feaeb66bb10b9f809be0600933fa3e51@ec2-79-125-4-72.eu-west-1.compute.amazonaws.com:5432/dbp0qah9e25gsu?ssl=true';
// const connectionString = 'postgres://vjtuoqtv:tIIWnTOJLJBSyI96Eiayw4wv_OeDelYk@rajje.db.elephantsql.com:5432/vjtuoqtv';
const client = new Client({
    connectionString: connectionString
});
client.connect();

const courses = [
  { id: 1, name: "Algorithms" },
  { id: 2, name: "Software Engineering" },
  { id: 3, name: "Computer Software" }
];

let user = [] ;

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/courses', function(req, res) {
    res.send(JSON.stringify(courses));
    // res.render('pages/db', results );
  })
    .get('/users', function (req, res,) {
        // res.send(JSON.stringify(courses));
        client.query('SELECT * FROM students ', function (err, result) {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }
            for(let i=0;i<result.rowCount;i++){
                user [i] = result.rows[i];
            }
            res.status(200).send(JSON.stringify(user));
            user = [];
        });
    })
    .get('/cursuri', function (req, res,) {
      // res.send(JSON.stringify(courses));
      client.query('SELECT * FROM cursuri ', function (err, result) {
          if (err) {
              console.log(err);
              res.status(400).send(err);
          }
          for(let i=0;i<result.rowCount;i++){
              user [i] = result.rows[i];
          }
          res.status(200).send(JSON.stringify(user));
          user = [];
      });
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
