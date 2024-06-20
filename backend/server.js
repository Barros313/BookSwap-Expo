const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.log(err));

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const publishRoutes = require('./routes/publish');
app.use('/api/publish', publishRoutes);

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
