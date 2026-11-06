# Edmonton-first SEO and Canadian reach

Reviewed November 5, 2026. Implementation is local pending release approval.

## Search intent and content

| Audience | Main page | Purpose |
| --- | --- | --- |
| People seeking Tamil Mass and Catholic community in Edmonton | `/` | Identify ETCF clearly, explain the local gathering place and connect visitors to confirmed upcoming events and the committee. |
| Tamil Catholic families searching across Canada | `/tamil-catholics-canada.html` | Provide useful, source-backed parish and diocese starting points, travel guidance and online family resources. Edmonton appears first. |
| Parents seeking Bible activities and Catholic family resources | `/kids-resources.html` | Describe the actual games, prayers and family activities, with the existing Beta notice. |
| Community photos | `/gallery.html` | Give the archive a specific title, description and canonical URL. |
| Individual game sessions | `/kids-play.html` | Consolidate query-string variations under one canonical game page. |
| Policies and community terms | `/privacy-policy.html`, `/terms.html` | Use accurate page-specific metadata and existing public paths. |

The Canada guide identifies independent communities through their official websites. It does not present them as ETCF branches. ETCF's organization data retains Edmonton as its service area; the website and online resources can reach families throughout Canada.

## Technical implementation

- `data/site-seo.json` holds the shared organization identity, contact details, Edmonton address, public social profiles and sharing image. Organization, website and page records use consistent JSON-LD identifiers.
- `data/page-meta.json` holds each page's unique title, description and canonical path. `src/seo.cjs` generates matching search and sharing metadata from these two sources.
- Canonical URLs consistently use `https://www.edmontontamilcatholics.ca`. The apex domain already redirects there. The `/index.html` alias points canonically to `/`.
- Policy URLs now match the real `.html` pages rather than nonexistent friendly paths.
- The incorrect postal code and missing logo asset in the previous schema are corrected to the visible, verified Edmonton details. Contact information matches the website footer.
- Robots.txt and a seven-page XML sitemap are generated at build time from canonical metadata. The homepage alias is excluded. No artificial modification dates or search-priority scores are generated.
- Titles, descriptions, canonical tags and JSON-LD are present in original server-rendered HTML. The first homepage photo is a real image with alt text, dimensions, eager loading and high fetch priority; React generates its image preload. It is visible before JavaScript runs.
- The default English document includes a language annotation on the Tamil introduction. Hreflang alternatives are not declared because separate translated pages do not exist.
- The 404 page returns HTTP 404 and carries `noindex, follow`.
- Existing page layouts, photo order, CMS queries and content-publishing workflow are preserved. No Sanity schema or dataset changes are required.

## Research and factual sources

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide): useful content, descriptive titles, accessible links and crawlable pages form the foundation. Search visibility and rankings are not guaranteed.
- [Google supported meta tags](https://developers.google.com/search/docs/crawling-indexing/special-tags): Google ignores the keywords meta tag. The implementation focuses on descriptive content rather than repeating keywords in metadata.
- [Google canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls): canonical signals, internal page paths and sitemap URLs should be consistent.
- [Google organization markup](https://developers.google.com/search/docs/appearance/structured-data/organization): identify the organization with accurate administrative details and a real logo.
- [Google structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies): markup should match the visible content. No invented reviews, ratings, offices, religious-event dates or organizational relationships are added.
- [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap): list canonical pages and use modification dates only when reliable.
- [St. Theresa Parish](https://sttheresa.caedm.ca/contact/): verified Edmonton venue address and postal code.
- [Our Lady of Good Health Parish, Scarborough](https://olgoodhealthsc.archtoronto.org/en/contact-us/parish-information/): official parish information and Tamil-language Mass listing. The guide links to its current schedule instead of copying times that can change.
- [Canadian Conference of Catholic Bishops directory](https://www.cccb.ca/the-catholic-church-in-canada/directory-of-dioceses-eparchies-ordinariates/): official starting point for locating Catholic dioceses throughout Canada.

## After publication

1. Confirm the production host, seven canonical pages, `/robots.txt` and `/sitemap.xml` return the expected content. Check the original HTML, not only the browser's updated DOM.
2. In the verified Google Search Console property for the domain, submit `https://www.edmontontamilcatholics.ca/sitemap.xml`. Search Console connection is currently unconfirmed; this work does not create a property or change DNS ownership records.
3. Use URL Inspection for the homepage, Canada guide and Kids resources page. Confirm the selected canonical and request indexing after a successful live inspection. A sitemap or request does not guarantee indexing or ranking.
4. Record a baseline for impressions, clicks, queries and Canada/Edmonton traffic. Review trends after recrawling rather than judging changes immediately after deployment.
5. Update confirmed event information through the existing CMS. Add accurate event descriptions and photo captions as the community provides them. Keep visitor information and external parish links current.
6. Seek relevant editorial links from the parish, archdiocese and community organizations where appropriate. No outreach messages or directory submissions were sent as part of this implementation.

No first-position or every-query guarantee can be made. Broader Canadian visibility depends on useful ongoing content, recognition by relevant organizations and search-engine indexing, alongside these technical improvements.

## AI-readable site guide

The build generates `/llms.txt` using the [llms.txt proposal](https://llmstxt.org/),
with `/llm.txt` as an identical alias for the requested spelling. It provides an
Edmonton-first overview, shared public contacts, canonical page links and notes
about confirming current event details. Page summaries come from the SEO config,
so future title or URL changes also update these files. Each page exposes the
guide through a `describedby` link in its HTML head.

This is supplementary site documentation, not a replacement for robots.txt,
the sitemap or search indexing. Google's [AI search guidance](https://developers.google.com/search/docs/appearance/ai-features)
says that special AI text files are not required for its AI search features.

## Verification completed

- Production export and generated crawl files: passed. The XML sitemap parses
  correctly and all seven canonical URLs map to exported page files.
- Unit checks: 31 passed, including metadata consistency, shared organization
  details, valid asset paths, canonical coverage and crawler directives.
- Browser checks: 354 passed across Chrome, Firefox and WebKit, with desktop and
  phone layouts. Cached test browsers were restored before the final runs.
- SEO cases cover original HTML metadata/JSON-LD, one canonical, the homepage
  alias, visible content without JavaScript, the first photo and its preload,
  keyboard-accessible visitor information, and the real 404/noindex response.
- Responsive checks cover all seven pages across seventeen layouts from 280px to
  3440px, including short landscape layouts. Existing calendar, gallery, forms,
  committee disclosures, motion and Kids games passed their regression checks.
- Automated accessibility scan: all seven pages checked, with visitor answers
  expanded; zero violations detected by the WCAG 2 A/AA and WCAG 2.1 AA rules.
- Desktop and mobile previews of the new guide and visitor content were visually
  reviewed. These automated results do not guarantee search-engine indexing or
  a particular search appearance; inspect the live URLs after approval to publish.
