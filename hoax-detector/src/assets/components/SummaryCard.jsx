// src/assets/components/SummaryCard.jsx
import React from 'react';

const SummaryCard = ({ title, value, valueColorClass }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center text-center">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
      <p className={`text-5xl font-bold ${valueColorClass}`}>{value}</p>
    </div>
  );
};

export default SummaryCard;