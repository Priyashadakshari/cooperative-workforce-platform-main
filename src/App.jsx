import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import Home from "./pages/Home";
import RequestService from "./pages/RequestService";
import WorkerList from "./pages/WorkerList";
import Booking from "./pages/Booking";
import Success from "./pages/Success";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      
      {/* Navigation Bar */}
      <nav className="navbar">

        <Link to="/" className="logo">
          Cooperative Workforce
        </Link>

        <div>
          <Link to="/">Home</Link>

          <Link to="/request">
            Request Service
          </Link>
        </div>

      </nav>

      {/* Pages */}
      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/request"
          element={<RequestService />}
        />

        <Route
          path="/workers"
          element={<WorkerList />}
        />

        <Route
          path="/booking"
          element={<Booking />}
        />

        <Route
          path="/success"
          element={<Success />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;