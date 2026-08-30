import { useState } from 'react';
import { api } from '../api';

export default function WorkerDashboard({ workerId }) {
  const [available, setAvailable] = useState(true);

  const toggleAvailability = async () => {
    setAvailable(!available);

    await api.patch(`/workers/${workerId}`, {
      availability: !available
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>My Dashboard</h2>

      <button onClick={toggleAvailability}>
        {available ? 'Go Unavailable' : 'Go Available'}
      </button>
    </div>
  );
}