import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [formData, setFormData] = useState({
        message: '',
        tid: '',
        deviceUID: ''
    });
    const [ipAddress, setIpAddress] = useState('');

    useEffect(() => {
        const getIpAddress = async () => {
            try {
                const { addresses } = await window.RTCPeerConnection.prototype.getConfiguration();
                const ipAddress = addresses[0];
                setIpAddress(ipAddress);
            } catch (error) {
                console.error('Error retrieving IP address:', error);
            }
        };

        getIpAddress();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const invoiceArray = formData.message.split(',').map((invoice) => invoice.trim());

        const invoices = invoiceArray.map((invoice) => JSON.parse(invoice));
        console.log("TID", formData.tid);
        console.log("DeviceUID", formData.deviceUID);
        console.log("HostTabId/s", invoices);
        //POS node endpoint
        //http://localhost:8081/v1/tabs/4d033fe0-fc76-40eb-9d73-45f2486b7643/sync

        for (const hostTab of invoices) {
            const response = await axios.post(`http://localhost:8081/v1/tabs/${hostTab}/sync`);
            // Process the response as needed
            console.log(response.statusText);
        }

        setFormData({
            message: '',
            deviceUID: '',
            tid: ''
        });
    };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Copy and paste the following below in each field and make sure that POS is running in the correct environment,
            tenant and has the corresponding db.
            Needed data is DeviceUID : {ipAddress}, TenantID and the list of the host_tab_ids wrapped into a string
        </p>
          <form onSubmit={handleSubmit}>
              <label>
                  deviceUID:
                  <input
                      type="text"
                      name="deviceUID"
                      value={formData.deviceUID}
                      onChange={handleChange}
                  />
              </label>
              <label>
                  Tenant ID:
                  <input
                      type="text"
                      name="tid"
                      value={formData.tid}
                      onChange={handleChange}
                  />
              </label>
              <label>
                  HostTabId/s:
                  <input
                      type="text"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                  />
              </label>
              <br/>
              <button type="submit">Submit</button>
          </form>
      </header>

    </div>

  );
}

export default App;
