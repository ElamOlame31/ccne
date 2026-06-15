import { chromium } from 'playwright'

const URL = process.env.URL || 'http://localhost:4173/'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })

const errors = []
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message))

await page.goto(URL, { waitUntil: 'networkidle' })
await page.waitForTimeout(1200)

// Sanity: combien de tracés de provinces rendus ?
const paths = await page.locator('#carte svg path').count()
const h1 = (await page.locator('h1').first().innerText()).replace(/\n/g, ' ')

console.log('H1:', h1)
console.log('Province paths in map:', paths)
console.log('Console errors:', errors.length ? errors : 'NONE')

await page.screenshot({ path: 'scripts/shot-top.png' })
await page.locator('#carte').scrollIntoViewIfNeeded()
await page.waitForTimeout(900)
await page.screenshot({ path: 'scripts/shot-map.png' })

// clique une province pour vérifier le panneau détail
const target = page.locator('#carte svg path').nth(8)
await target.click({ force: true })
await page.waitForTimeout(600)
const detail = await page.locator('#carte').screenshot({ path: 'scripts/shot-detail.png' })

await browser.close()
console.log('Screenshots written: shot-top.png, shot-map.png, shot-detail.png')
