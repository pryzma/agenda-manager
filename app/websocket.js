
module.exports = () => {
    /*
    const WebSocket = require('ws');
    const wss = new WebSocket.Server({ port: 8080 });

    wss.on('connection', function connection(ws) {
        ws.on('message', function incoming(message) {
            console.log('received: %s', message);
        });

        ws.send(JSON.stringify({status:true}));
        
    });*/
    const webSocketsServerPort = 8080;
    const webSocketServer = require('websocket').server;
    const http = require('http');
    // http & websocket server
    const server = http.createServer();
    server.listen(webSocketsServerPort);
    const wsServer = new webSocketServer({
        httpServer: server
    });
    const env = process.env;
    console.log(`Socket Server : ws://${env.REF_ADR}:${env.REF_WS_PORT}/`)

    // Maintain all active connections in this object
    const clients = {};

    // Generates unique id 
    const getUniqueID = () => {
        const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        return s4() + s4() + '-' + s4();
    };

    wsServer.on('request', function(request) {
        var userID = getUniqueID();
        console.log('Socket Connection : ' + request.origin);
        // Rewrite  to accept only requests from allowed origin
        const connection = request.accept(null, request.origin);
        clients[userID] = connection;
        console.log('Socket Client : ' + userID + ' in ' + Object.getOwnPropertyNames(clients))
    });
}

