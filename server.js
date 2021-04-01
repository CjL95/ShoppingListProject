const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const items = require('./routes/api/items');
const app = express();
const path = require('path');
//bodyparser middleware
app.use(bodyParser.json());
//DB config
const db = require('./config/keys').mongoURI;

mongoose.connect(db, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then(() => console.log('db connected'))
	.catch(err => console.log(err));

app.use('/api/items', items);

//serve static assets if in production

if(process.env.NODE_ENV === 'production'){
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on port ${port}`));	
