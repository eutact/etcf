import "../src/output.css";
import "../src/errors.css";
import "../src/community-pages.css";
import "../src/custom-cursor.css";
import ErrorBoundary from "../components/errors/ErrorBoundary";
import CustomCursor from "../components/site/CustomCursor";

export default function App({ Component, pageProps, router }) {
  return (
    <ErrorBoundary key={router.asPath}>
      <CustomCursor />
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}
