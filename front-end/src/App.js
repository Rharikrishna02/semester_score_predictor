import {BrowserRouter as Router,Routes, Route } from "react-router-dom";
import './App.css';
import Register,{RegisterRouter} from "./components/Register";
import Login from "./components/Login";
import Otp from "./components/Otp";
import Home,{ResultRouter} from "./components/Home";
import Result from "./components/Result";
import Chatbot from "./components/Chatbot";

function App() {
  return (
    <>
        {
        <Router>
          <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/register" element={<RegisterRouter />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/home" element={<ResultRouter />} />
          <Route path="/result" element={<Result />} />
          <Route path="/chatbot" element={<Chatbot />} />
          </Routes>
        </Router>
        }
      </>
  );
}

export default App;
