import { consoleError } from './console-error.mjs';
import { foo } from './shared.mjs';
let PENDING = 0;
let PORT = undefined;
export const initialize = ({ port }) => {
    PORT = port;
};
export const load = async (url, context, nextLoad) => {
    consoleError('loader 2 : load : start', url);
    if (!PORT)
        throw new Error('not initialized');
    const id = String(Math.random());
    let resolve;
    const p = new Promise(r => (resolve = r));
    const onMessage = (msg) => {
        if (msg.id === id)
            PORT?.removeListener('message', onMessage);
        PENDING--;
        resolve();
    };
    PENDING++;
    PORT.ref();
    PORT.on('message', onMessage);
    PORT.postMessage({
        id,
        foo,
        url,
        context,
    });
    await p;
    if (PENDING === 0)
        PORT.unref();
    consoleError('loader 2 : load : returning nextLoad', url);
    return nextLoad(url, context);
};
export const resolve = async (url, context, nextResolve) => {
    consoleError('loader 2 : resolve : start', url);
    if (!PORT)
        throw new Error('not initialized');
    const id = String(Math.random());
    let resolve;
    const p = new Promise(r => (resolve = r));
    const onMessage = (msg) => {
        if (msg.id === id)
            PORT?.removeListener('message', onMessage);
        PENDING--;
        resolve();
    };
    PENDING++;
    PORT.ref();
    PORT.on('message', onMessage);
    PORT.postMessage({
        id,
        foo,
        url,
        context,
    });
    await p;
    if (PENDING === 0)
        PORT.unref();
    consoleError('loader 2 : resolve : calling nextResolve', url);
    return nextResolve(url, context);
};
//# sourceMappingURL=loader-two.mjs.map