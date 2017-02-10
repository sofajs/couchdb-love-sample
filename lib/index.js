'use strict';


const Config = require('./config');
const CLove = require('couchdb-love')(Config);
const Series = require('async/series');


Series([
    function(callback) {

        console.log('step1:create-database');

        const requestOptions = (session) => {
        
            return new Promise((resolve, reject) => {
        
                const options = {
                    method: 'PUT',
                    uri: Config.host + ':' + Config.port + '/sample_uuser',
                    headers: {
                        'X-Couchdb-WWW-Authenticate': 'Cookie',
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Cookie': 'AuthSession=' + session.cookie
                    },
                    resolveWithFullResponse: true,
                    json: true, // Automatically parses the JSON string in the response
                    requestError: 'Failed to destroy database \"sample_uuser\".'  // @note must have for error message.
                };
        
                resolve(options);
            });
        };
        
        
        CLove.request(requestOptions, (err, result) => {
        
            console.log('err: ' + JSON.stringify(err, 2, '\t'));
            console.log('result: ' + JSON.stringify(result, 2, '\t') + '\n');
            callback(null, result);
        });
    },
    function(callback) {

        console.log('step2:insert-document');

        const insertRecord = (session) => {
        
            return new Promise((resolve, reject) => {
        
                const options = {
                    method: 'PUT',
                    uri: Config.host + ':' + Config.port + '/sample_uuser/docid',
                    headers: {
                        'X-Couchdb-WWW-Authenticate': 'Cookie',
                        'Content-Type': 'application/json',
                        'Cookie': 'AuthSession=' + session.cookie
                    },
                    body: {"title":"There is Nothing Left to Lose","artist":"Foo Fighters","year":"1997"},
                    resolveWithFullResponse: true,
                    json: true, // Automatically parses the JSON string in the response
                    requestError: 'Failed to destroy database \"sample_uuser\".'  // @note must have for error message.
                };
        
                resolve(options);
            });
        };

        CLove.request(insertRecord, (err, result) => {
        
        
            // document _id = "first"
            console.log('err: ' + JSON.stringify(err, 2, '\t'));
            console.log('result: ' + JSON.stringify(result, 2, '\t') + '\n');
            callback(null, result);
            // callback(null, 'two');
        });

    },
    function(callback) {

        console.log('step3:delete-database');

        const requestOptions = (session) => {
        
            return new Promise((resolve, reject) => {
        
                const options = {
                    method: 'DELETE',
                    uri: Config.host + ':' + Config.port + '/sample_uuser',
                    headers: {
                        'X-Couchdb-WWW-Authenticate': 'Cookie',
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Cookie': 'AuthSession=' + session.cookie
                    },
                    resolveWithFullResponse: true,
                    json: true, // Automatically parses the JSON string in the response
                    requestError: 'Failed to destroy database \"sample_uuser\".'  // @note must have for error message.
                };
        
                resolve(options);
            });
        };
        
        
        CLove.request(requestOptions, (err, result) => {
        
            // expect(result.statusCode).to.equal(201);
        
            console.log('err: ' + JSON.stringify(err, 2, '\t'));
            console.log('result: ' + JSON.stringify(result, 2, '\t') + '\n');
            callback(null, result);
        });
    },
],
function(err, results) {
    // results is now equal to ['one', 'two']
    
    console.log('CREATED DATABASE, INSERTED RECORD, DELETED DATABASE');
});
