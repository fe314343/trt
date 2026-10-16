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

Below 1024px, tapping a chemical product opens an accessible dialog with a photo,
description, and sample inquiry action. Closing restores focus without scrolling
the original list. At 1024px and above, product details remain in the right column.

The wastewater page includes a collapsible chemical-nickel treatment test case.
Its six original photos are stored as nickel-test-01.webp through nickel-test-06.webp.
Update nickelTestSteps in src/app.jsx when confirmed process details are available.
Only MC2 is currently identified; no removal-rate or discharge-compliance claims
are made for this photo case. The final two photos show settling observations.
