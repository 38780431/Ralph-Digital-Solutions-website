# Ralph Digital Solutions website

A responsive, multi-section single-page website built with plain HTML, CSS and JavaScript for free GitHub Pages hosting.

## Included
- `index.html` — page content and sections
- `styles.css` — responsive layout, typography, colour system and visual styling
- `script.js` — mobile navigation, current year and contact form email/WhatsApp hand-offs
- The home hero includes a six-item capabilities slideshow with manual controls and reduced-motion support.
- The guided chat assistant answers common questions locally in the browser; it has no AI service or server connection.
- The work section includes a clearly labeled sample project concept, not a completed client project or a measured result.
- `assets/favicon.svg` — simple brand icon

The service catalog covers IT support, web and online-store work, training, device care, networking, data, security basics, business productivity, branding, search visibility, automation and peripherals. The FAQ section explains the enquiry process and important limitations.

## Before publishing
1. Confirm the business email and WhatsApp number in `script.js`; WhatsApp must use country code + number, digits only.
2. Search `index.html` for contact, location and business details to personalise. The visible contact links should match the configured destinations.
3. Confirm the listed services match what you currently offer, and review the service descriptions and illustrative capability cards.

The contact form currently prepares an email using the visitor's default email app. It does not store or transmit form data to a server. A server-backed form needs a form provider or backend endpoint.

The embedded OpenStreetMap view is centered on Nairobi as a general service area; it does not identify an exact office address.

## Publish with GitHub Pages
This public repository is configured to deploy the static site for free with GitHub Actions. The workflow at `.github/workflows/pages.yml` publishes the site files whenever changes are pushed to `main`; it can also be started manually from the **Actions** tab.

If GitHub Pages is not enabled yet, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**. The published site URL is:

https://38780431.github.io/Ralph-Digital-Solutions-website/

GitHub Pages serves static files only. The contact form hands off to the visitor's email app or WhatsApp and does not store submissions on a server.

## Local preview
Open `index.html` in a browser. For a more reliable local preview, run a simple static server from this folder, for example:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.
