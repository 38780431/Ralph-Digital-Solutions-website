# Ralph Digital Solutions website

A responsive, multi-section single-page website built with plain HTML, CSS and JavaScript for free GitHub Pages hosting.

## Included
- `index.html` — page content and sections
- `styles.css` — responsive layout, typography, colour system and visual styling
- `script.js` — mobile navigation, current year and contact form email/WhatsApp hand-offs
- The home hero includes a six-item capabilities slideshow with manual controls and reduced-motion support.
- The guided chat assistant answers common questions locally in the browser; it has no AI service or server connection.
- `assets/favicon.svg` — simple brand icon

The service catalog covers IT support, web and online-store work, training, device care, networking, data, security basics, business productivity, branding, search visibility, automation and peripherals. The FAQ section explains the enquiry process and important limitations.

## Before publishing
1. Confirm the business email and WhatsApp number in `script.js`; WhatsApp must use country code + number, digits only.
2. Search `index.html` for contact, location and business details to personalise. The visible contact links should match the configured destinations.
3. Confirm the listed services match what you currently offer, and review the service descriptions and illustrative capability cards.

The contact form currently prepares an email using the visitor's default email app. It does not store or transmit form data to a server. A server-backed form needs a form provider or backend endpoint.

The embedded OpenStreetMap view is centered on Nairobi as a general service area; it does not identify an exact office address.

## Publish with GitHub Pages
1. Create a GitHub repository named `ralph-digital-solutions` (or use another repository name).
2. Upload the contents of this folder to the repository root. Make sure `index.html` is at the root, not inside an extra nested folder.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch **main** and folder **/(root)**, then save.
6. Wait for GitHub Pages to deploy. The published URL will be shown in Settings → Pages.

If you want the exact address `https://<your-username>.github.io/`, name the repository `<your-username>.github.io` instead. Otherwise the site URL will include the repository name.

## Local preview
Open `index.html` in a browser. For a more reliable local preview, run a simple static server from this folder, for example:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.
