import io from 'socket.io-client'

const socketIOClient = (function() {
    const url = 'http://localhost:3001';
    const socket = io(url, {
        autoConnect: true,
    });

    function connect() {
        if (!socket.connected) {
            socket.connect();
        }
    }

    function disconnect() {
        if (socket.connected) {
            socket.disconnect();
        }
    }

    function emit(event, data) {
        connect();
        socket.emit(event, data);
    }

    function on(event, callback) {
        connect();
        socket.on(event, callback);
    }

    return {
        connect,
        disconnect,
        emit,
        on,
    };
})();

export default socketIOClient;