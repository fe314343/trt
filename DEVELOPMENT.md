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
The gallery displays original photos 01, 04, 05, and 06 in that order.
Original photos 02 and 03 are no longer displayed.
Update nickelTestSteps in src/app.jsx when confirmed process details are available.
Only MC2 is currently identified; no removal-rate or discharge-compliance claims
are made for this photo case. The final two photos show settling observations.

The displayed case photos use nickel-cutout-01/04/05/06.webp, transparent
background versions with external objects removed. Original photos remain retained.
