import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QRGenerator from "@/pages/QRGenerator";
import UserProfile from "@/pages/UserProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QRGenerator />} />
        <Route path="/user/:userId" element={<UserProfile />} />
        <Route path="*" element={<div className="text-center mt-10">404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;

