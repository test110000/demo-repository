const express = require('express');
const app = express();
const path = require('path');

// Define a route to serve data.json
app.get('/data', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'data-2.json'));
});

// Serve static files from the 'public' directory (if needed)
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	// console.log(`Server is running on port ${PORT}`);
});
