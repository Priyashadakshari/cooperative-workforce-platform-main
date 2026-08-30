import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../api";

export default function WorkerList() {
  const location = useLocation();
  const navigate = useNavigate();

  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const request = location.state?.request;

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const service =
          request?.parsed?.service || "electrician";

        const response = await api.get(
          `/workers/search?skill=${service}`
        );

        setWorkers(response.data);
      } catch (err) {
        console.error(err);
        setError("Unable to load workers.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkers();
  }, [request]);

  const selectWorker = (worker) => {
    navigate("/booking", {
      state: {
        worker,
        request,
      },
    });
  };

  if (loading) {
    return (
      <div className="page">
        <h2>Finding suitable workers...</h2>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Recommended Workers</h1>

      {error && <p className="error">{error}</p>}

      {workers.length === 0 ? (
        <div className="card">
          <h3>No workers found</h3>
          <p>
            We could not find an available worker for this service.
          </p>
        </div>
      ) : (
        <div className="worker-grid">
          {workers.map((worker) => (
            <div className="worker-card" key={worker._id}>
              <h2>
                {worker.name || "Available Worker"}
              </h2>

              <p>
                <strong>Rating:</strong>{" "}
                {worker.rating || "New"}
              </p>

              <p>
                <strong>Jobs completed:</strong>{" "}
                {worker.jobsCompleted || 0}
              </p>

              <p>
                <strong>Skills:</strong>
              </p>

              <ul>
                {worker.skills?.map((skill, index) => (
                  <li key={index}>
                    {skill.name}
                  </li>
                ))}
              </ul>

              <button onClick={() => selectWorker(worker)}>
                Book Worker
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}