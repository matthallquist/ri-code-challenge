// Requirements
const express = require("express");
const app = express();
const path = require("path");
const fs = require('fs');
const jsdom = require("jsdom");
const alert = require('alert-node');
const bodyParser = require("body-parser");
const events = require('events');


// Template setup
app.set('views', './views/');
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/css'));

// Get objects
const data = JSON.parse(fs.readFileSync('./data.json'));

// jQuery setup 
const {JSDOM} = jsdom;
const dom = new JSDOM(data);
const $ = (require('jquery'))(dom.window);

// BodyParser setup (Allows parsing through parameters)
app.use(bodyParser.urlencoded({
    extended: true
}));

// Get goin'
app.get('/', function(request, response) {
	response.render('index', { 
		title: 'Search Page',
		data: data
	});
});

// Search form post route
app.post('/', function(request, response) {
	params = request.body.parameters;
	params = params.split(" ");
	params = params.map(p => p.split("="));
	matched_data = [];
	unmatched_data = [];
	for (var i = 0; i < params.length; i++) {
		key = params[i][0];
		value = params[i][1];
		switch (key) {
			case "locationID":
				for (var j= 0; j < data.length; j++) {
					if (data[j].general.location.id === value && !unmatched_data.includes(data[j])) {
						matched_data.push(data[j]);
					} else {
						unmatched_data.push(data[j]);
					}
				}
			case "regCode":
				for (var j= 0; j < data.length; j++) {
					if (data[j].general.regCode === value && !unmatched_data.includes(data[j])) {
						matched_data.push(data[j]);
					} else {
						unmatched_data.push(data[j]);
					}
				}
			case "organizationID":
				for (var j= 0; j < data.length; j++) {
					if (data[j].general.organization.id === value && !unmatched_data.includes(data[j])) {
						matched_data.push(data[j]);
					} else {
						unmatched_data.push(data[j]);
					}
				}
			case "organizationAssetTag":
				for (var j= 0; j < data.length; j++) {
					if (data[j].general.organization.assetTag === value && !unmatched_data.includes(data[j])) {
						matched_data.push(data[j]);
					} else {
						unmatched_data.push(data[j]);
					}
				}
			case "contentID":
				for (var j= 0; j < data.length; j++) {
					if (data[j].general.content.id === value && !unmatched_data.includes(data[j])) {
						matched_data.push(data[j]);
					} else {
						unmatched_data.push(data[j]);
					}
				}
			case "contentExp":		
				for (var j= 0; j < data.length; j++) {
					if (data[j].general.content.exp === value && !unmatched_data.includes(data[j])) {
						matched_data.push(data[j]);
					} else {
						unmatched_data.push(data[j]);
					}
				}
		}
	};
	// Remove duplicates from array
	matched_data = Array.from(new Set(matched_data));
	response.render('results', { 
		title: 'Results Page',
		data: matched_data
	});
});

// Action form post route
app.post('/action', function(request, response) {
	console.log(request.body)
	if (request.body.selectAll === 'on') {
		request.body.id =[];
		for (var i= 0; i < data.length; i++) {
			request.body.id.push(i + 1);
		}
	}
	response.render('action', {
		params: request.body
	})
});

app.listen(8080)

console.log("Running on Port 8080");




