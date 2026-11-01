import Document, { Html, Head, Main, NextScript } from "next/document";
import metadata from "../data/page-meta.json";

export default class SiteDocument extends Document {
  render() {
    const page = this.props.__NEXT_DATA__.props.pageProps.page;
    const data = metadata[page] || { bodyClass: "inner-page", htmlClass: "" };
    return (
      <Html lang="en" className={data.htmlClass || undefined}>
        <Head />
        <body className={data.bodyClass}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
