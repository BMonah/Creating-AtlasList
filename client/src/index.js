import 'bootstrap/dist/css/bootstrap.min.css';
import React ,{useEffect, useState}from 'react'
import ReactDOM from 'react-dom/client';

const App=()=>{
    //we will use useEffect hook to make an API call everytime we render our API
    //now we want to fetch a hellow world
    useEffect(
        ()=>{
            fetch('http://localhost:8080/recipe/hello')
            .then(response=>response.json())
            .then(data=>{console.log(data)
                //Use useState hook to set the value of our message to the hello world
                setMessage(data.message)
            })
            .catch(err=>console.log(err))

        },[]
    )

    const [message,setMessage]=useState('')
    return (
        <div className="app">
            {message}
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />)