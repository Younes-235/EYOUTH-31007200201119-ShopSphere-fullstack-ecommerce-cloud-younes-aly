const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const feedbackRoutes = require('./routes/feedbackRoutes');

const app = express();

app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
}));
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.status(200).send('OK'));

app.use('/api', feedbackRoutes);

app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

module.exports = app;