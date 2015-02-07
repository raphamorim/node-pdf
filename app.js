var express = require('express'),
	app = express(),
	router = express.Router(),
	unirest = require('unirest'),
	port = process.env.PORT || 8080;

app.use('/ola/:nome', function(req, res) {
	var nome = req.params.nome;

	var html = '<html><body style="background-color: black; padding: 30px; color: white">'
		html +=	'<img src="http://www.mobdiq.com.br/assets/mobdiq/logo.png"/><br><br>Ola <b>' + nome + '</b>, ';
		html += 'baixe o aplicativo, indique, e <b>ganhe dinheiro de vedade</b>. <br>';
		html += '<img src="http://www.mobdiq.com.br/assets/landing/Segurando-o-aplicativo.png"/></body></html>';

	unirest.post("https://neutrinoapi-html-to-pdf.p.mashape.com/html-to-pdf")
		.header("X-Mashape-Key", "dxQ7ca6biBmshm1gV91YQjT4JR0mp1jX3Ygjsn5bS3O8R8njXg")
		.header("Content-Type", "application/x-www-form-urlencoded")
		.send("content", html)
		.send("html-width", 1024)
		.send("margin", 10)
		.send("title", "My Title")
		.end(function(result) {
			console.log(result.status, result.headers, result.body);
			res.send(result.body);
		});
});

app.listen(port, function() {
	console.log('Node PDF on port ' + port);
});
