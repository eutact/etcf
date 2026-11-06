import DeveloperCredit from "../site/DeveloperCredit";

export default function KidsPlayPage() {
  return (
    <>
      {" "}
      {"\n    "}
      <div className={"game-shell"} data-game-shell>
        {"\n        "}
        <header className={"game-topbar"}>
          {"\n            "}
          <div
            className={"game-brand"}
            aria-label={"Edmonton Tamil Catholic Family"}
          >
            {"\n                "}
            <img
              src={"src/assets/logo-rounded.png"}
              alt={""}
              width={"36"}
              height={"36"}
            />
            {"\n                "}
            <span>
              {"ETCF"}
              <span className={"game-brand-caption"}>{"Kids Corner"}</span>
            </span>
            {"\n            "}
          </div>
          {"\n            "}
          <div className={"game-current"}>
            {"\n                "}
            <p data-game-name>{"Play Together"}</p>
            {"\n                "}
            <div className={"game-progress-row"}>
              {"\n                    "}
              <progress
                data-game-meter
                value={"0"}
                max={"1"}
                aria-label={"Activity progress"}
              ></progress>
              {"\n                    "}
              <span data-game-progress role={"status"}>
                {"Choose an activity"}
              </span>
              {"\n                "}
            </div>
            {"\n            "}
          </div>
          {"\n            "}
          <div className={"game-top-actions"}>
            {"\n                "}
            <div className={"game-more-wrap"}>
              {"\n                    "}
              <button
                type={"button"}
                className={"kids-button kids-button-quiet game-more"}
                data-game-more
                aria-expanded={"false"}
                aria-controls={"game-more-options"}
              >
                {"More "}
                <span aria-hidden={"true"}>{"···"}</span>
              </button>
              {"\n                    "}
              <div
                id={"game-more-options"}
                className={"game-menu"}
                data-game-menu
                hidden
                role={"group"}
                aria-label={"More game options"}
              >
                {"\n                        "}
                <button type={"button"} data-game-help>
                  {"How to play"}
                </button>
                {"\n                        "}
                <button type={"button"} data-game-restart hidden>
                  {"Restart"}
                </button>
                {"\n                        "}
                <button type={"button"} data-game-fullscreen hidden>
                  {"Full screen"}
                </button>
                {"\n                    "}
              </div>
              {"\n                "}
            </div>
            {"\n                "}
            <button
              type={"button"}
              className={"kids-button kids-button-quiet game-exit"}
              data-game-exit
            >
              {"Exit "}
              <span aria-hidden={"true"}>{"↗"}</span>
            </button>
            {"\n            "}
          </div>
          {"\n        "}
        </header>
        {"\n        "}
        <main className={"game-main"} data-kids-games>
          {"\n            "}
          <section className={"kids-stage"}>
            {"\n                "}
            <h1 className={"kids-game-title"}>
              {"A little time to play together."}
            </h1>
            {"\n                "}
            <p className={"kids-game-intro"}>
              {
                "Choose a Bible quiz, matching game, or story to build together."
              }
            </p>
            {"\n                "}
            <noscript>
              <p>
                {"Please enable JavaScript to play. "}
                <a
                  className={"kids-button"}
                  href={"kids-resources.html#kids-activities"}
                >
                  {"Exit to Kids Corner"}
                </a>
              </p>
            </noscript>
            {"\n            "}
          </section>
          {"\n        "}
        </main>
        {"\n        "}
        <footer className="game-footer">
          <p className={"game-footnote"}>
            {"Learn, Play & Pray Together "}
            <span aria-hidden={"true"}>{"·"}</span>
            {" No timer. No rush."}
          </p>
          <DeveloperCredit />
        </footer>
        {"\n        "}
        <p
          className={"game-announcement"}
          data-game-notice
          role={"status"}
          aria-live={"polite"}
        ></p>
        {"\n        "}
        <dialog
          className={"game-dialog"}
          data-game-dialog
          aria-labelledby={"game-dialog-title"}
        ></dialog>
        {"\n    "}
      </div>
      {"\n"}{" "}
    </>
  );
}
