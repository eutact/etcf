import ErrorPage from "../components/errors/ErrorPage";

export default function SiteError({ statusCode }) {
  return <ErrorPage code={statusCode || "client-error"} />;
}

SiteError.getInitialProps = ({ res, err }) => ({
  statusCode: res ? res.statusCode : err ? err.statusCode || 500 : 404,
});
