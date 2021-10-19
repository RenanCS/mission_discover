const express = require('express');
const route = require('./route');
const path = require('path');

const PORT = process.env.PORT || 3000;

const server = express();

server.use(express.static('public'));

server.set('view engine', 'ejs')

server.set('views', path.join(__dirname,'views'));

server.use(express.urlencoded({extended:true}));

server.use(route);

server.listen(PORT,() => console.log('Rodando'));