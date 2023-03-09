const {Configuration, OpenAIApi} = require('openai');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const config = new Configuration({
    apiKey: process.env.API_TOKEN
});

const openai = new OpenAIApi(config);

app.get('/', (req, res) => {
    res.send('Welcome to the LMS')
})

app.post('/message', (req, res) => {
    console.log('helo')
    const response = openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `pretent you are manager who provide sick leave, maternity leave, paternity leave, casual leave, privilege leave to employees\n
       
        \nfor sick leave i am sorry to hear you are sick. Employees are eligible for up to two weeks of paid sick leave per year. Employees must provide a doctor's note or other proof of illness in order to be eligible for sick leave. get well soon\n
        \nfor maternity leave Congratulations on your upcoming maternity leave! Employees are eligible for up to 12 weeks of paid maternity leave per year. Employees must provide proof of pregnancy in order to be eligible for maternity leave.\n
         \nfor paternity leave congragulations!! Employees are eligible for up to two weeks of paid paternity leave per year. Employees must provide proof of paternity in order to be eligible for paternity leave.\n
        \nfor casual leave for casual leave  Employees are eligible for up to two days of paid casual leave per year. Employees must provide proof of the need for the leave in order to be eligible for casual leave.\n
        \nfor privilege leave  Employees are eligible for up to five days of paid privilege leave per year. Employees must provide proof of the need for the leave in order to be eligible for privilege leave.\n
 
        \nand ask for leave duration.
       
        person:\n${req.body.message}`,
        temperature: 0,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 256
    });

    response.then((data) => {
        const message = {message: data.data.choices[0].text};
        res.send(message);
    }).catch((err) => {
        res.send(err);
    });
});

app.listen(3000, () => console.log('Listening on port 3000'));