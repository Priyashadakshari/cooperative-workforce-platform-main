import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../api";

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();

  const worker = location.state?.worker;
  const request = location.state?.request;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!worker) {
    return (
      <div className="page">
        <div className="card">
          <h2>No worker selected.</h2>

          <button onClick={() => navigate("/request")}>
            Create Request
          </button>
        </div>
      </div>
    );
  }

  const confirmBooking = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/bookings", {
        requestId:
          request?._id ||
          request?.id ||
          request?.requestId,

        workerId: worker._id,

        status: "pending",

        payment: {
          status: "pending",
        },
      });

      console.log("Booking:", response.data);

      navigate("/success", {
        state: {
          worker,
          booking: response.data,
        },
      });
    } catch (err) {
      console.error(err);

      setError(
        "Booking API is not available yet. Ask Member 6 to implement /api/bookings."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h1>Confirm Booking</h1>

        <h2>
          {worker.name || "Selected Worker"}
        </h2>

        <p>
          <strong>Rating:</strong>{" "}
          {worker.rating || "New"}
        </p>

        <p>
          <strong>Jobs Completed:</strong>{" "}
          {worker.jobsCompleted || 0}
        </p>

        <h3>Skills</h3>

        <ul>
          {worker.skills?.map((skill, index) => (
            <li key={index}>
              {skill.name}
            </li>
          ))}
        </ul>

        {error && (
          <p className="error">
            {error}
          </p>
        )}

        <button
          onClick={confirmBooking}
          disabled={loading}
        >
          {loading
            ? "Booking..."
            : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
}
