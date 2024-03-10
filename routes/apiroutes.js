// Connect routes to data.

const fs = require('fs');
const path = require('path');
// Routing
module.exports = function (app) {

  // GET request
  app.get('/api/notes', function(req, res) {
    
    var notes = fs.readFileSync(path.join(__dirname, '../db/db.json'));
    notes = JSON.parse(notes);
    res.json(notes);
  });

  // POST request
  app.post('/api/notes', function(req, res) {
    var newNote = {
      title: req.body.title,
      text: req.body.text,
    };

    

    var notes = fs.readFileSync(path.join(__dirname, '../db/db.json'));
    newNote.id = String(notes.length);
    notes = JSON.parse(notes);
    notes.push(newNote);

    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(notes));

    res.json(notes);
  });

  // DELETE request
  app.delete('/api/notes/:noteId', function(req, res) {
    const noteId = req.params.noteId;

    console.log(noteId);

  var notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json')));

  notes = notes.filter(note => {
        return note.id !== noteId;
    });

    console.log(notes);

    fs.writeFileSync(__dirname+ '/../db/db.json', JSON.stringify(notes));
    res.json("You have deleted your note successfully.");
  });
};