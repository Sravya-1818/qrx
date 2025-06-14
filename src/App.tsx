import { BrowserRouter, Routes, Route } from "react-router-dom";
import QRGenerator from "./pages/QRGenerator";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QRGenerator />} />
        <Route path="/user/:id" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

