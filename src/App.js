import React from 'react';
import Demo from './demo';
import DemoByD3 from './demoByD3';

import './app.css';

function App() {
    return (
        <div className="App" style={{ padding: 20 }}>
            <Demo />
            <DemoByD3 />
        </div>
    );
}

export default App;
