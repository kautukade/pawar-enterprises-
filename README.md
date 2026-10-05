# Pawar Enterprises Website

Premium, mobile-first static website for **Pawar Enterprises**.

## Pages
- Home
- Services
- Work / Service Gallery
- About
- Contact / Quote

## Services represented
- Painting
- Waterproofing
- Civil Work
- Plumbing
- Electrical Work
- Deep Cleaning

## Contact configuration
Update `assets/config.js` with the verified phone, WhatsApp and email before launch:

```js
window.PAWAR_CONFIG = {
  businessName: 'Pawar Enterprises',
  website: 'https://pawarenterprise.co.in',
  serviceArea: 'Mumbai, Maharashtra',
  phone: '91XXXXXXXXXX',
  whatsapp: '91XXXXXXXXXX',
  email: 'name@example.com'
};
```

## Lead form
The contact form is configured for **Netlify Forms** and includes UTM/GCLID/FBCLID capture fields for future CRM and campaign attribution.

## Deployment
Deploy the repository directly on Netlify. No build command is required; publish directory is `.`.

## Before production launch
1. Add verified phone/WhatsApp/email in `assets/config.js`.
2. Replace category/stock images with verified real project photos where available.
3. Add verified testimonials/reviews only after client approval.
4. Connect the live domain and submit `sitemap.xml` to Google Search Console.
