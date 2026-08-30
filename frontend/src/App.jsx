import WorkerRegister from './pages/WorkerRegister';
import WorkerDashboard from './pages/WorkerDashboard';

function App() {
  return (
    <>
      <WorkerRegister />
      <WorkerDashboard workerId={1} />
    </>
  );
}

export default App;