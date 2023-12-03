import { register } from 'node:module';
import { MessageChannel } from 'node:worker_threads';
import { consoleError } from './console-error.mjs';
const { port1, port2 } = new MessageChannel();
port1.on('message', msg => {
    console.error('main 2 got message', msg);
    const t = Math.floor(Math.random() * 1000);
    setTimeout(() => port1.postMessage(msg), t);
});
port1.unref();
port2.unref();
consoleError('register loader-one : before');
register(String(new URL('./loader-one.mjs', import.meta.url)), {
    parentURL: import.meta.url,
    data: { port: port2 },
    transferList: [port2],
});
consoleError('register loader-one : after');
//# sourceMappingURL=import-one.mjs.map