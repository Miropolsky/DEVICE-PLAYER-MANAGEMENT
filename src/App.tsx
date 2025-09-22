import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import DeviceList from "./components/DeviceList";
import PlayerList from "./components/PlayerList";
import { TOAST_CONFIG } from "./constants";

function App() {
  return (
    <div className="App">
      <header className="bg-primary text-white py-3 mb-4">
        <div className="container">
          <h1 className="mb-0">Device & Player Management</h1>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<DeviceList />} />
          <Route path="/device/:deviceId" element={<PlayerList />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <ToastContainer {...TOAST_CONFIG} />
    </div>
  );
}

export default App;
