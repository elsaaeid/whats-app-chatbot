import React, { useState } from 'react';
import axios from 'axios';

const WhatsAppForm = () => {
  const [to, setTo] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post('/send-whatsapp', {
        to,
        body,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="to">To:</label>
      <input
        type="tel"
        id="to"
        value={to}
        onChange={(event) => setTo(event.target.value)}
        required
      />
      <br />
      <label htmlFor="body">Message:</label>
      <textarea
        id="body"
        value={body}
        onChange={(event) => setBody(event.target.value)}
        required
      />
      <br />
      <button type="submit">Send WhatsApp Message</button>
    </form>
  );
};

export default WhatsAppForm;