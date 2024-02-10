import React, { Component } from 'react';
import socketIOClient from './socketIOClient';

class ChatApp extends Component {
    constructor() {
        super();
        this.state = {
            message: '',
            messages: [],
        };

        this.socket = socketIOClient();
        this.socket.on('message', (message) => {
            this.setState({ messages: [...this.state.messages, message] });
        });
    }

    sendMessage = (e) => {
        e.preventDefault();
        this.socket.emit('message', this.state.message);
        this.setState({ message: '' });
    };

    render() {
        return (
            <div className="App">
                <ul id="messages">
                    {this.state.messages.map((message, index) => (
                        <li key={index}>{message}</li>
                    ))}
                </ul>
                <form onSubmit={this.sendMessage}>
                    <input
                        id="m"
                        autoComplete="off"
                        autofocus="autofocus"
                        placeholder="Type your message"
                        value={this.state.message}
                        onChange={(e) => this.setState({ message: e.target.value })}
                    />
                    <button>Send</button>
                </form>
            </div>
        );
    }
}

export default ChatApp;