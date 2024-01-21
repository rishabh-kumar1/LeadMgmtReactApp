import React from 'react';

export default function Lead({ lead, toggleContacted }) {
  
  function handleContactedClick() {
    toggleContacted(lead.id);
  }
  
  return (
    <div className="px-6 py-4 flex justify-between items-center">
      <div className="flex-1 text-gray-300">{lead.name}</div>
      <div className="flex-1 text-gray-300">{lead.email}</div>
      <div className="flex-1 text-gray-300">{lead.phone}</div>
      <input type="checkbox" checked={lead.contacted} onChange={handleContactedClick} className="form-checkbox h-6 w-6" />
    </div>
  );
}
