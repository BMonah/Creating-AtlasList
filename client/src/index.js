import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import ReactDOM from 'react-dom/client';
import NavBar  from './components/Navbar';


//The browser router is to have our application use react router
const App=()=>{
    return (
            <div className="container">
                <NavBar/>
            </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />)