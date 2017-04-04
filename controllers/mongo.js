'use strict';
var db = require('../db');
var getInfoFile = require('../models/getInfo'), getInfo = getInfoFile.getInfo;
var Promise = require('bluebird');

exports.setup = function(server){
	
	// the home sight for our website
	server.get('/', function(req,res){
		res.render('home');
	});	
	//display a customers home page with agreements, takes the username in the url
	server.get('/customerHome/:name', function(req, res){
		getInfo.getAgreementsByName(req.params.name)
		.then(function(agreements){
			res.render('customerHome', {agreements:agreements, username:req.params.name});
		})
		.catch(function(err){
			console.log(err);
		});
	});
	// get a specific agreement for a customer
	server.get('/customerAgreement/:username/:num', function(req, res){
		// get the original agreement info
		getInfo.getAgreementById(req.params.num)
		.then(function(agreement){
			// get the report info for that agreement
			getInfo.getReportsById(req.params.num)
			.then(function(report){
				// render the page with this info
				res.render('customerReport', {report:report, agreement: agreement, username:req.params.username});
			})	
			.catch(function(err){
				console.log(err);
			});
		})
		.catch(function(err){
			console.log(err);
		});
	});
	// for removing a report
	// routes back the the report page for that agreement
	server.get('/customerResolveReport/:username/:num', function(req, res){
		getInfo.removeReportById(req.params.num)
		.then(function(){
			res.redirect('/customerAgreement/' + req.params.username + '/' + req.params.num);
		})
		.catch(function(err){
			console.log(err);
		});
	});

	// for when an given employee resolves a report
	server.get('/employeeResolveReport/:username/:agreement/:num', function(req, res){
		getInfo.removeReportById(req.params.num)
		.then(function(){
			res.redirect('/agreement/' + req.body.username +'/' + req.params.customer + '/' + req.params.agreement);
		})
		.catch(function(err){
			console.log(err);
		});
	});
	// the route for logging in a customer
	//takes a posted username and password
	//if there is a problem logging in, it redirects to the login page
	server.post('/loginCustomer', function(req,res){
		getInfo.loginCustomer(req.body.username, req.body.password)
		.then(function(username){
			res.redirect('/customerHome/' + req.body.username);
		})
		.catch(function(err){
			if(err === 'Password or Username are incorrect')
				res.redirect('/loginFailed');
		});
	});
	// the route for logging in a user
	//takes a posted username and password
	//if there is a problem logging in, it redirects to the login page
	server.post('/loginEmployee', function(req,res){
		getInfo.loginEmployee(req.body.username, req.body.password)
		.then(function(username){
			res.redirect('/employeeHome/' + username);
		})
		.catch(function(err){
			if(err === 'Password or Username are incorrect')
				res.redirect('/loginFailed');
		});
	});
	// gets the employee home with a list of customers
	server.get('/employeeHome/:name', function(req, res){
		getInfo.getCustomers()
		.then(function(customers){
			res.render('employeeHome', {customers:customers, employee: req.params.name});
		})
		.catch(function(err){
			console.log(err);
		});
	});
	// gets a list of agreements for the given customer
	server.get('/agreementsList/:employee/:customer', function(req, res){
		getInfo.getAgreementsByName(req.params.name)
		.then(function(agreements){
			res.render('customerAgreements', {agreements:agreements, customer:req.params.name, employee:req.params.employee});
		})
		.catch(function(err){
			console.log(err);
		});
	});

	// gets the reports for a given customers agreement
	server.get('/agreement/:employee/:customer/:num', function(req, res){
		getInfo.getAgreementById(req.params.num)
		.then(function(agreement){
			// get the report info for that agreement
			getInfo.getReportsById(req.params.num)
			.then(function(reports){
				// render the page with this info
				res.render('employeeReport', {reports:reports, agreement: agreement, customer:req.params.username, employee:req.params.employee});
			})	
			.catch(function(err){
				console.log(err);
			});
		})
		.catch(function(err){
			console.log(err);
		});
	});
	// the login failed route, used to notify the user something went wrong
	server.get('/loginFailed', function(req,res){
		res.render('loginFailed');
	});
};

