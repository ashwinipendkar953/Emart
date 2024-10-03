import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="text-center ">
        <h1 className="display-2 fw-bold">404</h1>
        <p>
          The page you are looking for does not exist. But you can click the
          button below to go back to the homepage.
        </p>
        <Link className="btn btn-pink px-3 rounded-0" to="/">
          Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
