# TRT website

GitHub Pages serves index.html and assets/ directly. No server is required.

Edit src/app.jsx for website content and interactions, index.html for metadata,
and tailwind.config.cjs or src/styles.css for styling. Then run:

    npm install
    npm run build

Commit the rebuilt assets/app.js and assets/styles.css together with the sources.
Product images are stored in assets/ and can be cached independently.

The inquiry form opens Gmail compose in a new tab, with a mailto fallback. Visitors must send that email themselves.
This static website does not store inquiries or verify delivery.

Category URLs: #wastewater, #sludge, #automation.
