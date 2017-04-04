'use strict';

var db = require('../db'), 
    mysql = db.mysql, 
    connection = db.connection;
var sqlFile= require('./queries'), queries = sqlFile.queries;

var Promise = require('bluebird');
var getInfo = {};
// the promises for getting information needed for a page

getInfo.loginCustomer = function(username,password){
	return new Promise(function(resolve,reject){
		connection.query(queries.loginCustomer, [username,password], function(err, rows, fields){
			if(err) reject(err);
			if(rows.size() !== 0)
				resolve(rows);
			else
				reject('Password or Username are incorrect');
		});
	});
};

getInfo.loginEmployee = function(username,password){
	return new Promise(function(resolve,reject){
		connection.query(queries.loginEmployee, [username,password], function(err, rows, fields){
			if(err) reject(err);
			if(rows.size() !== 0)
				resolve(rows);
			else
				reject('Password or Username are incorrect');
		});
	});
};
getInfo.getCustomers = function(){
	return new Promise(function(resolve,reject){
		connection.query(queries.getCustomers,function(err, rows, fields){
			if(err) reject(err);
			resolve(rows);
		});
	});
};

getInfo.getAgreementsByName = function(name){
	return new Promise(function(resolve, reject){
		connection.query(queries.getAgreementsByName, [name], function(err, rows, fields){
			if(err) reject(err);
			resolve(rows);
		});
	});
};

getInfo.getAgreementById = function(id){
	return new Promise(function(resolve,reject){
		connection.query(queries.getAgreementById,[id],function(err,rows,fields){
			if(err) reject(err);
			resolve(rows);
		});
	});
};

getInfo.getHackerById = function(id){
	return new Promise(function(resolve,reject){
		connection.query(queries.getHackerById,[id],function(err,rows,fields){
			if(err) reject(err);
			resolve(rows);
		});
	});
};

getInfo.getAnalystById = function(id){
	return new Promise(function(resolve,reject){
		connection.query(queries.getAnalystById,[id],function(err,rows,fields){
			if(err) reject(err);
			resolve(rows);
		});
	});
};

getInfo.getAnalysts = function(){
	return new Promise(function(resolve,reject){
		connection.query(queries.getAnalysts,function(err, rows, fields){
			if(err) reject(err);
			resolve(rows);
		});
	});
};

getInfo.getReportsById = function(id){
	return new Promise(function(resolve,reject){
		connection.query(queries.getReportById,[id],function(err,rows,fields){
			if(err) reject(err);
			resolve(rows);
		});
	});
};

getInfo.removeReportById = function(id){
	return new Promise(function(resolve,reject){
		connection.query(queries.removeReportById,[id],function(err,rows,fields){
			if(err) reject(err);
			resolve();
		});
	});
};
getInfo.getSystemByMac = function(id){
	return new Promise(function(resolve,reject){
		connection.query(queries.getSystemByMac,[id],function(err,rows,fields){
			if(err) reject(err);
			resolve(rows);
		});
	});
};

getInfo.getExploits = function(){
	return new Promise(function(resolve,reject){
		connection.query(queries.getExploits,function(err, rows, fields){
			if(err) reject(err);
			resolve(rows);
		});
	});
};

getInfo.getMitm = function(){
	return new Promise(function(resolve,reject){
		connection.query(queries.getMitm,function(err, rows, fields){
			if(err) reject(err);
			resolve(rows);
		});
	});
};

getInfo.getAttacks = function(){
	return new Promise(function(resolve,reject){
		connection.query(queries.getAttacks,function(err, rows, fields){
			if(err) reject(err);
			resolve(rows);
		});
	});
};

getInfo.getApplications = function(){
	return new Promise(function(resolve,reject){
		connection.query(queries.getApplications,function(err, rows, fields){
			if(err) reject(err);
			resolve(rows);
		});
	});
};

exports.getInfo = getInfo;