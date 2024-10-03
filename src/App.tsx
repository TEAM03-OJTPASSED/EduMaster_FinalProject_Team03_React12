import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Loginpage from "./pages/Loginpage";
import SignUppage from "./pages/Signuppage";
import Homepage from "./pages/Homepage";
import GeneralLayout from "./defaultLayout/Layout";
import Adminpage from "./pages/Adminpage";
import Instructorpage from "./pages/Instructorpage";
import Studentpage from "./pages/Studentpage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GeneralLayout />}>
          {/* Here you can specify nested routes */}
          <Route path="/" element={<Homepage />} /> {/* Default content */}
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<SignUppage />} />
          <Route path="/admin" element={<Adminpage />} />
          <Route path="/instructor" element={<Instructorpage />} />
          <Route path="/student" element={<Studentpage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
