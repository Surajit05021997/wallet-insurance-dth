const express = require('express');
const app = express();

const httpProxy = require('http-proxy');

const { spawn } = require('child_process');
const jsonServer = spawn('node', ['node_modules/json-server/lib/cli/bin.js', '--watch', 'db.json', '--port=3001', '--routes', 'route.json']);
const vueServer = spawn('node', ['node_modules/@vue/cli-service/bin/vue-cli-service.js', 'serve', '--port', '8080']);
jsonServer.stdout.on('data', (data) => {
    console.log(data.toString('utf-8'));
    });

jsonServer.stderr.on('data', (data) => {
    console.log(data.toString('utf-8'));
    });

vueServer.stdout.on('data', (data) => {
    console.log(data.toString('utf-8'));
    });

vueServer.stderr.on('data', (data) => {
    console.log(data.toString('utf-8'));
    });

var proxy = httpProxy.createProxyServer({});

proxy.on('error', function (err, req, res) {
    if(err) console.log(err);
    res.end('Something went wrong. And we are reporting a custom error message.');
});

app.use('/api', function (req, res, next) {
    proxy.web(req, res, { target: { host: 'localhost', port: 3001} });
});

app.use(function (req, res, next) {
    proxy.web(req, res, { target: { host: 'localhost', port: 8080} });
});

console.log('process.env.PORT', process.env.PORT);

app.listen(process.env.PORT);
