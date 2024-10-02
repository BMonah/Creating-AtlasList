import React from 'react'
import { Hero, Navbar, AvailableJobsPage, LoginPage, SignUpPage, CreateJobPage, Feedback, CTA, Companies } from './components'
import Footer from './components/Footer'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';

const HomePage = () => (
  <>
    <Hero />
    <Companies />
    <Feedback />
    <CTA />
  </>
);

const App = () => {
  return (
    <Router>
        <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/getJobs" element={<AvailableJobsPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/signup" element={<SignUpPage/>}/>
            <Route path="/createjob" element={<CreateJobPage/>}/>
          </Routes>
        <Footer/>
    </Router>
  )
}

export default App
