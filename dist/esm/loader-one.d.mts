/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
import { LoadHook, ResolveHook } from 'node:module';
import { MessagePort } from 'node:worker_threads';
export declare const initialize: ({ port }: {
    port: MessagePort;
}) => void;
export declare const load: LoadHook;
export declare const resolve: ResolveHook;
//# sourceMappingURL=loader-one.d.mts.map