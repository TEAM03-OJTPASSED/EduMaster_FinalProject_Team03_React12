import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Loginpage from "./pages/Loginpage";
import SignUppage from "./pages/SignUppage";
import Homepage from "./pages/Homepage";
import GeneralLayout from "./defaultLayout/Layout";
import Adminpage from "./pages/Adminpage";
import Instructorpage from "./pages/Instructorpage";
import Studentpage from "./pages/Studentpage";
import Coursespage from "./pages/Coursespage";
import Blogpage from "./pages/Blogpage";
import Contactpage from "./pages/Contactpage";
import FAQspage from "./pages/FAQspage";
import Errorpage from "./pages/Errorpage";
import CourseDetailpage from "./pages/CourseDetailpage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GeneralLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<SignUppage />} />
          <Route path="/admin/*" element={<Adminpage />} />
          <Route path="/instructor/*" element={<Instructorpage />} />
          <Route path="/student/*" element={<Studentpage />} />
          <Route path="/course" element={<Coursespage />} />
          <Route path="/blog" element={<Blogpage />} />
          <Route path="/contact" element={<Contactpage />} />
          <Route path="/faqs" element={<FAQspage />} />
          <Route path="/error" element={<Errorpage />} />
          <Route path="/detail/:id" element={<CourseDetailpage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
