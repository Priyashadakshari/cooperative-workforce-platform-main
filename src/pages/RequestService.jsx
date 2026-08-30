import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

export default function RequestService() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) {
      setError("Please describe what service you need.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await api.post("/requests", {
        rawText: text,
        customerId: "demo-customer-id",
      });

      console.log("Backend response:", response.data);

      navigate("/workers", {
        state: {
          request: response.data,
        },
      });
    } catch (err) {
      console.error(err);

      setError(
        "Unable to connect to the backend. Make sure the backend server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h1>What do you need help with?</h1>

        <p>
          Describe your problem in simple language.
        </p>

        <form onSubmit={handleSubmit}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Example: My washing machine is not working, I need someone tomorrow evening."
            rows="6"
          />

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Finding Workers..." : "Find Workers"}
          </button>
        </form>
      </div>
    </div>
  );
}