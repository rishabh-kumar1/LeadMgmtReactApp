import React from 'react';
import Lead from './Lead';

export default function LeadList({ leads, toggleContacted }) {
  return (
    <div className="divide-y divide-gray-700">
      {leads.map(lead => {
        return <Lead key={lead.id} lead={lead} toggleContacted={toggleContacted} />
      })}
    </div>
  );
}
