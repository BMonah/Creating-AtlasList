import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import NavBar from './components/Navbar';
import Footer from './components/footer';

import {
    BrowserRouter as Router,
    Route,
    Routes
} from 'react-router-dom';

import HomePage from './components/Home';
import GetJobsPage from './components/getjobs';
import SignUpPage from './components/SignUp';
import LoginPage from './components/Login';
import CreateJobPage from './components/create_jobs';


// The BrowserRouter is to have our application use react router
const App = () => {
    return (
        <Router>
            <div className="container">
                <NavBar />
                <Routes>
                    <Route path="/getjobs" element={<GetJobsPage />} />
                    <Route path="/logout" element={<LoginPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/create_jobs" element={<CreateJobPage/>}/>
                    <Route path="/" element={<HomePage />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
