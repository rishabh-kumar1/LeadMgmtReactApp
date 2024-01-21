import React, { useState, useEffect, useRef } from 'react';
import LeadList from './LeadList';
import { v4 as uuidv4 } from 'uuid';
import { AiOutlineClose } from 'react-icons/ai';
import './index.css'

const LOCAL_STORAGE_KEY = 'leadApp.leads';

function App() {
  const [leads, setLeads] = useState(() => {
    const storedLeads = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedLeads ? JSON.parse(storedLeads) : [];
  });

  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(leads));
  }, [leads]);

  function toggleContacted(id) {
    const newLeads = leads.map(lead => {
      if (lead.id === id) {
        return { ...lead, contacted: !lead.contacted };
      }
      return lead;
    });
    setLeads(newLeads);
  }

  function handleAddLead() {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const phone = phoneRef.current.value;
    if (name === '' || email === '' || phone === '') return;

    setLeads(prevLeads => {
      return [...prevLeads, { id: uuidv4(), name, email, phone, contacted: false }];
    });

    // Clear the input fields
    nameRef.current.value = '';
    emailRef.current.value = '';
    phoneRef.current.value = '';
  }

  function handleClearContacted() {
    const newLeads = leads.filter(lead => !lead.contacted);
    setLeads(newLeads);
  }

  return (
    <div className="min-h-screen bg-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-white text-center mb-6">Lead Management</h1>
          
          <div className="overflow-hidden rounded-lg shadow-md bg-gray-900 text-white">
            <div className="px-6 py-4 border-b border-gray-700">
              <div className="flex justify-between items-center">
                <div className="text-lg">Name/Visitor ID</div>
                <div className="text-lg">Email</div>
                <div className="text-lg">Phone Number</div>
                <div className="text-lg">Contacted</div>
              </div>
            </div>
            <LeadList leads={leads} toggleContacted={toggleContacted} />
          </div>

          <div className="mt-4 flex space-x-2">
            <input className="flex-1 appearance-none border border-gray-700 bg-gray-800 text-white placeholder-gray-400 rounded py-2 px-4 focus:outline-none focus:border-blue-500" ref={nameRef} type="text" placeholder="Name/Visitor ID" />
            <input className="flex-1 appearance-none border border-gray-700 bg-gray-800 text-white placeholder-gray-400 rounded py-2 px-4 focus:outline-none focus:border-blue-500" ref={emailRef} type="email" placeholder="Email" />
            <input className="flex-1 appearance-none border border-gray-700 bg-gray-800 text-white placeholder-gray-400 rounded py-2 px-4 focus:outline-none focus:border-blue-500" ref={phoneRef} type="text" placeholder="Phone Number" />
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-lg focus:outline-none" onClick={handleAddLead}>
              Add Lead
            </button>
          </div>

          <div className="text-white mt-6">
            {leads.filter(lead => !lead.contacted).length} leads to contact
          </div>
        </div>
      </div>
      <div className="fixed bottom-8 right-8">
      <button 
      className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-full px-6 py-2 text-sm flex items-center justify-center" 
      onClick={handleClearContacted}
      title="Clear Contacted Leads">
      <AiOutlineClose className="w-4 h-4 mr-2" />
      Clear Contacted Leads
    </button>
      </div>
    </div>
  );
}

export default App;
