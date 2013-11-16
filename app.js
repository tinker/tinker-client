'use strict';

var express = require('express'),
	swig = require('swig'),
	cons = require('consolidate'),
	config = require('./lib/config');

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

app.get('/', function(req, res){
	var locals = {
		env: app.settings.env,
		options: {
			urls: config.urls
		}
	};

	res.render('index', locals);
});


app.listen(4000, function(){
	console.log('Listening on port 4000');
});

