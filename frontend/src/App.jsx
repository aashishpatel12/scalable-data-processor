import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import DataList from './components/DataList';
import Toast from './components/Toast';
import { fetchData, postData } from './services/api';

function App() {
  const [data, setData] = useState([]);
  const [streamActive, setStreamActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchData();
      if (result.data) {
        setData(result.data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (!streamActive) return;

    const interval = setInterval(async () => {
      const newItem = {
        value: Math.random() * 100,
        source: 'Dashboard-Simulator',
        metadata: { priority: Math.random() > 0.8 ? 'High' : 'Low' }
      };

      try {
        const savedItem = await postData(newItem);
        setData(prevData => {
          const updated = [{
            ...savedItem,
            id: savedItem._id || Date.now(), 
            status: 'Live', 
          }, ...prevData];
          return updated;
        });
      } catch (err) {
        if (err.message === 'Rate Limit Exceeded') {
             setStreamActive(false);
             setError('Too many requests, simulation paused.');
        } else {
             console.error("Stream Error", err);
        }
      }
    }, 100); 

    return () => clearInterval(interval);
  }, [streamActive]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 relative">
      <Toast message={error} onClose={() => setError(null)} />
      
      <Header 
        recordCount={data.length} 
        streamActive={streamActive} 
        onToggleStream={() => setStreamActive(!streamActive)} 
        onRefresh={loadData}
      />

      <DataList data={data} loading={loading} />

    </div>
  );
}

export default App;
