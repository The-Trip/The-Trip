import React from "react";
import socketIOClient from "socket.io-client";
import "../styles/components/Socket.scss";

class Socket extends React.Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "/"
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => this.setState({ response: data }));
  }

  render() {
    const { response } = this.state;
    return (
      <header className="sockets__loader">
        {response ? (
          <p>The temperature in Florence is: {response} °F</p>
        ) : (
          <p>Loading...</p>
        )}
      </header>
    );
  }
}

export default Socket;
