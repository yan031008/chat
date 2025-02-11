let socket_create = function (socket,securty,message_handle) {
    function heartbeat(func){
        this.timeout=30*1000
        this.start=setInterval(() => {
            func()
        }, this.timeout);
        this.stop=function(){
            clearInterval(this.start)
        }
    }
    return function restart() {
        // let time=null
        // let index=0;
        socket.value = new WebSocket("ws://" + "127.0.0.1:8000" + '/ws/chat/?token=' + securty);
        socket.value.onopen = () => {
            // clearInterval(time)
            // if(time==0){
            // socket.value.heartbeat.stop()
            // }
            socket.value.heartbeat=new heartbeat(function(){
                socket.value.send(JSON.stringify(
                    0
                    ));
                    console.log(0)
               
            })
        },
        socket.value.onmessage = message_handle
        socket.value.onclose=(e)=>{
            console.log(e)
          
                restart()
        }
        socket.value.onerror=(e)=>{
            console.log(e)
        }
        // return socket;
    }
}





export default socket_create