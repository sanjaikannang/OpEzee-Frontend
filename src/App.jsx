import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import Settings from "./Settings";
import Configuration from "./Configuration";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/configuration/:id" element={<Configuration />} />
      </Routes>
    </>
  );
}

export default App;
