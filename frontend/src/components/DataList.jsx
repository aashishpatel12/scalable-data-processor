import React, { useRef, useState } from 'react';
import useVirtualizer from '../hooks/useVirtualizer';

const ITEM_HEIGHT = 60;
const CONTAINER_HEIGHT = 600;

const DataList = ({ data, loading }) => {
  const containerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = (e) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  const { virtualItems, totalHeight } = useVirtualizer({
    itemCount: data.length,
    itemHeight: ITEM_HEIGHT,
    containerHeight: CONTAINER_HEIGHT,
    scrollTop
  });

  if (loading && data.length === 0) {
    return (
      <div className="flex justify-center items-center h-[600px] text-gray-500 bg-gray-800 rounded-lg border border-gray-700">
        Loading Data...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto border border-gray-700 rounded-lg overflow-hidden bg-gray-800 shadow-xl relative">
      <div className="grid grid-cols-5 bg-gray-900 p-4 font-semibold border-b border-gray-700 text-gray-300">
        <div className="col-span-1">ID / Source</div>
        <div className="col-span-1 text-right pr-8">Value</div>
        <div className="col-span-1 text-center">Status</div>
        <div className="col-span-1">Priority</div>
        <div className="col-span-1 text-right">Timestamp</div>
      </div>

      <div 
        ref={containerRef}
        onScroll={handleScroll}
        style={{ height: CONTAINER_HEIGHT, overflowY: 'auto', position: 'relative' }}
        className="custom-scrollbar"
      >
        <div style={{ height: totalHeight, position: 'relative' }}>
          {virtualItems.map(({ index, offsetTop }) => {
            const item = data[index];
            if (!item) return null;
            
            return (
              <div
                key={item._id || item.id || index}
                style={{
                  position: 'absolute',
                  top: 0,
                  transform: `translateY(${offsetTop}px)`,
                  height: ITEM_HEIGHT,
                  width: '100%',
                }}
                className={`grid grid-cols-5 items-center px-4 border-b border-gray-700 hover:bg-gray-750 transition-colors
                  ${item.status === 'Live' ? 'bg-emerald-900/10' : ''}
                `}
              >
                <div className="col-span-1 text-xs font-mono text-gray-500 truncate pr-2">
                  <span className="block text-gray-300 text-sm mb-0.5">{item.source || 'System'}</span>
                  {item._id || item.id}
                </div>
                
                <div className="col-span-1 text-right pr-8 font-bold text-emerald-400 font-mono">
                  {Number(item.value).toFixed(2)}
                </div>
                
                <div className="col-span-1 text-center">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    item.status === 'Live' ? 'bg-emerald-900 text-emerald-300 border border-emerald-800' : 
                    'bg-gray-700 text-gray-400'
                  }`}>
                    {item.status || 'Persisted'}
                  </span>
                </div>

                <div className="col-span-1">
                  {item.metadata?.priority && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      item.metadata.priority === 'High' ? 'text-red-400 bg-red-900/20' : 'text-blue-400 bg-blue-900/20'
                    }`}>
                      {item.metadata.priority}
                    </span>
                  )}
                </div>
                
                <div className="col-span-1 text-right text-sm text-gray-500 font-mono">
                  {new Date(item.timestamp || item.createdAt).toLocaleTimeString()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DataList;
