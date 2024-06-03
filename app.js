const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const path = require('path');

app.use(bodyParser.json({ limit: '100mb' }));
const port = 3000;
app.use(cors());

const uri = "mongodb+srv://krishidesai2003:nirma123@cluster0.vatkc8j.mongodb.net/?retryWrites=true&w=majority";

app.use(express.static('public'));
app.use(express.json());


async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(error);
    }
}


const User = mongoose.model('User', {
    username: String,
    password: String,
    email: String, 
});

app.listen(port, () => {
    connect();
    console.log(`Server is running on port ${port}`);
});

app.post('/login', async (req, res) => {
    const { p_email, p_pass } = req.body;
    try {
        console.log(p_email+p_pass);
        // Check if the username exists
        const existingUser = await User.findOne({email: p_email});
        if (!existingUser) {
            return res.json({ success: false, message: 'Username not found. Please register first.' });
        }

        // Validate password
        if (existingUser.password !== p_pass) {
            return res.json({ success: false, message: 'Incorrect password.'});
        }

        return res.json({ success: true, message: 'Login successful.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

app.post('/register', async (req, res) => {
    const { p_name,p_email, p_pass } = req.body;

    try {
        // Check if the username already exists
        console.log("app");
        const existingUser = await User.findOne({ email:p_email });
        if (existingUser) {
            return res.json({ success: false, message: 'Username already exists. Please choose a different one.' });
        }
        const newUser = new User({username: p_name,email: p_email, password: p_pass});
        await newUser.save();

        return res.json({ success: true, message: 'Registration successful.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});