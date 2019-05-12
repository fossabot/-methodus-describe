
const options = { autoscroll: true };
let socket;

export class Socket {
    socket: any;
    io: any;
    activeTails: any;

    /**
     *
     */
    constructor() {
        this.io = (window as any).io;
        this.activeTails = {};
        this.init();
    }
    tail(logpath) {
        this.socket.emit('GET_/tail', logpath, function (data) {
        });
    }
    endTail(logpath) {
        this.socket.emit('GET_/end_tail', logpath, function (data) {
        });
    }
    init() {
        if (!this.io)
            return;

        this.socket = this.io('/describe', { nsp: '/describe' }).connect();
        //this.socket = this.io.connect();
        socket = this.socket;

        setTimeout(() => {
            this.socket.emit('GET_/connect', {}, (data) => {
                document.getElementById('FilesList').innerHTML = data.result.map(elem => {
                    return `<a class="dropdown-item" href='javascript:socketClass.tail(${JSON.stringify(elem)})'>${elem}</a>`
                }).join();
            });
        }, 2000);

        this.socket.on('log', (logsData) => {
            document.getElementById('LogTail').innerHTML += logsData;
            if (options.autoscroll) {
                document.documentElement.scrollTop = document.body.scrollHeight;
            }
        });

        this.socket.on('disconnect', function () {
            console.log('user disconnected');
        });
    }
}

function tail(logpath) {
    socketClass.activeTails[logpath] = logpath;
    document.getElementById('ActiveTails').innerHTML = Object.keys(socketClass.activeTails).map(elem => {
        return `<a class="dropdown-item" href='javascript:tail(${JSON.stringify(elem)})'>${elem}</a>`
    }).join();


    socket.emit('GET_/tail', logpath, function (data) {
    });
}

const socketClass = new Socket();
(window as any).socketClass = socketClass;