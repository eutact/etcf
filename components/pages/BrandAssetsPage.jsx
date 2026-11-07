import { useEffect, useRef, useState } from "react";
import SiteNavigation from "../site/SiteNavigation";
import { HomeFooter } from "../site/SiteFooters";
import brand from "../../data/brand-assets.json";

function Icon({ name, ...props }) {
  const paths = {
    download: (
      <>
        <path d="M12 3v12m-5-5 5 5 5-5" />
        <path d="M4 16v5h16v-5" />
      </>
    ),
    copy: (
      <>
        <rect x="8" y="8" width="12" height="13" rx="2" />
        <path d="M16 8V3H3v13h5" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
  };
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}

function Symbol({ type }) {
  if (type === "faith") {
    return (
      <img
        src="/brand/holy-trinity.png"
        width={1388}
        height={1133}
        alt=""
      />
    );
  }

  if (type === "canada") {
    return (
      <img
        src="/brand/canadian-maple-leaf.svg"
        width={380}
        height={404}
        alt=""
      />
    );
  }

  return (
    <svg viewBox="0 0 80 80" fill="currentColor" aria-hidden="true">
      <circle cx="40" cy="25" r="13" />
      <path d="M15 61c0-15 11-24 25-24s25 9 25 24c0 9-50 9-50 0Z" />
    </svg>
  );
}

const story = [
  {
    title: "Holy Trinity",
    type: "faith",
    colour: "#D21F25",
    text: "The dove and cross place our Catholic faith at the heart of the identity.",
  },
  {
    title: "Men",
    type: "person",
    colour: "#59AFE0",
    text: "Blue brings a sense of peace, trust, serenity and stability.",
  },
  {
    title: "Women",
    type: "person",
    colour: "#60B347",
    text: "Green speaks of new beginnings, abundance, nature and harmony.",
  },
  {
    title: "Children",
    type: "person",
    colour: "#F5DA5B",
    text: "Yellow carries happiness, hope, energy and optimism into our future.",
  },
  {
    title: "Canada",
    type: "canada",
    colour: "#D21F25",
    text: "The maple leaves connect our Tamil Catholic family with our home in Canada.",
  },
];

function rgb(hex) {
  return [1, 3, 5]
    .map((start) => parseInt(hex.slice(start, start + 2), 16))
    .join(", ");
}

export default function BrandAssetsPage() {
  const hero = useRef(null);
  const copyRequest = useRef(0);
  const [background, setBackground] = useState("white");
  const [copied, setCopied] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const element = hero.current;
    if (!element || typeof IntersectionObserver !== "function") return;
    let visible = false;
    const update = () => {
      element.dataset.visible = String(visible && !document.hidden);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  async function copyColour(colour) {
    const request = ++copyRequest.current;
    try {
      if (!navigator.clipboard?.writeText)
        throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(colour.hex);
      if (request !== copyRequest.current) return;
      setCopied(colour.hex);
      setNotice(`Copied ${colour.name}: ${colour.hex}.`);
    } catch {
      if (request !== copyRequest.current) return;
      setCopied("");
      setNotice(`Select and copy this code manually: ${colour.hex}.`);
    }
  }

  return (
    <>
      <SiteNavigation />
      <main id="brand-assets" className="brand-page">
        <header className="brand-hero" ref={hero}>
          <div className="brand-hero-glow" aria-hidden="true" />
          <div className="site-shell brand-hero-grid">
            <div className="brand-hero-copy">
              <p className="brand-eyebrow">ETCF / Brand assets</p>
              <h1>
                Our identity.
                <br />
                <span>Shared with care.</span>
              </h1>
              <p className="brand-hero-lead">
                Faith, family and our Tamil heritage—brought together in one
                emblem. Everything you need to represent Edmonton Tamil Catholic
                Family with clarity and care.
              </p>
              <div className="brand-hero-actions">
                <a href="#brand-downloads" className="premium-button px-6 py-3">
                  Get the logo <Icon name="download" />
                </a>
                <a href="#brand-colours" className="ghost-button px-6 py-3">
                  Explore our colours <Icon name="arrow" />
                </a>
              </div>
              <p className="brand-hero-caption">
                Rooted in faith. Connected by family. At home in Canada.
              </p>
            </div>
            <div className="brand-hero-art">
              <div className="brand-logo-board">
                <div className="brand-board-top">
                  <span>The ETCF emblem</span>
                  <span aria-hidden="true">01 / Identity</span>
                </div>
                <img
                  src="/src/assets/logo.png"
                  width={926}
                  height={906}
                  alt="Edmonton Tamil Catholic Family emblem with a dove and cross, three family figures and Canadian maple leaves"
                  fetchPriority="high"
                  loading="eager"
                />
                <div className="brand-board-bottom">
                  <span>One faith. One family.</span>
                  <div className="brand-mini-palette" aria-hidden="true">
                    {brand.colours
                      .filter((c) => c.name !== "Quiet Purple")
                      .map((c) => (
                        <i key={c.hex} style={{ backgroundColor: c.hex }} />
                      ))}
                  </div>
                </div>
              </div>
              <span className="brand-art-note">Edmonton, Alberta · Canada</span>
            </div>
          </div>
        </header>

        <nav className="brand-jump" aria-label="Brand assets sections">
          <div className="site-shell">
            {[
              ["01", "The story", "brand-story"],
              ["02", "Logo files", "brand-downloads"],
              ["03", "Colour palette", "brand-colours"],
              ["04", "Using our identity", "brand-use"],
            ].map(([number, label, id]) => (
              <a href={`#${id}`} key={id}>
                <span>{number}</span>
                {label}
                <Icon name="arrow" />
              </a>
            ))}
          </div>
        </nav>

        <section
          id="brand-story"
          className="brand-section"
          aria-labelledby="brand-story-heading"
        >
          <div className="site-shell">
            <div className="brand-section-heading">
              <p className="brand-eyebrow">01 / A family in every detail</p>
              <h2 id="brand-story-heading">
                More than a mark.
                <br />A story of belonging.
              </h2>
              <p>
                The emblem brings together the Holy Trinity, men, women,
                children and Canada. Tamil and English surround the same family,
                reflecting the faith and heritage we share.
              </p>
            </div>
            <div className="brand-story-grid">
              {story.map((item) => (
                <article className="brand-story-card" key={item.title}>
                  <div className="brand-symbol" style={{ color: item.colour }}>
                    <Symbol type={item.type} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
            <p className="brand-small-note">
              The symbols above are explanatory illustrations. Use the complete
              logo files below when representing ETCF.
            </p>
          </div>
        </section>

        <section
          id="brand-downloads"
          className="brand-section brand-section-soft"
          aria-labelledby="brand-downloads-heading"
        >
          <div className="site-shell">
            <div className="brand-section-heading">
              <p className="brand-eyebrow">02 / Ready to use</p>
              <h2 id="brand-downloads-heading">
                The right file.
                <br />
                The complete identity.
              </h2>
              <p>
                Start with the supplied artwork. Keep the Tamil and English
                lettering, colours and proportions together.
              </p>
            </div>
            <div className="brand-download-layout">
              <div className="brand-preview-card">
                <div
                  className="brand-preview-stage"
                  data-background={background}
                >
                  <div className="brand-logo-holder">
                    <img
                      src="/src/assets/logo.png"
                      width={926}
                      height={906}
                      loading="lazy"
                      alt="Full-colour ETCF logo shown on a white holding panel"
                    />
                  </div>
                </div>
                <div className="brand-preview-controls">
                  <span>Preview background</span>
                  <div role="group" aria-label="Logo preview background">
                    {["white", "soft", "dark"].map((value) => (
                      <button
                        type="button"
                        key={value}
                        aria-pressed={background === value}
                        onClick={() => setBackground(value)}
                      >
                        {value[0].toUpperCase() + value.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                <p>
                  A white holding panel protects the logo’s detail and contrast,
                  even on a dark background.
                </p>
              </div>
              <div className="brand-download-list">
                {brand.logos.map((logo) => (
                  <article className="brand-logo-card" key={logo.url}>
                    <div className="brand-file-heading">
                      <span className="brand-file-format">{logo.format}</span>
                      <p>
                        {logo.width} × {logo.height} px
                      </p>
                    </div>
                    <h3>{logo.name}</h3>
                    <p>{logo.description}</p>
                    <a
                      className="brand-download-link"
                      href={logo.url}
                      download={logo.filename}
                    >
                      Download {logo.format}
                      <Icon name="download" />
                    </a>
                  </article>
                ))}
                <p className="brand-small-note">
                  Need vector artwork, a large print file or another approved
                  format?{" "}
                  <a href={`mailto:${brand.contact}`}>Ask our media team.</a>{" "}
                  Please avoid enlarging these files beyond their native
                  resolution.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="brand-colours"
          className="brand-section"
          aria-labelledby="brand-colours-heading"
        >
          <div className="site-shell">
            <div className="brand-section-heading">
              <p className="brand-eyebrow">03 / Colour with meaning</p>
              <h2 id="brand-colours-heading">
                A palette that feels
                <br />
                like our community.
              </h2>
              <p>
                Indigo and purple ground the design. Blue, yellow and green
                bring warmth and life. Use the codes below for supporting
                layouts, while keeping the supplied logo unchanged.
              </p>
            </div>
            <div className="brand-colour-grid">
              {brand.colours.map((colour) => (
                <article className="brand-swatch" key={colour.hex}>
                  <div
                    className="brand-swatch-paint"
                    style={{ backgroundColor: colour.hex, color: colour.ink }}
                  >
                    <span>{colour.name}</span>
                    <code>{colour.hex}</code>
                  </div>
                  <div className="brand-swatch-body">
                    <p className="brand-colour-source">{colour.source}</p>
                    <p>{colour.meaning}</p>
                    <div className="brand-swatch-meta">
                      <span>RGB {rgb(colour.hex)}</span>
                      <button
                        type="button"
                        className="brand-copy"
                        aria-label={`Copy ${colour.name} hex code ${colour.hex}`}
                        onClick={() => copyColour(colour)}
                      >
                        <Icon name={copied === colour.hex ? "check" : "copy"} />
                        {copied === colour.hex ? "Copied" : "Copy HEX"}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="brand-colour-tools">
              <div className="brand-neutrals">
                {brand.neutrals.map((colour) => (
                  <button
                    type="button"
                    className="brand-neutral"
                    key={colour.hex}
                    aria-label={`Copy ${colour.name} hex code ${colour.hex}`}
                    onClick={() => copyColour(colour)}
                  >
                    <i
                      style={{ backgroundColor: colour.hex }}
                      aria-hidden="true"
                    />
                    <span>
                      {colour.name} <code>{colour.hex}</code>
                    </span>
                    <Icon name={copied === colour.hex ? "check" : "copy"} />
                  </button>
                ))}
              </div>
              <a
                className="brand-text-download"
                href="/brand/ETCF-Brand-Colours.json"
                download
              >
                Download colour values <Icon name="download" />
              </a>
            </div>
            <p
              className="brand-copy-notice"
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              {notice}
            </p>
            <div className="brand-colour-note">
              <h3>For a consistent finish</h3>
              <p>
                Use white text on indigo, purple or red. Use dark indigo text on
                blue, yellow or green. Green and red are screen references
                sampled from the logo; the original artwork contains colour
                variations. For print matching, CMYK values or specialist
                production, contact the media team.
              </p>
            </div>
          </div>
        </section>

        <section
          id="brand-use"
          className="brand-section brand-section-soft"
          aria-labelledby="brand-use-heading"
        >
          <div className="site-shell">
            <div className="brand-section-heading">
              <p className="brand-eyebrow">04 / Representing ETCF</p>
              <h2 id="brand-use-heading">
                Give our identity
                <br />
                room to be itself.
              </h2>
              <p>
                A few thoughtful choices keep the emblem clear, recognisable and
                consistent wherever it appears.
              </p>
            </div>
            <div className="brand-guidance-grid">
              <div className="brand-clearspace-card">
                <div className="brand-clearspace-diagram">
                  <span className="brand-space-label">Clear space</span>
                  <div>
                    <img
                      src="/src/assets/logo.png"
                      width={926}
                      height={906}
                      loading="lazy"
                      alt="ETCF logo with a clear margin on every side"
                    />
                  </div>
                </div>
                <h3>Let it breathe</h3>
                <p>
                  As a practical guide, leave at least one fifth of the logo’s
                  width clear on every side. Keep text, edges and other graphics
                  outside this space.
                </p>
              </div>
              <div className="brand-rule-grid">
                {[
                  [
                    "Keep the complete emblem",
                    "Use the original file. Keep both languages, the family, the dove and cross, and the maple leaves together.",
                  ],
                  [
                    "Keep its natural proportions",
                    "Resize proportionally. Don’t stretch, crop, rotate, recolour or add effects to the artwork.",
                  ],
                  [
                    "Choose a calm background",
                    "Use a white or very light surface. On a busy or dark layout, place the logo inside a generous white panel.",
                  ],
                  [
                    "Make every detail readable",
                    "Check the Tamil and English lettering at the final size. For tiny placements or large print, ask for an approved alternative.",
                  ],
                ].map(([title, text]) => (
                  <article className="brand-rule-card" key={title}>
                    <span className="brand-rule-check">
                      <Icon name="check" />
                    </span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </article>
                ))}
              </div>
            </div>
            <div className="brand-reuse">
              <div>
                <p className="brand-eyebrow">A note on reuse</p>
                <h3>
                  Available to download.
                  <br />
                  Permission still matters.
                </h3>
              </div>
              <div>
                <p>
                  These downloads help you prepare ETCF-related materials. They
                  are not an open-source or public-domain licence. Please obtain
                  permission from the ETCF media team before publishing or
                  distributing the assets.
                </p>
                <p>
                  For commercial use, merchandise, partnerships or adapted
                  artwork, request written approval. Do not imply ETCF
                  endorsement or sponsorship without approval. Logo downloads do
                  not grant permission to reuse photographs or other website
                  content.
                </p>
                <p>
                  Include where appropriate:{" "}
                  <strong>“Edmonton Tamil Catholic Family (ETCF)”</strong> and a
                  link to{" "}
                  <a href="https://www.edmontontamilcatholics.ca/">
                    edmontontamilcatholics.ca
                  </a>
                  .
                </p>
                <a
                  className="brand-text-download"
                  href="/brand/ETCF-Brand-Guidelines.txt"
                  download
                >
                  Download the usage guide <Icon name="download" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          className="brand-contact"
          aria-labelledby="brand-contact-heading"
        >
          <div className="site-shell">
            <p className="brand-eyebrow">Let’s get it right, together</p>
            <h2 id="brand-contact-heading">
              A question about our brand?
              <br />
              Our media team can help.
            </h2>
            <p>
              For permissions, print-ready artwork, colour matching or anything
              else, get in touch.
            </p>
            <a href={`mailto:${brand.contact}`}>
              <span>{brand.contact}</span>
              <Icon name="arrow" />
            </a>
          </div>
        </section>
      </main>
      <HomeFooter />
    </>
  );
}
