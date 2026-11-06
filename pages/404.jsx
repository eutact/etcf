import Head from "next/head";
import ErrorPage from "next/error";

export default function NotFound() {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, follow" />
      </Head>
      <ErrorPage statusCode={404} />
    </>
  );
}
