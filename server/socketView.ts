import { ServerType, MethodConfig, Method, MethodResult, MethodError, Verbs } from '@methodus/server';
import { Tail } from './tail';
import * as path from 'path';
import * as fs from 'fs';

const logsPath = process.env.NODE_LOG_DIR || './logs';


@MethodConfig('SocketView')
export class SocketView {
    activeTails: any;
    @Method(Verbs.Get, '/connect')
    async connect(socket: any) {
        const logs = fs.readdirSync(logsPath);
        return new MethodResult(logs);
    }
    @Method(Verbs.Get, '/end_tail')
    async endTail(socket: any, filename: string) {
        let logPath = path.join(logsPath, filename);
        this.activeTails[logPath].close();
    }

    @Method(Verbs.Get, '/tail')
    async tail(socket: any, filename: string) {
        this.activeTails = this.activeTails || {};

        let logPath = path.join(logsPath, filename);
        this.activeTails[logPath] = new Tail();
        this.activeTails[logPath].start(logPath, (data) => {
            //MethodEvent.emit('log', data, ServerType.Socket);
            socket.emit('log', data);
        });
    }
}