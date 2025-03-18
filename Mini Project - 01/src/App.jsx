import { Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Forgot from "./Forgot";
import Add from "./Add";
import AddIncome from "./AddIncome";
import Profile from "./Profile";
import AccountInfo from "./AccountInfo";
import PrivacyPolicy from "./PrivacyPolicy";
import SecurityCode from "./SecurityCode";
import Logout from "./Logout";
import Help from "./Help";



function App() {
  return (
  
      <Routes>
       
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/add" element={<Add />} />
        <Route path="/income" element={<AddIncome />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/account-info" element={<AccountInfo />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/security-code" element={<SecurityCode />} />
        <Route path="/help" element={<Help/>}/>
        <Route path="/logout" element={<Logout />} />
       
      </Routes>

  );
}

export default App;
