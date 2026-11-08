// CMS content is public data, not permission to execute a URL or load any origin.
const siteOrigin = "https://www.edmontontamilcatholics.ca";

function safeLink(value, fallback = "") {
  if (typeof value !== "string" || !value.trim()) return fallback;
  const candidate = value.trim();
  if (/[\u0000-\u001f\u007f\\]/.test(candidate)) return fallback;
  try {
    const url = new URL(candidate, siteOrigin);
    if (url.protocol !== "https:" || url.username || url.password)
      return fallback;
    return url.origin === siteOrigin && !/^https:/i.test(candidate)
      ? `${url.pathname}${url.search}${url.hash}`
      : url.href;
  } catch {
    return fallback;
  }
}

function safeImage(value, fallback = "/images/events/willupdate.png") {
  const link = safeLink(value);
  if (!link) return fallback;
  const url = new URL(link, siteOrigin);
  return [siteOrigin, "https://cdn.sanity.io"].includes(url.origin)
    ? link
    : fallback;
}

module.exports = { safeLink, safeImage };
