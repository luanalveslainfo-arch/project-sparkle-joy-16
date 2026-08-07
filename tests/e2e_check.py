import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
import json
import os

SCREENSHOTS = Path("/tmp/browser/e2e/screenshots")
SCREENSHOTS.mkdir(parents=True, exist_ok=True)

async def test_responsiveness(page, width, height, label):
    await page.set_viewport_size({"width": width, "height": height})
    await page.goto("http://localhost:8080", wait_until="networkidle")
    await page.screenshot(path=str(SCREENSHOTS / f"hero_{label}.png"))
    print(f"Captured {label} view ({width}x{height})")

async def main():
    async with async_playwright() as playwright:
        browser = await playwright.chromium.launch(headless=True)
        context = await browser.new_context()
        page = await context.new_page()

        # 1. Test Navigation & Links
        await page.goto("http://localhost:8080", wait_until="networkidle")
        links = await page.evaluate('''() => {
            return Array.from(document.querySelectorAll('a')).map(a => ({
                text: a.innerText.trim(),
                href: a.getAttribute('href')
            })).filter(l => l.href && !l.href.startsWith('http') && l.href !== '#');
        }''')
        
        print(f"Found {len(links)} internal links to test.")
        for link in links:
            try:
                # Use absolute URL for the test
                target_url = f"http://localhost:8080{link['href']}"
                response = await page.goto(target_url, wait_until="domcontentloaded")
                status = response.status if response else "No response"
                print(f"Link '{link['text']}' -> {link['href']} | Status: {status}")
                if response and response.status >= 400:
                    print(f"ERROR: Link {link['href']} returned {response.status}")
            except Exception as e:
                print(f"FAILED to navigate to {link['href']}: {str(e)}")

        # 2. Test Responsiveness (iPhone 12 & Desktop)
        await test_responsiveness(page, 390, 844, "mobile_iphone12")
        await test_responsiveness(page, 1280, 800, "desktop")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
