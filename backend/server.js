const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/authDB', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.log(err));

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
