import React from 'react';

const Header = ({ recordCount, streamActive, onToggleStream, onRefresh }) => {
  return (
    <header className="mb-8 flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold mb-2">Real-Time Data Processor</h1>
        <p className="text-gray-400">
          Backend API Connected • Monitoring {recordCount.toLocaleString()} records
        </p>
      </div>
      <div className="flex gap-4 items-center">
        <button
          onClick={onRefresh}
          className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
        >
          Refresh Data
        </button>
        <button 
          onClick={onToggleStream}
          className={`px-4 py-2 rounded transition-colors font-semibold ${
            streamActive ? 'bg-red-600 hover:bg-red-700' : 'bg-emerald-600 hover:bg-emerald-700'
          }`}
        >
          {streamActive ? 'Stop Ingestion' : 'Start Simulation'}
        </button>
      </div>
    </header>
  );
};

export default Header;
