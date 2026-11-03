import CopyrightYear from "./CopyrightYear";

export function HomeFooter() {
  return (
    <>
      {" "}
      <footer className={"bg-gray-800 text-white pt-12 fade-in w-full"}>
        {"\n        "}
        <div
          className={
            "container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12"
          }
        >
          {"\n\n            "}
          {"\n            "}
          <div>
            {"\n                "}
            <h3 className={"text-xl font-bold mb-6"}>{"Quick Links"}</h3>
            {"\n                "}
            <ul className={"space-y-4"}>
              {"\n                    "}
              <li>
                <a href={"#about"} className={"hover:text-yellow-300"}>
                  {"About Us"}
                </a>
              </li>
              {"\n                    "}
              <li>
                <a href={"#event-section"} className={"hover:text-yellow-300"}>
                  {"Events"}
                </a>
              </li>
              {"\n                    "}
              <li>
                <a href={"gallery.html"} className={"hover:text-yellow-300"}>
                  {"Gallery"}
                </a>
              </li>
              {"\n                    "}
              <li>
                <a
                  href={"#newsletter-form"}
                  className={"hover:text-yellow-300"}
                >
                  {"Newsletter"}
                </a>
              </li>
              {"\n                "}
            </ul>
            {"\n            "}
          </div>
          {"\n\n            "}
          {"\n            "}
          <div>
            {"\n                "}
            <h3 className={"text-xl font-bold mb-6"}>
              {"Contact Information"}
            </h3>
            {"\n                "}
            <ul className={"space-y-4"}>
              {"\n                    "}
              <li>
                <span className={"font-semibold"}>{"Email:"}</span>{" "}
                <a
                  href={"mailto:info@edmontontamilcatholics.ca"}
                  target={"_blank"}
                  className={"hover:text-yellow-300"}
                >
                  {"info@edmontontamilcatholics.ca"}
                </a>
              </li>
              {"\n                    "}
              <li>
                <span className={"font-semibold"}>{"Phone:"}</span>{" "}
                <a
                  href={"tel:+17806071212"}
                  target={"_blank"}
                  className={"hover:text-yellow-300"}
                >
                  {"+1 (780) 607-1212"}
                </a>
              </li>
              {"\n                    "}
              <li>
                <span className={"font-semibold"}>{"Address:"}</span>{" "}
                <a
                  href={"https://g.co/kgs/3Uapx8s"}
                  target={"_blank"}
                  className={"hover:text-yellow-300"}
                >
                  {
                    "St. Theresa's Catholic Church, 7508 29 Ave NW,\n                            Edmonton, AB T6K 3Y8."
                  }
                </a>
              </li>
              {"\n                "}
            </ul>
            {"\n            "}
          </div>
          {"\n\n            "}
          {"\n            "}
          <div>
            {"\n                "}
            <h3 className={"text-xl font-bold mb-6"}>{"Connect With Us"}</h3>
            {"\n                "}
            <div className={"flex space-x-4"}>
              {"\n                    "}
              <a
                href={"https://www.facebook.com/profile.php?id=61560520921267"}
                target={"_blank"}
                className={"text-yellow-500 hover:text-yellow-300"}
                aria-label={"ETCF on Facebook"}
              >
                {"\n                        "}
                <i
                  aria-hidden={"true"}
                  className={"fab fa-facebook-f text-2xl"}
                ></i>
                {"\n                    "}
              </a>
              {"\n                    "}
              <a
                href={"https://www.youtube.com/@edmontontamilcatholics"}
                target={"_blank"}
                className={"text-yellow-500 hover:text-yellow-300"}
                aria-label={"ETCF on YouTube"}
              >
                {"\n                        "}
                <i
                  aria-hidden={"true"}
                  className={"fab fa-youtube text-2xl"}
                ></i>
                {"\n                    "}
              </a>
              {"\n                    "}
              <a
                href={"#"}
                onClick={(event) => {
                  event.preventDefault();
                  window.socialAlert?.();
                }}
                target={"_blank"}
                className={"text-yellow-500 hover:text-yellow-300"}
                aria-label={"ETCF on LinkedIn"}
              >
                {"\n                        "}
                <i
                  aria-hidden={"true"}
                  className={"fab fa-linkedin-in text-2xl"}
                ></i>
                {"\n                    "}
              </a>
              {"\n                "}
            </div>
            {"\n            "}
          </div>
          {"\n\n            "}
          {"\n            "}
          <div>
            {"\n                "}
            <h3 className={"text-xl font-bold mb-6"}>{"Resources"}</h3>
            {"\n                "}
            <ul className={"space-y-4"}>
              {"\n                    "}
              <li>
                <a
                  href={"https://www.arulvakku.com/"}
                  target={"_blank"}
                  className={"hover:text-yellow-300"}
                >
                  {"Arulvakku"}
                </a>
                {"\n                    "}
              </li>
              {"\n                    "}
              <li>
                <a
                  href={"#"}
                  onClick={(event) => {
                    event.preventDefault();
                    window.donationAlert?.();
                  }}
                  className={"hover:text-yellow-300"}
                >
                  {"Donate Now"}
                </a>
              </li>
              {"\n                    "}
              <li>
                <a
                  href={"#"}
                  onClick={(event) => {
                    event.preventDefault();
                    window.volunteerAlert?.();
                  }}
                  className={"hover:text-yellow-300"}
                >
                  {"Volunteer"}
                </a>
              </li>
              {"\n                "}
            </ul>
            {"\n            "}
          </div>
          {"\n        "}
        </div>
        {"\n\n        "}
        {"\n        "}
        <div className={"bg-gray-900 py-4 mt-8"}>
          {"\n            "}
          <div
            className={
              "container mx-auto px-6 flex flex-col md:flex-row justify-between items-center"
            }
          >
            {"\n                "}
            {"\n                "}
            <div className={"flex space-x-4 mb-4 md:mb-0"}>
              {"\n                    "}
              <a
                href={"privacy-policy.html"}
                target={"_blank"}
                className={"hover:text-yellow-300"}
              >
                {"Privacy Policy"}
              </a>
              {"\n                    "}
              <span className={"text-gray-500"}>{"|"}</span>
              {"\n                    "}
              <a href={"terms.html"} className={"hover:text-yellow-300"}>
                {"Terms and\n                        Conditions"}
              </a>
              {"\n                "}
            </div>
            {"\n\n                "}
            {"\n                "}
            <p className={"text-sm"}>
              {"\n                    ©\n                    "}
              <CopyrightYear />
              {
                " Edmonton Tamil Catholic Family. All\n                    rights\n                    reserved.\n                "
              }
            </p>
            {"\n            "}
          </div>
          {"\n        "}
        </div>
        {"\n\n    "}
      </footer>{" "}
    </>
  );
}

export function GalleryFooter() {
  return (
    <>
      {" "}
      <footer className={"text-white pt-12 fade-in w-full"}>
        {"\n        "}
        <div
          className={
            "container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12"
          }
        >
          {"\n            "}
          <div>
            {"\n                "}
            <h3 className={"text-xl font-bold mb-6"}>{"Quick Links"}</h3>
            {"\n                "}
            <ul className={"space-y-4"}>
              {"\n                    "}
              <li>
                <a
                  href={"index.html#about"}
                  className={"hover:text-yellow-300"}
                >
                  {"About Us"}
                </a>
              </li>
              {"\n                    "}
              <li>
                <a
                  href={"index.html#event-section"}
                  className={"hover:text-yellow-300"}
                >
                  {"Events"}
                </a>
              </li>
              {"\n                    "}
              <li>
                <a href={"gallery.html"} className={"hover:text-yellow-300"}>
                  {"Gallery"}
                </a>
              </li>
              {"\n                    "}
              <li>
                <a
                  href={"index.html#newsletter-form"}
                  className={"hover:text-yellow-300"}
                >
                  {"Newsletter"}
                </a>
              </li>
              {"\n                "}
            </ul>
            {"\n            "}
          </div>
          {"\n            "}
          <div>
            {"\n                "}
            <h3 className={"text-xl font-bold mb-6"}>
              {"Contact Information"}
            </h3>
            {"\n                "}
            <ul className={"space-y-4"}>
              {"\n                    "}
              <li>
                <span className={"font-semibold"}>{"Email:"}</span>{" "}
                <a
                  href={"mailto:info@edmontontamilcatholics.ca"}
                  className={"hover:text-yellow-300"}
                >
                  {"info@edmontontamilcatholics.ca"}
                </a>
              </li>
              {"\n                    "}
              <li>
                <span className={"font-semibold"}>{"Phone:"}</span>{" "}
                <a
                  href={"tel:+17806071212"}
                  className={"hover:text-yellow-300"}
                >
                  {"+1 (780) 607-1212"}
                </a>
              </li>
              {"\n                    "}
              <li>
                <span className={"font-semibold"}>{"Address:"}</span>{" "}
                <a
                  href={"https://g.co/kgs/3Uapx8s"}
                  target={"_blank"}
                  rel={"noopener noreferrer"}
                  className={"hover:text-yellow-300"}
                >
                  {
                    "St. Theresa's Catholic Church, 7508\n                            29 Ave NW, Edmonton, AB T6K 3Y8."
                  }
                </a>
              </li>
              {"\n                "}
            </ul>
            {"\n            "}
          </div>
          {"\n            "}
          <div>
            {"\n                "}
            <h3 className={"text-xl font-bold mb-6"}>{"Connect With Us"}</h3>
            {"\n                "}
            <div className={"flex space-x-4"}>
              {"\n                    "}
              <a
                href={"https://www.facebook.com/profile.php?id=61560520921267"}
                target={"_blank"}
                rel={"noopener noreferrer"}
                className={"text-yellow-500 hover:text-yellow-300"}
                aria-label={"ETCF Facebook"}
              >
                <i
                  className={"fab fa-facebook-f text-2xl"}
                  aria-hidden={"true"}
                ></i>
              </a>
              {"\n                    "}
              <a
                href={"https://www.youtube.com/@edmontontamilcatholics"}
                target={"_blank"}
                rel={"noopener noreferrer"}
                className={"text-yellow-500 hover:text-yellow-300"}
                aria-label={"ETCF YouTube"}
              >
                <i
                  className={"fab fa-youtube text-2xl"}
                  aria-hidden={"true"}
                ></i>
              </a>
              {"\n                    "}
              <a
                href={"#"}
                onClick={(event) => {
                  event.preventDefault();
                  window.socialAlert?.();
                }}
                className={"text-yellow-500 hover:text-yellow-300"}
                aria-label={"ETCF LinkedIn"}
              >
                <i
                  className={"fab fa-linkedin-in text-2xl"}
                  aria-hidden={"true"}
                ></i>
              </a>
              {"\n                "}
            </div>
            {"\n            "}
          </div>
          {"\n            "}
          <div>
            {"\n                "}
            <h3 className={"text-xl font-bold mb-6"}>{"Resources"}</h3>
            {"\n                "}
            <ul className={"space-y-4"}>
              {"\n                    "}
              <li>
                <a
                  href={"https://www.arulvakku.com/"}
                  target={"_blank"}
                  rel={"noopener noreferrer"}
                  className={"hover:text-yellow-300"}
                >
                  {"Arulvakku"}
                </a>
              </li>
              {"\n                    "}
              <li>
                <a
                  href={"#"}
                  onClick={(event) => {
                    event.preventDefault();
                    window.donationAlert?.();
                  }}
                  className={"hover:text-yellow-300"}
                >
                  {"Donate Now"}
                </a>
              </li>
              {"\n                    "}
              <li>
                <a
                  href={"#"}
                  onClick={(event) => {
                    event.preventDefault();
                    window.volunteerAlert?.();
                  }}
                  className={"hover:text-yellow-300"}
                >
                  {"Volunteer"}
                </a>
              </li>
              {"\n                "}
            </ul>
            {"\n            "}
          </div>
          {"\n        "}
        </div>
        {"\n        "}
        <div className={"bg-gray-900 py-4 mt-8"}>
          {"\n            "}
          <div
            className={
              "container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4"
            }
          >
            {"\n                "}
            <div className={"flex space-x-4"}>
              {"\n                    "}
              <a
                href={"privacy-policy.html"}
                className={"hover:text-yellow-300"}
              >
                {"Privacy Policy"}
              </a>
              {"\n                    "}
              <span className={"text-gray-500"}>{"|"}</span>
              {"\n                    "}
              <a href={"terms.html"} className={"hover:text-yellow-300"}>
                {"Terms and Conditions"}
              </a>
              {"\n                "}
            </div>
            {"\n                "}
            <p className={"text-sm"}>
              {"©\n                    "}
              <CopyrightYear />
              {
                " Edmonton Tamil Catholic Family. All\n                    rights reserved.\n                "
              }
            </p>
            {"\n            "}
          </div>
          {"\n        "}
        </div>
        {"\n    "}
      </footer>{" "}
    </>
  );
}

export function KidsResourcesFooter() {
  return (
    <>
      {" "}
      <footer className={"text-white pt-12 fade-in w-full"}>
        {"\n        "}
        <div
          className={
            "container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12"
          }
        >
          {"\n            "}
          <div>
            {"\n                "}
            <h3 className={"text-xl font-bold mb-6"}>{"Quick Links"}</h3>
            {"\n                "}
            <ul className={"space-y-4"}>
              {"\n                    "}
              <li>
                <a
                  href={"index.html#about"}
                  className={"hover:text-yellow-300"}
                >
                  {"About Us"}
                </a>
              </li>
              {"\n                    "}
              <li>
                <a
                  href={"index.html#event-section"}
                  className={"hover:text-yellow-300"}
                >
                  {"Events"}
                </a>
              </li>
              {"\n                    "}
              <li>
                <a href={"gallery.html"} className={"hover:text-yellow-300"}>
                  {"Gallery"}
                </a>
              </li>
              {"\n                    "}
              <li>
                <a
                  href={"index.html#newsletter-form"}
                  className={"hover:text-yellow-300"}
                >
                  {"Newsletter"}
                </a>
              </li>
              {"\n                "}
            </ul>
            {"\n            "}
          </div>
          {"\n            "}
          <div>
            {"\n                "}
            <h3 className={"text-xl font-bold mb-6"}>
              {"Contact Information"}
            </h3>
            {"\n                "}
            <ul className={"space-y-4"}>
              {"\n                    "}
              <li>
                <span className={"font-semibold"}>{"Email:"}</span>{" "}
                <a
                  href={"mailto:info@edmontontamilcatholics.ca"}
                  className={"hover:text-yellow-300"}
                >
                  {"info@edmontontamilcatholics.ca"}
                </a>
              </li>
              {"\n                    "}
              <li>
                <span className={"font-semibold"}>{"Phone:"}</span>{" "}
                <a
                  href={"tel:+17806071212"}
                  className={"hover:text-yellow-300"}
                >
                  {"+1 (780) 607-1212"}
                </a>
              </li>
              {"\n                    "}
              <li>
                <span className={"font-semibold"}>{"Address:"}</span>{" "}
                <a
                  href={"https://g.co/kgs/3Uapx8s"}
                  target={"_blank"}
                  rel={"noopener noreferrer"}
                  className={"hover:text-yellow-300"}
                >
                  {
                    "St. Theresa's Catholic Church, 7508\n                            29 Ave NW, Edmonton, AB T6K 3Y8."
                  }
                </a>
              </li>
              {"\n                "}
            </ul>
            {"\n            "}
          </div>
          {"\n            "}
          <div>
            {"\n                "}
            <h3 className={"text-xl font-bold mb-6"}>{"Connect With Us"}</h3>
            {"\n                "}
            <div className={"flex space-x-4"}>
              {"\n                    "}
              <a
                href={"https://www.facebook.com/profile.php?id=61560520921267"}
                target={"_blank"}
                rel={"noopener noreferrer"}
                className={"text-yellow-500 hover:text-yellow-300"}
                aria-label={"ETCF Facebook"}
              >
                <i
                  className={"fab fa-facebook-f text-2xl"}
                  aria-hidden={"true"}
                ></i>
              </a>
              {"\n                    "}
              <a
                href={"https://www.youtube.com/@edmontontamilcatholics"}
                target={"_blank"}
                rel={"noopener noreferrer"}
                className={"text-yellow-500 hover:text-yellow-300"}
                aria-label={"ETCF YouTube"}
              >
                <i
                  className={"fab fa-youtube text-2xl"}
                  aria-hidden={"true"}
                ></i>
              </a>
              {"\n                    "}
              <a
                href={"#"}
                onClick={(event) => {
                  event.preventDefault();
                  window.socialAlert?.();
                }}
                className={"text-yellow-500 hover:text-yellow-300"}
                aria-label={"ETCF LinkedIn"}
              >
                <i
                  className={"fab fa-linkedin-in text-2xl"}
                  aria-hidden={"true"}
                ></i>
              </a>
              {"\n                "}
            </div>
            {"\n            "}
          </div>
          {"\n            "}
          <div>
            {"\n                "}
            <h3 className={"text-xl font-bold mb-6"}>{"Resources"}</h3>
            {"\n                "}
            <ul className={"space-y-4"}>
              {"\n                    "}
              <li>
                <a
                  href={"https://www.arulvakku.com/"}
                  target={"_blank"}
                  rel={"noopener noreferrer"}
                  className={"hover:text-yellow-300"}
                >
                  {"Arulvakku"}
                </a>
              </li>
              {"\n                    "}
              <li>
                <a
                  href={"#"}
                  onClick={(event) => {
                    event.preventDefault();
                    window.donationAlert?.();
                  }}
                  className={"hover:text-yellow-300"}
                >
                  {"Donate Now"}
                </a>
              </li>
              {"\n                    "}
              <li>
                <a
                  href={"#"}
                  onClick={(event) => {
                    event.preventDefault();
                    window.volunteerAlert?.();
                  }}
                  className={"hover:text-yellow-300"}
                >
                  {"Volunteer"}
                </a>
              </li>
              {"\n                "}
            </ul>
            {"\n            "}
          </div>
          {"\n        "}
        </div>
        {"\n        "}
        <div className={"bg-gray-900 py-4 mt-8"}>
          {"\n            "}
          <div
            className={
              "container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4"
            }
          >
            {"\n                "}
            <div className={"flex space-x-4"}>
              {"\n                    "}
              <a
                href={"privacy-policy.html"}
                className={"hover:text-yellow-300"}
              >
                {"Privacy Policy"}
              </a>
              {"\n                    "}
              <span className={"text-gray-500"}>{"|"}</span>
              {"\n                    "}
              <a href={"terms.html"} className={"hover:text-yellow-300"}>
                {"Terms and Conditions"}
              </a>
              {"\n                "}
            </div>
            {"\n                "}
            <p className={"text-sm"}>
              {"©\n                    "}
              <CopyrightYear />
              {
                " Edmonton Tamil Catholic Family. All\n                    rights reserved.\n                "
              }
            </p>
            {"\n            "}
          </div>
          {"\n        "}
        </div>
        {"\n    "}
      </footer>{" "}
    </>
  );
}

export function PrivacyPolicyFooter() {
  return (
    <>
      {" "}
      <footer className={"bg-gray-800 text-white pt-12 fade-in w-full"}>
        {"\n        "}
        <div
          className={
            "container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12"
          }
        >
          {"\n\n            "}
          {"\n            "}
          <div>
            {"\n                "}
            <h3 className={"text-xl font-bold mb-6"}>{"Quick Links"}</h3>
            {"\n                "}
            <ul className={"space-y-4"}>
              {"\n                    "}
              <li>
                <a
                  href={"index.html#about"}
                  className={"hover:text-yellow-300"}
                >
                  {"About Us"}
                </a>
              </li>
              {"\n                    "}
              <li>
                <a
                  href={"index.html#event-section"}
                  className={"hover:text-yellow-300"}
                >
                  {"Events"}
                </a>
              </li>
              {"\n                    "}
              <li>
                <a href={"gallery.html"} className={"hover:text-yellow-300"}>
                  {"Gallery"}
                </a>
              </li>
              {"\n                    "}
              <li>
                <a
                  href={"index.html#newsletter-form"}
                  className={"hover:text-yellow-300"}
                >
                  {"Newsletter"}
                </a>
              </li>
              {"\n                "}
            </ul>
            {"\n            "}
          </div>
          {"\n\n            "}
          {"\n            "}
          <div>
            {"\n                "}
            <h3 className={"text-xl font-bold mb-6"}>
              {"Contact Information"}
            </h3>
            {"\n                "}
            <ul className={"space-y-4"}>
              {"\n                    "}
              <li>
                <span className={"font-semibold"}>{"Email:"}</span>{" "}
                <a
                  href={"mailto:info@edmontontamilcatholics.ca"}
                  target={"_blank"}
                  className={"hover:text-yellow-300"}
                >
                  {"info@edmontontamilcatholics.ca"}
                </a>
              </li>
              {"\n                    "}
              <li>
                <span className={"font-semibold"}>{"Phone:"}</span>{" "}
                <a
                  href={"tel:+17806071212"}
                  target={"_blank"}
                  className={"hover:text-yellow-300"}
                >
                  {"+1 (780) 607-1212"}
                </a>
              </li>
              {"\n                    "}
              <li>
                <span className={"font-semibold"}>{"Address:"}</span>{" "}
                <a
                  href={"https://g.co/kgs/3Uapx8s"}
                  target={"_blank"}
                  className={"hover:text-yellow-300"}
                >
                  {
                    "St. Theresa's Catholic Church, 7508 29 Ave NW,\n                            Edmonton, AB T6K 3Y8."
                  }
                </a>
              </li>
              {"\n                "}
            </ul>
            {"\n            "}
          </div>
          {"\n\n            "}
          {"\n            "}
          <div>
            {"\n                "}
            <h3 className={"text-xl font-bold mb-6"}>{"Connect With Us"}</h3>
            {"\n                "}
            <div className={"flex space-x-4"}>
              {"\n                    "}
              <a
                href={"https://www.facebook.com/profile.php?id=61560520921267"}
                target={"_blank"}
                className={"text-yellow-500 hover:text-yellow-300"}
                aria-label={"ETCF on Facebook"}
              >
                {"\n                        "}
                <i
                  aria-hidden={"true"}
                  className={"fab fa-facebook-f text-2xl"}
                ></i>
                {"\n                    "}
              </a>
              {"\n                    "}
              <a
                href={"https://www.youtube.com/@edmontontamilcatholics"}
                target={"_blank"}
                className={"text-yellow-500 hover:text-yellow-300"}
                aria-label={"ETCF on YouTube"}
              >
                {"\n                        "}
                <i
                  aria-hidden={"true"}
                  className={"fab fa-youtube text-2xl"}
                ></i>
                {"\n                    "}
              </a>
              {"\n                    "}
              <a
                href={"#"}
                onClick={(event) => {
                  event.preventDefault();
                  window.socialAlert?.();
                }}
                className={"text-yellow-500 hover:text-yellow-300"}
                aria-label={"ETCF on LinkedIn"}
              >
                {"\n                        "}
                <i
                  aria-hidden={"true"}
                  className={"fab fa-linkedin-in text-2xl"}
                ></i>
                {"\n                    "}
              </a>
              {"\n                "}
            </div>
            {"\n            "}
          </div>
          {"\n\n            "}
          {"\n            "}
          <div>
            {"\n                "}
            <h3 className={"text-xl font-bold mb-6"}>{"Resources"}</h3>
            {"\n                "}
            <ul className={"space-y-4"}>
              {"\n                    "}
              <li>
                <a
                  href={"https://www.arulvakku.com/"}
                  target={"_blank"}
                  className={"hover:text-yellow-300"}
                >
                  {"Arulvakku"}
                </a>
                {"\n                    "}
              </li>
              {"\n                    "}
              <li>
                <a
                  href={"#"}
                  onClick={(event) => {
                    event.preventDefault();
                    window.donationAlert?.();
                  }}
                  className={"hover:text-yellow-300"}
                >
                  {"Donate Now"}
                </a>
              </li>
              {"\n                    "}
              <li>
                <a
                  href={"#"}
                  onClick={(event) => {
                    event.preventDefault();
                    window.volunteerAlert?.();
                  }}
                  className={"hover:text-yellow-300"}
                >
                  {"Volunteer"}
                </a>
              </li>
              {"\n                "}
            </ul>
            {"\n            "}
          </div>
          {"\n        "}
        </div>
        {"\n\n        "}
        {"\n        "}
        <div className={"bg-gray-900 py-4 mt-8"}>
          {"\n            "}
          <div
            className={
              "container mx-auto px-6 flex flex-col md:flex-row justify-between items-center"
            }
          >
            {"\n                "}
            {"\n                "}
            <div className={"flex space-x-4 mb-4 md:mb-0"}>
              {"\n                    "}
              <a
                href={"privacy-policy.html"}
                className={"hover:text-yellow-300"}
              >
                {"Privacy Policy"}
              </a>
              {"\n                    "}
              <span className={"text-gray-500"}>{"|"}</span>
              {"\n                    "}
              <a href={"terms.html"} className={"hover:text-yellow-300"}>
                {"Terms and Conditions"}
              </a>
              {"\n                "}
            </div>
            {"\n\n                "}
            {"\n                "}
            <p className={"text-sm"}>
              {"\n                    ©\n                    "}
              <CopyrightYear />{" "}
              <a
                href={"https://edmontontamilcatholics.ca/"}
                target={"_blank"}
                className={"hover:text-yellow-300"}
              >
                {"Edmonton\n                        Tamil Catholic Family"}
              </a>
              {
                ".\n                    All\n                    rights\n                    reserved.\n                "
              }
            </p>
            {"\n            "}
          </div>
          {"\n        "}
        </div>
        {"\n\n    "}
      </footer>{" "}
    </>
  );
}

export function TermsFooter() {
  return (
    <>
      {" "}
      <footer className={"bg-gray-800 text-white pt-12 fade-in w-full"}>
        {"\n        "}
        <div
          className={
            "container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12"
          }
        >
          {"\n\n            "}
          {"\n            "}
          <div>
            {"\n                "}
            <h3 className={"text-xl font-bold mb-6"}>{"Quick Links"}</h3>
            {"\n                "}
            <ul className={"space-y-4"}>
              {"\n                    "}
              <li>
                <a
                  href={"index.html#about"}
                  className={"hover:text-yellow-300"}
                >
                  {"About Us"}
                </a>
              </li>
              {"\n                    "}
              <li>
                <a
                  href={"index.html#event-section"}
                  className={"hover:text-yellow-300"}
                >
                  {"Events"}
                </a>
              </li>
              {"\n                    "}
              <li>
                <a href={"gallery.html"} className={"hover:text-yellow-300"}>
                  {"Gallery"}
                </a>
              </li>
              {"\n                    "}
              <li>
                <a
                  href={"index.html#newsletter-form"}
                  className={"hover:text-yellow-300"}
                >
                  {"Newsletter"}
                </a>
              </li>
              {"\n                "}
            </ul>
            {"\n            "}
          </div>
          {"\n\n            "}
          {"\n            "}
          <div>
            {"\n                "}
            <h3 className={"text-xl font-bold mb-6"}>
              {"Contact Information"}
            </h3>
            {"\n                "}
            <ul className={"space-y-4"}>
              {"\n                    "}
              <li>
                <span className={"font-semibold"}>{"Email:"}</span>{" "}
                <a
                  href={"mailto:info@edmontontamilcatholics.ca"}
                  target={"_blank"}
                  className={"hover:text-yellow-300"}
                >
                  {"info@edmontontamilcatholics.ca"}
                </a>
              </li>
              {"\n                    "}
              <li>
                <span className={"font-semibold"}>{"Phone:"}</span>{" "}
                <a
                  href={"tel:+17806071212"}
                  target={"_blank"}
                  className={"hover:text-yellow-300"}
                >
                  {"+1 (780) 607-1212"}
                </a>
              </li>
              {"\n                    "}
              <li>
                <span className={"font-semibold"}>{"Address:"}</span>{" "}
                <a
                  href={"https://g.co/kgs/3Uapx8s"}
                  target={"_blank"}
                  className={"hover:text-yellow-300"}
                >
                  {
                    "St. Theresa's Catholic Church, 7508 29 Ave NW,\n                            Edmonton, AB T6K 3Y8."
                  }
                </a>
              </li>
              {"\n                "}
            </ul>
            {"\n            "}
          </div>
          {"\n\n            "}
          {"\n            "}
          <div>
            {"\n                "}
            <h3 className={"text-xl font-bold mb-6"}>{"Connect With Us"}</h3>
            {"\n                "}
            <div className={"flex space-x-4"}>
              {"\n                    "}
              <a
                href={"#"}
                onClick={(event) => {
                  event.preventDefault();
                  window.socialAlert?.();
                }}
                className={"text-yellow-500 hover:text-yellow-300"}
                aria-label={"ETCF on Facebook"}
              >
                {"\n                        "}
                <i
                  aria-hidden={"true"}
                  className={"fab fa-facebook-f text-2xl"}
                ></i>
                {"\n                    "}
              </a>
              {"\n                    "}
              <a
                href={"#"}
                onClick={(event) => {
                  event.preventDefault();
                  window.socialAlert?.();
                }}
                className={"text-yellow-500 hover:text-yellow-300"}
                aria-label={"ETCF on YouTube"}
              >
                {"\n                        "}
                <i
                  aria-hidden={"true"}
                  className={"fab fa-youtube text-2xl"}
                ></i>
                {"\n                    "}
              </a>
              {"\n                    "}
              <a
                href={"#"}
                onClick={(event) => {
                  event.preventDefault();
                  window.socialAlert?.();
                }}
                className={"text-yellow-500 hover:text-yellow-300"}
                aria-label={"ETCF on LinkedIn"}
              >
                {"\n                        "}
                <i
                  aria-hidden={"true"}
                  className={"fab fa-linkedin-in text-2xl"}
                ></i>
                {"\n                    "}
              </a>
              {"\n                "}
            </div>
            {"\n            "}
          </div>
          {"\n\n            "}
          {"\n            "}
          <div>
            {"\n                "}
            <h3 className={"text-xl font-bold mb-6"}>{"Resources"}</h3>
            {"\n                "}
            <ul className={"space-y-4"}>
              {"\n                    "}
              <li>
                <a
                  href={"https://www.arulvakku.com/"}
                  target={"_blank"}
                  className={"hover:text-yellow-300"}
                >
                  {"Arulvakku"}
                </a>
                {"\n                    "}
              </li>
              {"\n                    "}
              <li>
                <a
                  href={"#"}
                  onClick={(event) => {
                    event.preventDefault();
                    window.donationAlert?.();
                  }}
                  className={"hover:text-yellow-300"}
                >
                  {"Donate Now"}
                </a>
              </li>
              {"\n                    "}
              <li>
                <a
                  href={"#"}
                  onClick={(event) => {
                    event.preventDefault();
                    window.volunteerAlert?.();
                  }}
                  className={"hover:text-yellow-300"}
                >
                  {"Volunteer"}
                </a>
              </li>
              {"\n                "}
            </ul>
            {"\n            "}
          </div>
          {"\n        "}
        </div>
        {"\n\n        "}
        {"\n        "}
        <div className={"bg-gray-900 py-4 mt-8"}>
          {"\n            "}
          <div
            className={
              "container mx-auto px-6 flex flex-col md:flex-row justify-between items-center"
            }
          >
            {"\n                "}
            {"\n                "}
            <div className={"flex space-x-4 mb-4 md:mb-0"}>
              {"\n                    "}
              <a
                href={"privacy-policy.html"}
                className={"hover:text-yellow-300"}
              >
                {"Privacy Policy"}
              </a>
              {"\n                    "}
              <span className={"text-gray-500"}>{"|"}</span>
              {"\n                    "}
              <a href={"terms.html"} className={"hover:text-yellow-300"}>
                {"Terms and Conditions"}
              </a>
              {"\n                "}
            </div>
            {"\n\n                "}
            {"\n                "}
            <p className={"text-sm"}>
              {"\n                    ©\n                    "}
              <CopyrightYear />{" "}
              <a
                href={"https://edmontontamilcatholics.ca/"}
                target={"_blank"}
                className={"hover:text-yellow-300"}
              >
                {"Edmonton\n                        Tamil Catholic Family"}
              </a>
              {
                ".\n                    All\n                    rights\n                    reserved.\n                "
              }
            </p>
            {"\n            "}
          </div>
          {"\n        "}
        </div>
        {"\n\n    "}
      </footer>{" "}
    </>
  );
}
