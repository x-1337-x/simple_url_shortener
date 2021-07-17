const express = require('express');

const app = express();
const PORT = 8887;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
	console.log(`The app is running on port ${PORT}`);
});

app.get('/', function (req, res) {
	const formPage = `<form action="/" method="post" enctype="application/x-www-form-urlencoded" style="padding: 20px; background: #fff;">
	<input name="url" placeholder="" />
	<button type="submit">Create short URL</button>
</form>`;
	res.send(formPage);
});

app.get('/:alias?', function (req, res) {
	let url = get_URL(req.params.alias);
	console.log(url);
	if (url) {
		return res.redirect(url.url);
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
	const record = add_URL(url);
	const message = `Here is your short link: <a href="http://localhost:8887/${record.alias}">http://localhost:8887/${record.alias}</a>`;
	return res.send(message);
});

const shortenURL = (url) => {
	return String(id++);
};

const add_URL = (url) => {
	const data = { url, alias: shortenURL(url) };
	memory.push(data);
	return data;
};

const get_URL = (alias) => {
	return memory.find((item) => {
		return item.alias === alias;
	});
};

let id = 1;
const memory = [{ url: 'https://expressjs.com', alias: shortenURL() }];
