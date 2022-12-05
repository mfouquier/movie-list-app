const express = require('express')
const app = express();
const cors = require('cors');
const port = 3001;
const knex = require('knex')(require('./knexfile.js')["development"]);

app.use(express.json());
app.use(cors());

// app.get('/', (req, res) => {
//   res.status(200).send("Hello from the Back-End")
// })

app.get('/', (req, res) => {
  const q = req.query.title;
  if (q !== undefined) {
    knex.from('movies').select('*').whereILike('title', `%${q}%`)
      .then(data => {
        res.status(200).send(data)
      })
  } else {
    knex('movie_list')
      .select('*').from('movies').then(data => {
        res.status(200).send(data)
      })
  }
})

app.post('/', async (req, res) => {
  console.log(req.body.title, req.body.image)
  await knex('movies').insert({
    'title': req.body.title,
    'image': req.body.image
  })
  res.status(201).send('Posting stuff')
})

// app.get('/search', (req, res) => {
//   const q = req.query.title;
//   console.log(q)
//   knex.from('movies').select('*').whereILike('title', `%${q}%`)
//     .then(data => {
//       res.status(200).send(data)
//     })
// })

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})