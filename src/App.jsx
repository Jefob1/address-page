import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const data = [
    { name: 'Bitcoin', address: 'bc1qztvgpcq9984pag5e7wku96d9ztkl96me8wwkwc' },
    { name: 'Ethereum', address: '0x02EFC655e76e721787b025663Ab0DFd9E4b528e0' },
    { name: 'Tether USD', address: '0x02EFC655e76e721787b025663Ab0DFd9E4b528e0' },
    { name: 'Solana', address: 'CZ2WGcAjvxGjiQaqjGGYVepTjhpnHi1EpYzbBV3nTWok' },
    { name: 'Binance Coin', address: '0x02EFC655e76e721787b025663Ab0DFd9E4b528e0' },
    { name: 'Ripple', address: '0x02EFC655e76e721787b025663Ab0DFd9E4b528e0' },
  ];

  const [confirmationVisible, setConfirmationVisible] = useState(false);

  const copyToClipboard = (address) => {
    navigator.clipboard.writeText(address).then(() => {
      setConfirmationVisible(true);
      setTimeout(() => {
        setConfirmationVisible(false);
        window.close();
      }, 10000);
    });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const webhookUrl = 'https://crypto-price-zfzw.onrender.com/webhook';

      axios.post(webhookUrl, { data: 'your data payload' })
        .then((response) => {
          console.log('Webhook response:', response.data);
        })
        .catch((error) => {
          console.error('Error sending webhook:', error);
        });
    }, 300000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container">
      <table className="address-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.address}</td>
              <td>
                <button className="copy-button" onClick={() => copyToClipboard(item.address)}>
                  Copy
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {confirmationVisible && (
        <div className="confirmation-banner">
          Address copied! This page will close in 10 seconds.
        </div>
      )}
    </div>
  );
};

export default App;
