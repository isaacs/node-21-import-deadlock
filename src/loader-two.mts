import { LoadHook, ResolveHook } from 'node:module'
import { MessagePort } from 'node:worker_threads'
import { consoleError } from './console-error.mjs'
import { foo } from './shared.mjs'

let PENDING = 0

let PORT: undefined | MessagePort = undefined

export const initialize = ({ port }: { port: MessagePort }) => {
  PORT = port
}

export const load: LoadHook = async (url, context, nextLoad) => {
  consoleError('loader 2 : load : start', url)
  if (!PORT) throw new Error('not initialized')
  const id = String(Math.random())
  let resolve!: () => void
  const p = new Promise<void>(r => (resolve = r))
  const onMessage = (msg: any) => {
    if (msg.id === id) PORT?.removeListener('message', onMessage)
    PENDING--
    resolve()
  }
  PENDING++
  PORT.ref()
  PORT.on('message', onMessage)
  PORT.postMessage({
    id,
    foo,
    url,
    context,
  })
  await p
  if (PENDING === 0) PORT.unref()
  consoleError('loader 2 : load : returning nextLoad', url)
  return nextLoad(url, context)
}

export const resolve: ResolveHook = async (url, context, nextResolve) => {
  consoleError('loader 2 : resolve : start', url)
  if (!PORT) throw new Error('not initialized')
  const id = String(Math.random())
  let resolve!: () => void
  const p = new Promise<void>(r => (resolve = r))
  const onMessage = (msg: any) => {
    if (msg.id === id) PORT?.removeListener('message', onMessage)
    PENDING--
    resolve()
  }
  PENDING++
  PORT.ref()
  PORT.on('message', onMessage)
  PORT.postMessage({
    id,
    foo,
    url,
    context,
  })
  await p
  if (PENDING === 0) PORT.unref()
  consoleError('loader 2 : resolve : calling nextResolve', url)
  return nextResolve(url, context)
}
