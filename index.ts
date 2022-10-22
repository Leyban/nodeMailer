import express from 'express'
import nodemailer from 'nodemailer'
require('dotenv').config()
import cors from 'cors'

const app = express();
const PORT = process.env.PORT || 3001
const corsOption: cors.CorsOptions = {
    origin: ['https://leyban.github.io', "https://studio.apollographql.com", 'http://localhost:3000'],
    optionsSuccessStatus: 200 // for legacy browsers (IE11, smartTV) choke on 204
}
app.use(cors(corsOption));

app.use(express.json());

app.post('/api/mail', (req, res) => {
    try {
        const contents = req.body

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        })
        const mailOptions = {
            from: contents.email,
            to: 'leybanlazada@gmail.com',
            subject: `Portfolio Mail - ${contents.name}, ${contents.company}`,
            text: `${contents.message} \n\n${contents.name} \n${contents.company} \n${contents.email}`
        }
        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                throw new Error(error.message)
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).send('Mail Sent')
            }
        })
    } catch (error) {
        res.status(400).send('An error occured: ' + error)
    }

})

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});