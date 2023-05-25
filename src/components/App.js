import '../App.css'
import { Container } from "react-bootstrap";
import Signup from "./Signup";
import Dashboard from './Dashboard'
import Login from './Login'
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from './AdminDashboard';



function App() {
  return (
    <AuthProvider>
      <Container className="d-flex align-items-center justify-content-center"
          style={{minHeight: "100vh"}}
        >

        <div className="w-100">
          
        <Router>
            <Routes>
                {/* <Route path="/" element={<Dashboard /> } /> */}
                <Route path="/" element={<Login />}  />

                <Route path="/signup" element= { <Signup /> } />

                {/* <Route path="/login" element={<Login />} /> */}
                <Route path='/form' element={<Dashboard />} />

                <Route path='/adminDash' element={ <AdminDashboard /> }/>
            </Routes>
          
        </Router>
        </div>
      </Container>
      </AuthProvider>
  )
}

export default App;
