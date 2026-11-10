import { useState } from "react";
import SiteNavigation from "../site/SiteNavigation";
import { HomeFooter } from "../site/SiteFooters";
import social from "../../data/social-media.json";

function ExternalLink({ href, children, ...props }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children} <span aria-hidden="true">↗</span>
    </a>
  );
}

// Platform-hosted feeds read current content when opened. No tokens, scraping,
// browser SDKs or build-time snapshots are needed for these public embeds.
function SocialEmbed({ title, src, platform, video = false, image, children }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      className={`social-embed ${video ? "social-embed-video" : "social-embed-feed"}`}
    >
      {loaded ? (
        <>
          <iframe
            title={title}
            src={src}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
          />
          <button
            className="social-close-embed"
            onClick={() => setLoaded(false)}
          >
            Close {platform} embed
          </button>
        </>
      ) : (
        <div className="social-embed-preview">
          {image && (
            <img
              className="social-video-image"
              src={image}
              alt=""
              loading="lazy"
              width="480"
              height="360"
            />
          )}
          {children}
          <span className="social-platform-symbol" aria-hidden="true">
            {video ? "▶" : platform === "Facebook" ? "f" : "◎"}
          </span>
          <p>{title}</p>
          <button className="information-button" onClick={() => setLoaded(true)}>
            Load {platform} {video ? "player" : "feed"}{" "}
            <span aria-hidden="true">↗</span>
          </button>
          <small>Connects to {platform} when loaded.</small>
        </div>
      )}
    </div>
  );
}

export default function SocialMediaPage() {
  return (
    <>
      <SiteNavigation />
      <main className="information-page" id="social-media">
        <header className="information-hero social-hero">
          <div className="site-shell">
            <p className="information-eyebrow">ETCF / Community & media</p>
            <h1>
              Our faith.
              <br />
              <span>Our family. Our moments.</span>
            </h1>
            <p className="information-lead">
              Songs that bring us together. Celebrations worth remembering. Stay
              close to Edmonton Tamil Catholic Family through our official
              social channels.
            </p>
            <div className="information-actions">
              <a className="information-button" href="#featured">
                Explore the highlights <span aria-hidden="true">↓</span>
              </a>
              <a className="information-outline-button" href="#social-feeds">
                See our latest posts <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <div className="social-hero-mark" aria-hidden="true">
            Together
            <br />
            in faith.
          </div>
        </header>

        <section
          className="information-section site-shell"
          id="featured"
          aria-labelledby="featured-heading"
        >
          <div className="information-section-heading">
            <p className="information-eyebrow">A few moments to begin with</p>
            <h2 id="featured-heading">From our community, with love</h2>
            <p>
              A selection of music and milestones from ETCF’s YouTube channel.
            </p>
          </div>
          <div className="social-featured-grid">
            {social.featured.map((video, index) => (
              <article className="social-video-card" key={video.id}>
                <SocialEmbed
                  title={`Watch ${video.title}`}
                  platform="YouTube"
                  video
                  image={`/images/social/${video.id}.jpg`}
                  src={`https://www.youtube-nocookie.com/embed/${video.id}?rel=0`}
                >
                  <span className="social-video-index" aria-hidden="true">
                    0{index + 1}
                  </span>
                </SocialEmbed>
                <div className="social-video-copy">
                  <p className="information-eyebrow">{video.category}</p>
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>
                  <ExternalLink
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                  >
                    Watch on YouTube
                  </ExternalLink>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className="social-feeds-section"
          id="social-feeds"
          aria-labelledby="social-feeds-heading"
        >
          <div className="site-shell">
            <div className="information-section-heading">
              <p className="information-eyebrow">Keep the connection</p>
              <h2 id="social-feeds-heading">The latest from ETCF</h2>
              <p>
                Our feeds show the latest content made available by each
                platform when you load them. Follow our official accounts for
                every update.
              </p>
            </div>
            <article className="social-youtube-feed">
              <div className="social-feed-copy">
                <p className="information-eyebrow">01 / YouTube</p>
                <h3>Press play on community life.</h3>
                <p>
                  Tamil hymns, worship and moments from our gatherings. Browse
                  our channel’s uploads as new videos are shared.
                </p>
                <ExternalLink href={social.youtube.url}>
                  Visit our YouTube channel
                </ExternalLink>
              </div>
              <SocialEmbed
                title="Latest ETCF YouTube uploads"
                platform="YouTube"
                video
                src={`https://www.youtube-nocookie.com/embed/videoseries?list=${social.youtube.uploadsPlaylist}&rel=0`}
              />
            </article>
            <div className="social-platform-grid">
              <article className="social-feed-card">
                <div className="social-feed-copy">
                  <p className="information-eyebrow">02 / Facebook</p>
                  <h3>Where our community connects.</h3>
                  <p>
                    Community news, event posts and memories from our ETCF
                    Facebook page.
                  </p>
                  <ExternalLink href={social.facebook.url}>
                    Follow ETCF on Facebook
                  </ExternalLink>
                </div>
                <SocialEmbed
                  title="ETCF Facebook timeline"
                  platform="Facebook"
                  src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(social.facebook.pageUrl)}&tabs=timeline&width=500&height=600&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false`}
                />
              </article>
              <article className="social-feed-card">
                <div className="social-feed-copy">
                  <p className="information-eyebrow">03 / Instagram</p>
                  <h3>Little moments. Lasting memories.</h3>
                  <p>
                    Photos, reels and glimpses of faith and fellowship from
                    @edmontontamilcatholics.
                  </p>
                  <ExternalLink href={social.instagram.url}>
                    Follow ETCF on Instagram
                  </ExternalLink>
                </div>
                <SocialEmbed
                  title="ETCF Instagram posts & reels"
                  platform="Instagram"
                  src={`https://www.instagram.com/${social.instagram.username}/embed/`}
                />
              </article>
            </div>
            <p className="social-feed-note">
              Feeds are provided by YouTube, Facebook and Instagram.
              Availability depends on their privacy settings and your browser;
              some posts may require sign-in. If a feed does not appear, use the
              official account link above. Loading a feed is subject to that
              platform’s privacy policy.
            </p>
            <noscript>
              <p className="social-feed-note">
                To watch videos and browse posts, use the official account and
                video links on this page.
              </p>
            </noscript>
          </div>
        </section>
        <section
          className="information-contact"
          aria-labelledby="media-contact-heading"
        >
          <div className="site-shell">
            <p className="information-eyebrow">Keep in touch</p>
            <h2 id="media-contact-heading">A moment worth sharing?</h2>
            <p>
              Have a community story, a media question or a favourite ETCF post?
              We’d love to hear from you.
            </p>
            <a href="mailto:info@edmontontamilcatholics.ca">
              info@edmontontamilcatholics.ca <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </main>
      <HomeFooter />
    </>
  );
}
