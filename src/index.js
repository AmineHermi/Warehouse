import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import WarehouseMap from './WarehouseMap/WarehouseMap.jsx';
import ToggleGrid from './ToggleGrid/ToggleGrid.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className="app-container">
      <h1>Warehouse Monitoring System</h1>
      <div className="content">
        <div className="section toggle-grid">
          <h2 className="section-title">Toggle Grid</h2>
          <ToggleGrid />
        </div>
        <div className="section warehouse-map">
          <h2 className="section-title">Warehouse Map</h2>
          <WarehouseMap />
        </div>
        <div className="section detections">
          <h2 className="section-title">Detections</h2>
          <p>No detections yet...</p>
        </div>
      </div>
    </div>
  </React.StrictMode>
);
