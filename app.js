const { response, raw } = require('express');
const express = require('express');
const fs = require('fs');

const readJSONFile = (file) => {
    const rawData = fs.readFileSync(file);
    const parsedData = JSON.parse(rawData);
    return parsedData;
}

const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// creare server
const app = express(); // initilizez o aplicatie de tip express

// pentru a avea acces la body-ul unui request - body de tip json
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public/images'));
app.use('/static', express.static('site'));

app.get('/', (req, res) => {
    res.redirect('/static/GreekGods.html');
});

/*app.get('/', (request, response) => {
    console.log(request);
    response.send('Hello World!');
});*/

app.get('/quizresults/random', (req, res) => {
    const data = readJSONFile('./db/quizresults.json');
    const index = randomNumber(0, data.length - 1);

    res.send(data[index]);
});

app.get('/quizresults/:id', (req, res) => {
    const id = req.params.id;
    const data = readJSONFile('./db/quizresults.json');

    const question = data.find(question => question.id === parseInt(id));

    res.send(question);
});

app.get('/quizresults', (req, res) => {
    //citim din fisierul quizresults.json
    const data = readJSONFile('./db/quizresults.json');
    //trimitem datele catre client
    res.status(200).send(data);
});

app.post('/quizresults', (req, res) => {
    const newQuestion = req.body.question;

    const data = readJSONFile('./db/quizresults.json');

    newQuestion.id = uuid();

    data.push(newQuestion);

    fs.writeFileSync('./db/quizresults.json', JSON.stringify(data));

    res.send(newQuestion);
});

// request cu parametru 
//  delete + /quizresults/asdfghjkl
app.delete('/quizresults/:id', (req, res) => {
    const id = req.params.id;

    const data = readJSONFile('./db/quizresults.json');

    console.log(typeof data[0].id, typeof id);

    const newData = data.filter(question => question.id !== parseInt(id));

    fs.writeFileSync('./db/quizresults.json', JSON.stringify(newData));

    res.send();
});

app.get('*', function(req, res) {
    res.send('ERROR404', 404);
});

// asculta toate requesturile care vin pe portul 5000
app.listen(5000, () => {
    console.log('server is running on port 5000');
});