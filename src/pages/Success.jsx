import { useLocation, Link } from "react-router-dom";

export default function Success() {
  const location = useLocation();

  const worker = location.state?.worker;

  return (
    <div className="page">
      <div className="card success">
        <h1>Booking Confirmed!</h1>

        <p>
          Your service request has been successfully submitted.
        </p>

        {worker && (
          <p>
            Worker:{" "}
            <strong>
              {worker.name || "Selected Worker"}
            </strong>
          </p>
        )}

        <Link to="/">
          <button>Back to Home</button>
        </Link>
      </div>
    </div>
  );
}
