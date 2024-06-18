const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

const authRoutes = require('./routes/auth');

app.use('/api/auth', authRoutes);
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/authDB', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));