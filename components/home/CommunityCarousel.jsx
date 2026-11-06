export default function CommunityCarousel() {
  return (
    <>
      <section
        id={"home"}
        className={"relative h-[60vh] overflow-hidden"}
        aria-label={"ETCF community photo carousel"}
      >
        {"\n        "}
        {"\n        "}
        <div className={"absolute inset-0 overflow-hidden"}>
          {"\n            "}
          <div className={"carousel-slides h-full w-full"}>
            {"\n                "}
            <img
              className={
                "carousel-slide active absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ease-in-out"
              }
              src="/src/assets/home1.jpg"
              alt="Edmonton Tamil Catholic Family community gathering"
              width="5824"
              height="2230"
              loading="eager"
              fetchPriority="high"
            />
            {"\n                "}
            <div
              className={
                "carousel-slide absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
              }
              style={{ backgroundImage: "url('/src/assets/home2.jpg')" }}
            ></div>
            {"\n                "}
            <div
              className={
                "carousel-slide absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
              }
              style={{ backgroundImage: "url('/src/assets/home3.jpg')" }}
            ></div>
            {"\n                "}
            <div
              className={
                "carousel-slide absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
              }
              style={{ backgroundImage: "url('/src/assets/home4.jpg')" }}
            ></div>
            {"\n                "}
            <div
              className={
                "carousel-slide absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
              }
              style={{ backgroundImage: "url('/src/assets/home5.jpg')" }}
            ></div>
            {"\n                "}
            <div
              className={
                "carousel-slide absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
              }
              style={{ backgroundImage: "url('/src/assets/home6.jpg')" }}
            ></div>
            {"\n                "}
            <div
              className={
                "carousel-slide absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
              }
              style={{ backgroundImage: "url('/src/assets/home7.jpg')" }}
            ></div>
            {"\n                "}
            <div
              className={
                "carousel-slide absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
              }
              style={{ backgroundImage: "url('/src/assets/home8.jpg')" }}
            ></div>
            {"\n            "}
          </div>
          {"\n        "}
        </div>
        {"\n\n        "}
        {"\n        "}
        <div
          className={
            "absolute bottom-0 left-0 w-full z-[100] bg-primary bg-opacity-50 py-3 overflow-hidden"
          }
        >
          {"\n            "}
          <div id={"ticker"} className={"overflow-hidden"}>
            {"\n                "}
            <div
              id={"tickerTrack"}
              className={"flex whitespace-nowrap will-change-transform"}
            ></div>
            {"\n            "}
          </div>
          {"\n        "}
        </div>
        {"\n\n\n    "}
      </section>
    </>
  );
}
