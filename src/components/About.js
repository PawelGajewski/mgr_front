import React from 'react'
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
// import './style.css';


const About = () => {
    return (
        <div className="about">
            <Navbar />
            <h2>Tutaj coś o magisterce</h2>
            <p>Cos dalej</p>
            <Link to="/">Powrót</Link>
        </div>
    )
}

export default About
