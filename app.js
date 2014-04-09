'use strict';

var express = require('express'),
	swig = require('swig'),
	cons = require('consolidate'),
	request = require('request'),
	config = require('./lib/config'),
	argv = require('optimist').argv;

if (!config.load(__dirname + '/config.json')){
	console.log('Failed to load config file');
	process.exit(1);
}

var app = express()
	.engine('html', cons.swig)
	.set('view engine', 'html')
	.set('views', __dirname + '/views')
	.use(express.static(__dirname + '/public'));

if (app.settings.env == 'development'){
	swig.setDefaults({cache: false});
}

app.get(/^\/(?:([A-Za-z0-9]{5})(?:\/([0-9]+))?\/)?$/, function(req, res){
	var hash = req.params[0] || null,
		revision = req.params[1] || 0;

	var locals = {
		env: app.settings.env,
		layouts: config.layouts,
		options: {
			urls: config.urls
		}
	};

	if (!hash){
		res.render('index', locals);
	} else {
		var url = config.urls.api + '/bundles/' + hash;
		if (revision){
			url += '/' + revision;
		}
		request(url, function(err, response, data){
			if (err || response.statusCode != 200){
				res.redirect('/');
				return;
			}
			try {
				data = JSON.parse(data);
				locals.tinker = data;
				res.render('index', locals);
			} catch(e){
				res.redirect('/');
			}
		});
	}
});

var port = parseInt(argv.p, 10) || config.port || 3000;
app.listen(port, function(){
	console.log('Listening on port %d', port);
});
