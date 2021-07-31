const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')

const dotenv = require('dotenv');
dotenv.config()

const app = express()
const mongoose = require('mongoose')
const sendEmail = require('./utils/sendEmail')
const templateRoutes = require('./routes/template')

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'frontend/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'frontend/build/index.html'))
    })
}

app.get('/', (req, res) => {
    res.send('Server is running...')
})
app.use('/template', templateRoutes);

const convertMail = (text, name, subject, deadline) => {
    text = text.replace('$NAME$', name)
    text = text.replace('$SUBJECT$', subject)
    text = text.replace('$DEADLINE$', deadline)
    return text
}

app.post('/sendemail', async (req, res) => {
    try {
        const { subject, name, email, deadline, text } = req.body;
        const from = 'congdanhnguyen116@gmail.com'
        const promises = []
        for (let i = 0; i < name.length; i++) {
            promises.push(sendEmail(email[i], from, subject, convertMail(text, name[i], subject, deadline[i])))
        }
        Promise.all(promises)
            .then(() => res.status(200).json({ message: "Email was sent" }))
    } catch (e) {
        res.status(404).json({ message: e.message });
    }


})
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${ PORT }`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);

