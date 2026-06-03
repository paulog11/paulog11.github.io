/**
 * Vite plugin that mounts /api/* handlers during `npm run dev`.
 *
 * Handlers are authored as `export default async function handler(req, res)`
 * using res.status(n).json(obj) — the same signature Vercel expects —
 * so the same files deploy to production without changes.
 *
 * This plugin only hooks configureServer (dev); vite build is unaffected.
 */

import { runMigrations } from './db/client.js'

const routes = [
  { method: 'POST', path: '/api/review/mistakes', handler: () => import('./api/review/mistakes.js') },
  { method: 'GET',  path: '/api/review/due',      handler: () => import('./api/review/due.js') },
  { method: 'POST', path: '/api/review/grade',    handler: () => import('./api/review/grade.js') },
  { method: 'GET',  path: '/api/review/recent',   handler: () => import('./api/review/recent.js') },
]

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let raw = ''
    req.on('data', chunk => { raw += chunk })
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {})
      } catch {
        reject(new Error('Invalid JSON body'))
      }
    })
    req.on('error', reject)
  })
}

function shimRes(res) {
  res.status = (code) => {
    res.statusCode = code
    return res
  }
  res.json = (obj) => {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(obj))
  }
  return res
}

export function devApiPlugin() {
  return {
    name: 'dev-api',
    async configureServer(server) {
      await runMigrations()
      console.log('[dev-api] DB migrations applied')

      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url, 'http://localhost')
        const pathname = url.pathname

        const route = routes.find(
          r => r.method === req.method && r.path === pathname
        )
        if (!route) return next()

        try {
          const body = ['POST', 'PUT', 'PATCH'].includes(req.method)
            ? await parseBody(req)
            : {}

          req.body = body
          req.query = Object.fromEntries(url.searchParams)

          const { default: fn } = await route.handler()
          await fn(req, shimRes(res))
        } catch (err) {
          console.error('[dev-api] Error in', req.url, err)
          if (!res.writableEnded) {
            res.statusCode = 500
            res.end(JSON.stringify({ error: err.message }))
          }
        }
      })
    },
  }
}
