import React from 'react';

export default function SkeletonLoader({ count = 3 }) {
  return (
    <div className="grid-3">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="brigade-card" style={{ padding: '0 0 16px 0' }}>
          <div className="skeleton" style={{ height: '160px', width: '100%' }} />
          <div style={{ padding: '16px 16px 8px 16px' }}>
            <div className="skeleton" style={{ height: '20px', width: '80%', marginBottom: '8px' }} />
            <div className="skeleton" style={{ height: '14px', width: '40%' }} />
          </div>
          <div style={{ padding: '8px 16px' }}>
            <div className="skeleton" style={{ height: '40px', width: '100%', marginBottom: '12px' }} />
            <div className="skeleton" style={{ height: '36px', width: '100%' }} />
          </div>
        </div>
      ))}
    </div>
  );
}
