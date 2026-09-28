	const express = require('express');
	const app = express();
	const PORT = 3000;
	
	app.get('/', (req, res) => {
	  res.send('Server Express.js berjalan!');
	});
	
	app.listen(PORT, () => {
	  console.log(`Server berjalan di http://localhost:${PORT}`);
	});