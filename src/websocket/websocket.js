let socket_create = function (securty,message_handle,error_handler) {
    return function () {
        let socket = new WebSocket("ws://" + "127.0.0.1:8000" + '/ws/chat/?token=' + securty);
        socket.onopen = () => {
            console.log("连上了")
        },
            socket.onmessage = message_handle
        socket.onclose=error_handler
        return socket;
    }
}
export default socket_create