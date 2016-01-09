/**
 * Created by mmasuyama on 1/8/2016.
 */

var Rx = require("rx");

export class StreamsService{

    constructor() {
        this.streams = {};
        this.generalListeners = []
    }

    setStream (streamKey: string, stream: any) {
        if(!this.streams[streamKey]) {
            this.streams[streamKey] = stream;
            this.generalListeners.forEach(function(listener) {
                listener.onNext(stream);
            });
        }
    }

    setGeneralListener(thread: any) {
        this.generalListeners.push(thread);
    }

    getGeneralListener () {

    }

    getStream (streamKey: string) {
        if(!this.streams[streamKey]) {
            this.setStream(streamKey, new Rx.Subject())
        }
        return this.streams[streamKey]

    }

    getStreams() {
        return this.streams;
    }
}
var service = new StreamsService();
module.exports = service;