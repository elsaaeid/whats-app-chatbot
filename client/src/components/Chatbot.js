import React, { useEffect, useState } from 'react';
import QRCode from "react-qr-code";
import io from "socket.io-client";



const socket = io.connect("http://localhost:3000", { transports: ['websocket', 'polling', 'flashsocket'] });

 const Chatbot = ()=> {
  const [session, setSession] = useState("");
  const [qrCode, setQrCode] = useState("");

  const createSessionForWhatsapp = ()=> {
    socket.emit("createSession", {
      id: session,
    })
  };
  const [id, setId] = useState('');
    useEffect(()=>{
      socket.emit("connected", "Hello from client");
      socket.on("qr", (data)=>{
        const { qr } = data;
        console.log("QR Received", qr);
        setQrCode(qr);
      });
      socket.on('ready', (data)=>{
        console.log(data);
        const {id} = data;
        setId(id);
      });
      socket.on('allChats', (data)=>{
        console.log('allChats', data);
      })
    }, [id]);
    return (
        <div className='chatbot flex flex-col justify-center items-center'>
          <h1>Open what's app and scan Qr Code</h1>
          <div>
            <input type='text' value={session} onChange={(e)=>{
              setSession(e.target.value);
            }} 
            />
            <button onChange={createSessionForWhatsapp}>Create session</button>
          </div>
          <div>
            {
            id !== '' && <button onClick={setId}>Get all chats</button>
            }
          </div>
          <QRCode className='mt-5' value={qrCode} />
        </div>
      )
    }
export default Chatbot