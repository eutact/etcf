import social from "../../data/social-media.json";

export default function SocialLinks() {
  return (
    <div className="footer-legal">
      {[
        ["facebook", "Facebook", "facebook-f"],
        ["youtube", "YouTube", "youtube"],
        ["instagram", "Instagram", "instagram"],
      ].map(([key, label, icon]) => (
        <a
          key={key}
          href={social[key].url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-yellow-500 hover:text-yellow-300"
          aria-label={`ETCF on ${label}`}
        >
          <i aria-hidden="true" className={`fab fa-${icon} text-2xl`} />
        </a>
      ))}
    </div>
  );
}
