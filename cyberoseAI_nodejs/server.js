const express = require('express');
const path = require('path');
const app = express();
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
initializeApp({
  credential: applicationDefault()
});
const db = getFirestore();

app.use(express.static(__dirname + '/public'));

// GET index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use(express.urlencoded({extended:false}))
app.use(express.json())

// POST at index.html
app.post('/index.html', (req, res) => {
  console.log(req.body);
  var data = JSON.stringify(req.body);
  console.log("REQUEST "+data+" **********");
  res.send(data+" recieved!");
  var email = data.split('"')[3]
  const userEmail = {"email": email};

  // save in firebase
  const emails = db.collection('users');

  emails.doc(email).set({
    email: userEmail
  });
  console.log(email+" has been successfully subscribed!");
});

// serve on port 3000
app.listen(3000, () => {
  console.log('Server listening on port 3000!');
});

