import { readFile, writeFile, mkdir, access } from "node:fs/promises";

const brand = JSON.parse(
  await readFile(new URL("../data/brand-assets.json", import.meta.url), "utf8"),
);
for (const logo of brand.logos)
  await access(new URL(`../public${logo.url}`, import.meta.url));
const directory = new URL("../public/brand/", import.meta.url);
await mkdir(directory, { recursive: true });
const colours = [...brand.colours, ...brand.neutrals].map(
  ({ name, hex, source }) => ({
    name,
    hex,
    rgb: [1, 3, 5].map((start) => parseInt(hex.slice(start, start + 2), 16)),
    source: source || "Website palette",
  }),
);
await writeFile(
  new URL("ETCF-Brand-Colours.json", directory),
  JSON.stringify(
    {
      name: "Edmonton Tamil Catholic Family",
      usage:
        "Use these screen colour values for supporting layouts. Keep the supplied logo artwork unchanged. Green and red are sampled screen references, not print specifications. Contact the media team for print matching or CMYK values.",
      contact: brand.contact,
      colours,
    },
    null,
    2,
  ) + "\n",
);
await writeFile(
  new URL("ETCF-Brand-Guidelines.txt", directory),
  `EDMONTON TAMIL CATHOLIC FAMILY (ETCF)
Brand assets and usage guide

LOGO FILES
${brand.logos.map((logo) => `${logo.name}: ${logo.format}, ${logo.width} x ${logo.height} pixels\nhttps://www.edmontontamilcatholics.ca${logo.url}`).join("\n\n")}

USING THE LOGO
- Use the complete supplied artwork, including both languages and every symbol.
- Resize proportionally. Do not stretch, crop, rotate, recolour or add effects.
- Leave clear space of at least one fifth of the logo's width on every side.
- Use a white or very light background; use a white holding panel on dark or busy layouts.
- Check the Tamil and English lettering at the final size. Avoid enlarging raster files beyond their native resolution.
- Ask the media team for vector artwork, large print files or an approved alternative for small placements.

SCREEN COLOUR PALETTE
${colours.map((colour) => `${colour.name}: ${colour.hex} | RGB ${colour.rgb.join(", ")} | ${colour.source}`).join("\n")}

Green and red are sampled logo screen references. The original artwork contains colour variations. These screen values are not CMYK or print specifications. Keep the logo file unchanged; request colour matching for print.

REUSE NOTICE
These resources help you prepare ETCF-related materials. They are not an open-source or public-domain licence. Obtain permission from the ETCF media team before publishing or distributing the assets.
Request written approval for commercial use, merchandise, partnerships or adapted artwork. Do not imply ETCF endorsement or sponsorship without approval. Logo downloads do not grant permission to reuse photographs or other website content.
Include where appropriate: Edmonton Tamil Catholic Family (ETCF), with a link to https://www.edmontontamilcatholics.ca/.

QUESTIONS AND PERMISSIONS
${brand.contact}

Current online guide: https://www.edmontontamilcatholics.ca/brand-assets.html
`,
);
console.log("Generated downloadable ETCF colour values and brand usage guide.");
