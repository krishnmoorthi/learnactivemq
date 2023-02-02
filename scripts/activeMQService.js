const Stomp = require('stomp-client');
const stompClient = new Stomp('wkwin0280068.global.publicisgroupe.net', 61613, "admin", "admin");

const subscribe = () => {
    stompClient.connect(function (sessionId) {
        console.log('ActiveMQ wine world subscriber connected !');
        stompClient.subscribe('/topic/biddings', function (message, headers) {
            console.log('Received: ', message, headers);
        });
    });
}

const publish = (message) => {
    stompClient.connect(function () {
        stompClient.publish('/topic/biddings', message);
        console.log('Published: ' + message);
    });
}

module.exports = {
    subscribe: subscribe,
    publish: publish
}