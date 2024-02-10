import React, { useState } from 'react';
import axios from 'axios';

// const REACT_APP_BACKEND_SERVER_URL= "http://localhost:8081/whatsapp-message"

const Chatbot = () => {
 const [message, setMessage] = useState('');
 const [response, setResponse] = useState('');

 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8081/whatsapp-message", { Body: message });
      setResponse(res.data);
    } catch (error) {
      console.error(error);
      setResponse('Failed to send message');
    }
 };



 return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="message">Message:</label>
        <input type="text" id="message" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button type="submit">Send</button>
      </form>
      <p>Response: {response}</p>
    </div>
 );
};

export default Chatbot;