/**
 * Next.js loads `.env.local` automatically; plain `tsx` scripts do not.
 * Import this file first in any script that reads process.env.
 */
import { config } from 'dotenv'
import { existsSync } from 'fs'
import { resolve } from 'path'

const root = process.cwd()

const envPath = resolve(root, '.env')
const localPath = resolve(root, '.env.local')

if (existsSync(envPath)) {
  config({ path: envPath })
}
if (existsSync(localPath)) {
  config({ path: localPath, override: true })
}
