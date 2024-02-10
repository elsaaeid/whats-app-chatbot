//Create a basic node js with express app
const express = require("express");
const qrcode = require("qrcode-terminal");
const http = require("http");
const app = express();
const server = http.createServer(app);
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const { Server } = require("socket.io");
const io = new Server(server);



const Port = 3000;

const allSessionsObject = {};
const createWhatsappSession = (id, socket)=> {
const whatsapp = new Client({
    puppeteer: {
        args: ['--no-sandbox','--disable-setuid-sandbox'],
    },
    authStrategy: new LocalAuth({
        clientId: id,
    }),
});

whatsapp.initialize(); 

whatsapp.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});


whatsapp.on('message', async (message) => {
  if (message.body === 'hello') {
    message.reply('Hiiiii');
  }

  if (message.body === 'who are you') {
    //get media from url
    const media = await MessageMedia.fromUrl(
      'https://quteezwear.web.app/images/asq.jpg'
    );

    //replying with media
    whatsapp.sendMessage(message.from, media, {
      caption: 'This is me',
    });
  }

  if(message.body === 'GL01')
  {
    //get media from url
    const media = await MessageMedia.fromUrl(
      'https://quteezwear.web.app/images/03.png'
    );

    //replying with media
    whatsapp.sendMessage(message.from, media, {
      caption: 'Green Organsa',
    });
  }

  if(message.body === 'BY01')
  {
    //get media from url
    const media = await MessageMedia.fromUrl(
      'https://quteezwear.web.app/images/01.png'
    );

    //replying with media
    whatsapp.sendMessage(message.from, media, {
      caption: 'Boys Tees',
    });
  }
});


whatsapp.on('qr', (qr)=>{
    //generate and scan this code with your phone
    console.log("Qr Received", qr);
    socket.emit("qr", {
        qr,
    })
});
whatsapp.on("authenticated", ()=>{
    console.log("What's app is authenticated");
})
whatsapp.on('ready', ()=>{
  console.log("What's app is ready");
  allSessionsObject[id] = whatsapp;
  socket.emit("ready", {id, message: "what's app is ready!"});
});
}


io.on("connection", (socket)=> {
    console.log("a user connected", socket?.id);
    socket.on("disconnected", ()=>{
        console.log("user disconnected");
    });

    socket.on("connected", (data) =>{
        console.log("connected to the server", data);
        // emit hello
        socket.emit("hello", "Hello from server");
    });

    socket.on('createSession', (data)=> {
        console.log(data);
        const { id } = data;
        createWhatsappSession(id, socket);
    });


    socket.on('getAllChats', async (data)=>{
        console.log('getAllChats', data);
        const { id } = data;
        const whatsapp = allSessionsObject[id];
        const allChats = await whatsapp.getChats();
        socket.emit("allChats", {
            allChats,
        });
    });
});

server.listen(Port, ()=> {
    console.log(`Server listening on the Port: ${Port}`);
});