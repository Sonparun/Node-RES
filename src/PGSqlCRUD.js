const express = require('express');
const Sequelize = require('sequelize');
const app = express();

const dbUrl='postgres://webadmin:KMIhke69785@node50179-sonparun-js.proen.app.ruk-com.cloud:11542/Books'
const sequelize=new Sequelize(dbUrl);

app.use(express.json());

// const sequelize = new Sequelize('database', 'username', 'password', {
//   host: 'localhost',
//   dialect: 'sqlite',
//   storage: './Database/SQBooks.sqlite',
// });

const Book = sequelize.define('book', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false, // แก้จาก allowNUll เป็น allowNull
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false, // แก้จาก allowNUll เป็น allowNull
  },
});

sequelize.sync();

app.get('/books', (req, res) => {
  Book.findAll()
    .then((books) => {
      res.json(books);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get('/books/:id', (req, res) => {
  Book.findByPk(req.params.id)
    .then((book) => {
      if (!book) {
        res.status(404).send('Book not found');
      } else {
        res.json(book);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post('/books', (req, res) => {
  Book.create(req.body)
    .then((book) => {
      res.send(book);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.put('/books/:id', async (req, res) => { // เพิ่ม async และ await ในการใช้งาน
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      res.status(404).send('Book not found');
    } else {
      await book.update(req.body);
      res.send(book);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete('/books/:id', async (req, res) => { // เพิ่ม async และ await ในการใช้งาน
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      res.status(404).send('Book not found');
    } else {
      await book.destroy();
      res.send({});
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
