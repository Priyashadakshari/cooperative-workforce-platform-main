import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="page">
      <div className="hero">
        <h1>Cooperative Workforce</h1>

        <p>
          Find trusted workers for your service needs.
        </p>

        <Link to="/request">
          <button>Request a Service</button>
        </Link>
      </div>
    </div>
  );
}