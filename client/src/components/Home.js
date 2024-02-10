// components/Home.js
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
 render() {
    return (
      <div className="home">
        <h1>Welcome to What App Web Chatbot</h1>
        <p>To get started, please click the link below.</p>
        <Link to="/chatbot">Start Chatting</Link>
      </div>
    );
 }
}

export default Home;