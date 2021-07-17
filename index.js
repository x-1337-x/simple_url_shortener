const express = require('express');

const app = express();
const PORT = 8887;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
	console.log(`The app is running on port ${PORT}`);
});

app.get('/', function (req, res) {
	let { url } = get_URL(req.query.alias);
	console.log(url);
	if (url) {
		return res.send(url);
	} else {
		res.status(404).end();
		return;
	}
});

app.post('/', function (req, res) {
	console.log(req.body.url);
	let url = req.body.url;
	if (!url) {
		res.status(400).end();
		return;
	}
	add_URL(url);
	console.log(memory);
	return res.send('hi2_post');
});

const shortenURL = (url) => {
	return String(id++);
};

const add_URL = (url) => {
	memory.push({ url, alias: shortenURL(url) });
};

const get_URL = (alias) => {
	return memory.find((item) => {
		return item.alias === alias;
	});
};

let id = 1;
const memory = [{ url: 'one', alias: shortenURL() }];
