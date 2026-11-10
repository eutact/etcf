# Registration and community media pages

`/registration.html` is linked with the footer’s legal links. Its facts are
transcribed from the certificate supplied by ETCF: Edmonton Tamil Catholic Family,
Alberta, September 25, 2025, Companies Act, company limited by shares. The page
does not claim charitable tax status or publish an unprovided registration number.
Requests for documentation go to info@edmontontamilcatholics.ca.

`/social-media.html` is linked under Resources in every footer variant. It features
three verified ETCF YouTube videos plus the official YouTube uploads playlist,
Facebook timeline and Instagram profile preview.

## Automatic updates

The three feeds use platform-hosted embeds. When a visitor selects **Load feed**
(or **Load player**), the platform serves its current public content. New public
uploads/posts become available through these embeds without a website rebuild,
scheduled scraping job, API credentials or access tokens. Reopening or reloading
the embed requests its current content; the page does not poll while someone is
watching. Featured highlights are intentionally curated separately in
`data/social-media.json`.

Official profiles:

- https://youtube.edmontontamilcatholics.ca/
- https://facebook.edmontontamilcatholics.ca/
- https://instagram.edmontontamilcatholics.ca/

These official ETCF links are used on the social page and throughout the footer.
Their verified redirects lead to `youtube.com/@edmontontamilcatholics`,
`facebook.com/edmontontamilcatholics` and `instagram.com/edmontontamilcatholics/`.
Embeds use the platform destinations directly: the Facebook timeline uses
`facebook.pageUrl` in `data/social-media.json`, rather than a redirecting domain.

The YouTube channel ID is `UCJahPJyiJuXjqJRIhTRMD3g`; its uploads playlist is
`UUJahPJyiJuXjqJRIhTRMD3g`. Instagram was verified against the account linked
in ETCF’s own YouTube description and its public Instagram profile. Featured
video titles and ownership were checked with YouTube oEmbed.

Facebook must remain a published public Page, and Instagram must be public with
profile embedding enabled. Platform restrictions, sign-in requirements, regional
availability, blockers and individual video embedding settings can affect what
visitors see. Account and video links remain available even with JavaScript
disabled or an unavailable embed. No requests to social platforms are made by this page
until a visitor loads an embed; thumbnails are stored locally.

The Content Security Policy allows frames only from the three explicit platform
origins; it does not permit external SDK scripts. On cPanel, use the same updated
`frame-src` directive in the hosting CSP. Vercel and the static preview already
read the policy in `vercel.json`. Upload the complete `out/` build, including
`images/social/`, as described in DEPLOYMENT.md.

## Updating highlights

Edit `data/social-media.json` and use verified video IDs belonging to ETCF. Store
the corresponding thumbnail at `public/images/social/<video-id>.jpg`, then rebuild.
The curated selection makes no popularity or view-count claims.

Before release, load each live feed from the deployed domain and confirm that
the accounts’ embedding settings still allow it. Public embed endpoints were
reachable during implementation; automated interaction tests isolate external
services and cannot guarantee future third-party availability.

Platform references:

- https://developers.google.com/youtube/player_parameters
- https://developers.facebook.com/docs/plugins/page-plugin/
- https://help.instagram.com/620154495870484
