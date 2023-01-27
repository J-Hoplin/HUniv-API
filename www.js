const http = require('http');
const service = require('./app');

const server = http.createServer(service);
server.listen(service.get('port'), () => {
    console.log(`Listening on port : ${service.get('port')}`);
});
