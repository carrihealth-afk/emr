const express = require('express');
const routes = require('./routes');
const errorHandler = require('./common/middleware/errorHandler');

const app = express();

app.use(express.json());
app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/v1', routes);
app.use(errorHandler);

module.exports = app;
