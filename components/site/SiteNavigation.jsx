export default function SiteNavigation() {
  return (
    <>
      <nav
        id={"navbar"}
        className={"global-header transition-all duration-300"}
        aria-label={"Primary navigation"}
      >
        {"\n        "}
        <div
          className={"site-shell flex items-center justify-between gap-4 py-3"}
        >
          {"\n            "}
          <a
            href={"index.html#home"}
            className={"global-logo"}
            aria-label={"ETCF home"}
          >
            {"\n                "}
            <img
              src={"src/assets/logowithbg.jpg"}
              className={"global-logo-img"}
              alt={"Edmonton Tamil Catholic Family logo"}
            />
            {"\n                "}
            <span>{"ETCF"}</span>
            {"\n            "}
          </a>
          {"\n\n            "}
          <ul
            className={"global-nav-list hidden lg:flex"}
            aria-label={"Primary navigation links"}
          >
            {"\n                "}
            <li>
              <a
                data-nav={"home"}
                className={"global-nav-link"}
                href={"index.html#home"}
              >
                {"Home"}
              </a>
            </li>
            {"\n                "}
            <li>
              <a
                data-nav={"about"}
                className={"global-nav-link"}
                href={"index.html#about"}
              >
                {"About"}
              </a>
            </li>
            {"\n                "}
            <li>
              <a
                data-nav={"events"}
                className={"global-nav-link"}
                href={"index.html#event-section"}
              >
                {"Events"}
              </a>
            </li>
            {"\n                "}
            <li>
              <a
                data-nav={"mission"}
                className={"global-nav-link"}
                href={"index.html#mission"}
              >
                {"Vision & Mission"}
              </a>
              {"\n                "}
            </li>
            {"\n                "}
            <li>
              <a
                data-nav={"gallery"}
                className={"global-nav-link"}
                href={"gallery.html"}
              >
                {"Gallery"}
              </a>
            </li>
            {"\n                "}
            <li>
              <a
                data-nav={"kids"}
                className={"global-nav-link"}
                href={"kids-resources.html"}
              >
                {"Kids"}
              </a>
            </li>
            {"\n                "}
            <li>
              <a
                data-nav={"contact"}
                className={"global-nav-link"}
                href={"index.html#contact"}
              >
                {"Contact"}
              </a>
            </li>
            {"\n            "}
          </ul>
          {"\n\n            "}
          <button
            id={"menu-btn"}
            className={"global-menu-toggle lg:hidden"}
            type={"button"}
            aria-label={"Open navigation menu"}
            aria-expanded={"false"}
            aria-controls={"mobile-menu"}
          >
            {"\n                "}
            <i
              id={"menu-icon"}
              className={"fas fa-bars"}
              aria-hidden={"true"}
            ></i>
            {"\n            "}
          </button>
          {"\n        "}
        </div>
        {"\n\n        "}
        <div
          id={"mobile-backdrop"}
          className={"mobile-backdrop hidden lg:hidden"}
        ></div>
        {"\n        "}
        <div
          id={"mobile-menu"}
          className={"mobile-menu hidden lg:hidden"}
          role={"dialog"}
          aria-modal={"true"}
          aria-label={"Primary navigation menu"}
          aria-hidden={"true"}
        >
          {"\n            "}
          <div className={"mobile-menu-header"}>
            {"\n                "}
            <span>{"Menu"}</span>
            {"\n                "}
            <button
              id={"menu-close"}
              className={"global-menu-toggle"}
              type={"button"}
              aria-label={"Close navigation menu"}
            >
              {"\n                    "}
              <i className={"fas fa-times"} aria-hidden={"true"}></i>
              {"\n                "}
            </button>
            {"\n            "}
          </div>
          {"\n            "}
          <ul className={"mobile-nav-list"}>
            {"\n                "}
            <li>
              <a
                data-nav={"home"}
                className={"mobile-nav-link"}
                href={"index.html#home"}
              >
                {"Home"}
              </a>
            </li>
            {"\n                "}
            <li>
              <a
                data-nav={"about"}
                className={"mobile-nav-link"}
                href={"index.html#about"}
              >
                {"About"}
              </a>
            </li>
            {"\n                "}
            <li>
              <a
                data-nav={"events"}
                className={"mobile-nav-link"}
                href={"index.html#event-section"}
              >
                {"Events"}
              </a>
            </li>
            {"\n                "}
            <li>
              <a
                data-nav={"mission"}
                className={"mobile-nav-link"}
                href={"index.html#mission"}
              >
                {"Vision & Mission"}
              </a>
              {"\n                "}
            </li>
            {"\n                "}
            <li>
              <a
                data-nav={"gallery"}
                className={"mobile-nav-link"}
                href={"gallery.html"}
              >
                {"Gallery"}
              </a>
            </li>
            {"\n                "}
            <li>
              <a
                data-nav={"kids"}
                className={"mobile-nav-link"}
                href={"kids-resources.html"}
              >
                {"Kids"}
              </a>
            </li>
            {"\n                "}
            <li>
              <a
                data-nav={"contact"}
                className={"mobile-nav-link"}
                href={"index.html#contact"}
              >
                {"Contact"}
              </a>
            </li>
            {"\n            "}
          </ul>
          {"\n        "}
        </div>
        {"\n    "}
      </nav>
    </>
  );
}
