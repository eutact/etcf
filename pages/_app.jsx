import "../src/output.css";
import "../src/errors.css";
import "../src/community-pages.css";
import ErrorBoundary from "../components/errors/ErrorBoundary";

export default function App({ Component, pageProps, router }) {
  return (
    <ErrorBoundary key={router.asPath}>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}
