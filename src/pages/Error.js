import { Link, useRouteError } from "react-router-dom";

export function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className="flex flex-col items-center justify-center h-screen"
    >
      <h1 className="text-xl ">Oops!</h1>
      <p>An unexpected error has occurred :(</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link className="mt-4 underline hover:font-semibold" to="/">
        Back to the home page
      </Link>
    </div>
  );
}
