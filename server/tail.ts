import * as fs from 'fs';

export class Tail {
    ///files: Array<string>;
    watcher: any;
    start(filename: string, callback) {
        fs.open(filename, 'r', (err, fd) => {
            if (err) {
                console.error('Unable to open: ' + filename);
                return;
            }

            // this.files.push(filename);
            // var nsName = '/files/' + (-1 + this.files.length),
            //     ns = io.of(nsName)
            //         .on('connection', function(socket) {
            //             socket.emit('files', this.files);
            //         });
            //callback();


            // watch file
            fs.watchFile(filename, function (curr, prev) {

                var len = curr.size - prev.size, position = prev.size;
                if (len > 0) {
                    const buf = new Buffer(len);
                    fs.read(fd, buf, 0, len, position,
                        function (err, bytesRead, buffer) {
                            if (err) {
                                console.error(err);
                                return;
                            }
                            var msg = buffer.toString('utf8', 0, bytesRead);
                            callback(msg)

                        });
                } else {
                    console.log(curr);
                }
            });
        });
    }
    end() {
        this.watcher.close();
    }
}

