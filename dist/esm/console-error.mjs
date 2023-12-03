import { writeSync } from 'fs';
import { format } from 'util';
export const consoleError = (...msg) => writeSync(2, Buffer.from(format(...msg) + '\n'));
//# sourceMappingURL=console-error.mjs.map