"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nodemailer_1 = __importDefault(require("nodemailer"));
require('dotenv').config();
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
const corsOption = {
    origin: ['https://leyban.github.io/', "https://studio.apollographql.com", 'http://localhost:3000'],
    optionsSuccessStatus: 200 // for legacy browsers (IE11, smartTV) choke on 204
};
app.use((0, cors_1.default)(corsOption));
app.use(express_1.default.json());
app.post('/api/mail', (req, res) => {
    try {
        const contents = req.body;
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
        const mailOptions = {
            from: contents.email,
            to: 'leybanlazada@gmail.com',
            subject: `Portfolio Mail - ${contents.name}, ${contents.company}`,
            text: `${contents.message} \n\n${contents.name} \n${contents.company} \n${contents.email}`
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                throw new Error(error.message);
            }
            else {
                console.log('Email sent: ' + info.response);
                res.status(200).send('Mail Sent');
            }
        });
    }
    catch (error) {
        res.status(400).send('An error occured: ' + error);
    }
});
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
