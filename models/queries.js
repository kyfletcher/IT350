'use strict';

var queries = {};

queries.getAgreements = 'SELECT * FROM agreement';
// ? the name for the signer's agreements we want
queries.getAgreementsByname = 'SELECT * FrROM agreement WHERE signer = ?';
// geting the data for a specific agreement
queries.getAgreementById = 'SELECT * FROM agreement WHERE agreement_id = ?';

queries.getSystems = 'SELECT * FROM system';
//? is the mac of the desired system
queries.GetSystemByMac = 'Select * From system WHERE MAC = ?';
//the first ? is the username the second is the password
queries.loginCustomer = 'SELECT * FROM customer WHERE username = ? AND password = ?';
// for logging an employee
queries.loginEmployee = 'SELECT * FROM security_analyst WHERE username = ? AND password = ?';
 // get all applications
queries.getApplications = 'SELECT * FROM application';
// get a list of exploits
queries.getExploits = 'SELECT * FROM exploit';
// get the list of customers
queries.getCustomers = 'SELECT * FROM customer';
// get MITM info
queries.getMitm = 'SELECT * FROM mitm';
 // get all the covered domains
queries.getDomains = 'SELECT * FROM domain';
// get an anaylst by their od
queries.getAnalystById = 'SELECT * FROM security_analyst WHERE sec_id = ?';
//get all of the analysts
queries.getAnalysts = 'SELECT * FROM security_analyst';
// get all of the reports
queries.getReports = 'SELECT * FROM report';
// get a report by the agreement id
queries.getReportsById = 'SELECT * FROM report WHERE agreement_id = ?';
// delete a report given the agreement id
queries.removeReportById = 'DELETE * FROM report WHERE report_id = ?';
 // get a hacker by his id 
queries.getHackerById = 'SELECT * FROM hacker WHERE hacker_id= ?';
// get all of the attacks
queries.getAttacks = 'SELECT * FROM attack';

exports.queries = queries;