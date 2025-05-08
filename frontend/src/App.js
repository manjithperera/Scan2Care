// App.js
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router, Route, and Routes
import LoginForm from './Components/LoginForm/LoginForm'; // Import LoginForm
import SignUp from './Components/SignUp/SignUp'; // Import SignUp
import ContactUs from './Components/ContactUs/ContactUs'; // Import ContactUs
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import Predict1 from './Components/Predict1/Predict1';
import Predict2 from './Components/Predict2/Predict2';
import Predict3 from './Components/Predict3/Predict3';
import Predict4 from './Components/Predict4/Predict4';
import Doctors from './Components/Doctors/Doctors';
import DoctorInfo from './Components/DoctorInfo/DoctorInfo';
import USessions from './Components/USessions/USessions';
import DHome from './Components/DHome/DHome';
import DSessions from './Components/DSessions/DSessions';
import DBookedSessions from './Components/DBookedSessions/DBookedSessions';


function App() 
{
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Define the route for LoginForm */}
          <Route path="/" element={<LoginForm />} />
          {/* Define the route for SignUp */}
          <Route path="/signup" element={<SignUp />} />
          {/* Define the route for ContactUs */}
          <Route path="/ContactUs" element={<ContactUs />} />
          {/* Define the route for Navbar */}
          <Route path="/Navbar" element={<Navbar />} />
          {/* Define the route for Footer */}
          <Route path="/footer" element={<Footer />} />
          {/* Define the route for Home */}
          <Route path="/Home" element={<Home />} />
          {/* Define the route for Predict1 */}
          <Route path="/Predict1" element={<Predict1 />} />
          {/* Define the route for Predict2 */}
          <Route path="/Predict2" element={<Predict2 />} />
          {/* Define the route for Predict3 */}
          <Route path="/Predict3" element={<Predict3 />} />
          {/* Define the route for Predict4 */}
          <Route path="/Predict4" element={<Predict4 />} />
          {/* Define the route for Doctors */}
          <Route path="/Doctors" element={<Doctors />} />
          {/* Define the route for DoctorInfo */}
          <Route path="/DoctorInfo" element={<DoctorInfo />} />
          {/* Define the route for USessions */}
          <Route path="/USessions" element={<USessions />} />
          {/* Define the route for DHome */}
          <Route path="/DHome" element={<DHome />} />
          {/* Define the route for DSessions */}
          <Route path="/DSessions" element={<DSessions />} />
          {/* Define the route for DBookedSessions */}
          <Route path="/DBookedSessions" element={<DBookedSessions />} />
          {/* <Route path="/DoctorInfo" element={<DoctorBooking />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;