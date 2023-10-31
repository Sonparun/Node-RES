const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();

const db = new sqlite3.Database('./Database/Movie.sqlite');

app.use(express.json());

// สร้างตาราง Movie And Country
db.run(`CREATE TABLE IF NOT EXISTS MovieAndCountry (
    ID INTEGER PRIMARY KEY,
    MovieID TEXT,
    CountryID TEXT
)`);

// สร้างตาราง Movie
db.run(`CREATE TABLE IF NOT EXISTS Movie (
    ID INTEGER PRIMARY KEY,
    Name TEXT,
    Data TEXT,
    Pic TEXT
)`);

// สร้างตาราง Country
db.run(`CREATE TABLE IF NOT EXISTS Country (
    ID INTEGER PRIMARY KEY,
    Name TEXT,
    Data TEXT,
    Pic TEXT
)`);

// CRUD สำหรับ MovieAndCountry
app.get('/MovieAndCountry', (req, res) => {
    db.all('SELECT * FROM MovieAndCountry', (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(rows);
        }
    });
});

app.get('/MovieAndCountry/:id', (req, res) => {
    db.get('SELECT * FROM MovieAndCountry WHERE ID = ?', req.params.id, (err, row) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (!row) {
                res.status(404).send('MovieAndCountry Not found');
            } else {
                res.json(row);
            }
        }
    });
});

app.post('/MovieAndCountry', (req, res) => {
    const MovieAndCountry = req.body;
    db.run('INSERT INTO MovieAndCountry (MovieID, CountryID) VALUES (?, ?)', MovieAndCountry.MovieID, MovieAndCountry.CountryID, function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            MovieAndCountry.ID = this.lastID;
            res.send(MovieAndCountry);
        }
    });
});

app.put('/MovieAndCountry/:id', (req, res) => {
    const MovieAndCountry = req.body;
    db.run('UPDATE MovieAndCountry SET MovieID = ?, CountryID = ? WHERE ID = ?', MovieAndCountry.MovieID, MovieAndCountry.CountryID, req.params.id, function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(MovieAndCountry);
        }
    });
});

app.delete('/MovieAndCountry/:id', (req, res) => {
    db.run('DELETE FROM MovieAndCountry WHERE ID = ?', req.params.id, function (err) {  
        if (err) {
            res.status(500).send(err);
        } else {
            res.send({});
        }
    });
});

// CRUD สำหรับ Movie
app.get('/Movie', (req, res) => {
    db.all('SELECT * FROM Movie', (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(rows);
        }
    });
});

app.get('/Movie/:id', (req, res) => {
    db.get('SELECT * FROM Movie WHERE ID = ?', req.params.id, (err, row) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (!row) {
                res.status(404).send('Movie Not found');
            } else {
                res.json(row);
            }
        }
    });
});

app.post('/Movie', (req, res) => {
    const Movie = req.body;
    db.run('INSERT INTO Movie (Name, Data, Pic) VALUES (?, ?, ?)', Movie.Name, Movie.Data, Movie.Pic, function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            Movie.ID = this.lastID;
            res.send(Movie);
        }
    });

});

app.put('/Movie/:id', (req, res) => {
    const Movie = req.body;
    db.run('UPDATE Movie SET Name = ?, Data = ?, Pic = ? WHERE ID = ?', Movie.Name, Movie.Data, Movie.Pic, req.params.id, function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(Movie);
        }
    });
});

app.delete('/Movie/:id', (req, res) => {
    db.run('DELETE FROM Movie WHERE ID = ?', req.params.id, function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send({});
        }
    });
});

// CRUD สำหรับ Country
app.get('/Country', (req, res) => {
    db.all('SELECT * FROM Country', (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(rows);
        }
    });
});

app.get('/Country/:id', (req, res) => {
    db.get('SELECT * FROM Country WHERE ID = ?', req.params.id, (err, row) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (!row) {
                res.status(404).send('Country Not found');
            } else {
                res.json(row);
            }
        }
    });
});

app.post('/Country', (req, res) => {
    const Country = req.body;
    db.run('INSERT INTO Country (Name, Data, Pic) VALUES (?, ?, ?)', Country.Name, Country.Data, Country.Pic, function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            Country.ID = this.lastID;
            res.send(Country);
        }
    });
});

app.put('/Country/:id', (req, res) => {
    const Country = req.body;
    db.run('UPDATE Country SET Name = ?, Data = ?, Pic = ? WHERE ID = ?', Country.Name, Country.Data, Country.Pic, req.params.id, function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(Country);
        }
    });
});

app.delete('/Country/:id', (req, res) => {
    db.run('DELETE FROM Country WHERE ID = ?', req.params.id, function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send({});
        }
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

