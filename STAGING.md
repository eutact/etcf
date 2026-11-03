# Staging and release workflow

Use `staging` for shared review and `main` for production. The branch is based on
`main`; its Vercel preview domain and DNS configuration are managed separately.

## Recommended setup

Use one Vercel project connected to `eutact/etcf`:

| Purpose | Git branch | Address | Vercel environment |
| --- | --- | --- | --- |
| Production | `main` | `www.edmontontamilcatholics.ca` | Production |
| Shared staging | `staging` | `staging.edmontontamilcatholics.ca` | Preview, assigned to `staging` |
| Individual work | `feature/*` pull requests | Generated preview URL | Preview |

A persistent preview branch works on all Vercel plans, including Hobby. A named
custom environment is an alternative on Pro/Enterprise, but is not needed for
this workflow. [Vercel staging options](https://vercel.com/docs/deployments/environments#setting-up-a-staging-environment).

## Connect staging to Vercel

1. Commit the reviewed changes and push the `staging` branch, without merging it
   into `main`. Keep the Vercel Production Branch set to `main`.
2. In the Vercel project, open **Settings → Domains**, add
   `staging.edmontontamilcatholics.ca`, and choose **Preview** with Git Branch
   `staging`. Confirm it is assigned to that branch rather than production.
3. Add the exact DNS record supplied by Vercel at the domain's DNS provider.
   This is a subdomain record; the existing production domain and email records
   do not need to change. Verify HTTPS and the branch assignment in Vercel.
4. Add only `https://staging.edmontontamilcatholics.ca` to the existing Sanity
   project's CORS origins, with **Allow credentials off** for public reads.
   This is a later project-setting change, not a required CMS code/schema change.
5. Protect staging with Vercel deployment protection if reviewers can sign in.
   Verify a `X-Robots-Tag: noindex, nofollow` response header on the custom staging
   domain. Vercel's generated previews default to noindex, but a custom preview
   domain does not inherit that guarantee. Configure this only for staging;
   production must remain indexable.
6. Before manually testing form submission, use sandbox/test endpoints or prepare
   a staging-only submission mode. Current contact/newsletter endpoints are live;
   the automated suite mocks them instead of delivering messages.

[Vercel branch-domain instructions](https://vercel.com/docs/domains/working-with-domains/assign-domain-to-a-git-branch)
· [Preview indexing behavior](https://vercel.com/kb/guide/are-vercel-preview-deployment-indexed-by-search-engines)
· [Sanity CORS](https://www.sanity.io/docs/content-lake/cors).

## Routine changes

Create feature branches, open pull requests into `staging`, and review them using
preview deployments. Once the staging website passes review, open a pull request
from `staging` into `main`. Merge only the approved changes to release production.
Sync `staging` with `main` after releases and production hotfixes.

Protect `main` against direct pushes and require the build/unit/browser checks
before merging. A GitHub Actions workflow can run Node.js 24, `npm ci`, `npm test`
and `npm run test:e2e`. Keep at least Chromium in routine pull-request checks;
run the full three-engine suite before a release. Repository rules and CI are
recommendations here; they have not been configured by this cleanup.

## Content and configuration

For design-only reviews, staging can read the same published Sanity dataset.
That means CMS edits still affect production content. If staging will be used to
edit/test content, plan a separate dataset later instead of testing writes on
production. No dataset or Studio changes have been made now.

Keep staging variables separate from production. The current Sanity client is a
public read client and does not require a token in the browser. A domain can have
its own browser game progress; do not assume local progress carries between
production and staging.

Before release, check mobile navigation, Ruban's portrait, all committee panels,
events/calendar, gallery, the three games and the legal pages on the staging URL.
Confirm it shows the intended commit and production is still on the previous
release. Use Vercel's prior production deployment for rollback if needed.

## Local cleanup review

Ruban Peppin’s supplied photo is used only in his existing committee profile.
Robin Peter retains his initials. The portrait keeps the established circular
crop and responsive sizes. The supplied PNG has not been modified.

Removed the obsolete HTML/CSS reference archive, reference test server, historical
migration/planning reports and their two unused image-comparison dependencies.
The website source now consists of Next.js routes/components and their required
styles, browser logic and public assets. Existing public URLs remain supported,
including the production `index.html` route.

Validation completed for this local change:

- Production build and 21 unit tests passed.
- All 84 phone/desktop browser checks passed in Chromium, WebKit and Firefox.
- 60 unchanged section screenshots matched the pre-cleanup Next.js build. The
  intended committee photo change was checked separately on mobile and desktop.
- All generated local asset/link references resolve, and Ruban’s original PNG
  matches the exported image byte for byte.
- `git diff --check` passed; the separate CMS repository remains unchanged.

These checks do not publish or configure the staging domain.
