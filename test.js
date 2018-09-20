const http = require('http');
const assert = require('assert');
const uuidv1 = require('uuid/v1');

const PORT = 3000;
const uuid1 = uuidv1();

describe('application', () => {
    it('should test the test', (done) => {
        assert(true === true, 'true should be true');
        done();
    });
    it('should run', (done) => {
        http.request({
            host: 'localhost',
            port: PORT,
            path: '/',
            method: 'GET'
        }, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                assert.equal(200, res.statusCode, 'statusCode should be 200');
                assert.equal('OK', res.statusMessage, 'statusMessage should be OK');
                assert.equal('Page under construction.', body, 'body should be page under construction');
                done();
            });
        }).end();
    });
    it('should signup', (done) => {
        let payload = JSON.stringify({
            username: uuid1,
            password: uuid1
        });
        http.request({
            host: 'localhost',
            port: PORT,
            path: '/api/signup',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': payload.length
            }
        }, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                assert.equal(200, res.statusCode, 'statusCode should be 200');
                assert.equal('OK', res.statusMessage, 'statusMessage should be OK');
                assert.equal('{"success":true,"msg":"Successful created new user."}', body, '{"success":true,"msg":"Successful created new user."}');
                done();
            });
        }).end(payload);
    });
    it('should throw user already exists', (done) => {
        let payload = JSON.stringify({
            username: uuid1,
            password: uuid1
        });
        http.request({
            host: 'localhost',
            port: PORT,
            path: '/api/signup',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': payload.length
            }
        }, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                assert.equal(200, res.statusCode, 'statusCode should be 200');
                assert.equal('OK', res.statusMessage, 'statusMessage should be OK');
                assert.equal('{"success":false,"msg":"Username already exists."}', body, '{"success":false,"msg":"Username already exists."}');
                done();
            });
        }).end(payload);
    });
});