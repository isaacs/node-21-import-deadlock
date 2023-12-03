import { writeSync } from 'fs'
import { format } from 'util'

export const consoleError = (...msg: any) =>
  writeSync(2, Buffer.from(format(...msg) + '\n'))
