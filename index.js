require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

app.use(
	cors({
		origin: '*',
	})
);

// Local imports
const router = require('./app/router');

// Middleware
app.use(express.json());

// Nos Routes
app.use(router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Listening on http://localhost:${port}`);
});
