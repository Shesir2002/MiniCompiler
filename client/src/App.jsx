
// // client/src/App.jsx
// import React, { useState } from 'react';
// import Home from './components/Home';
// import CompilerStudio from './components/CompilerStudio';
// import './App.css';

// function App() {
//   const [currentView, setCurrentView] = useState('home'); // 'home' or 'studio'

//   return (
//     <div style={{ fontFamily: 'monospace', background: '#07090e', color: '#c9d1d9', minHeight: '100vh', padding: '20px' }}>
      
//       {/* Navigation Header */}
//       <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1f6feb33', paddingBottom: '15px', marginBottom: '30px' }}>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
//           <h2 style={{ margin: 0, color: '#58a6ff', textShadow: '0 0 10px rgba(88,166,255,0.4)' }}>⚡ Visualier Engine</h2>
//           <span style={{ fontSize: '12px', background: '#1f6feb22', color: '#58a6ff', padding: '4px 8px', borderRadius: '4px', border: '1px solid #58a6ff44' }}>v2.6 Core</span>
//         </div>
//         <div style={{ display: 'flex', gap: '10px' }}>
//           <button 
//             onClick={() => setCurrentView('home')}
//             style={{ background: currentView === 'home' ? '#1f6feb' : 'transparent', color: '#fff', border: '1px solid #30363d', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
//           >
//             Home / Visualizer
//           </button>
//           <button 
//             onClick={() => setCurrentView('studio')}
//             style={{ background: currentView === 'studio' ? '#1f6feb' : 'transparent', color: '#fff', border: '1px solid #30363d', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
//           >
//             Compiler Studio
//           </button>
//         </div>
//       </header>

//       {/* View Switcher */}
//       {currentView === 'home' && <Home onNavigateStudio={() => setCurrentView('studio')} />}
//       {currentView === 'studio' && <CompilerStudio />}

//     </div>
//   );
// }

// export default App;





// client/src/App.jsx
import React, { useState } from 'react';
import Home from './components/Home';
import CompilerStudio from './components/CompilerStudio';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' or 'studio'

  return (
    <div style={{ fontFamily: 'monospace', background: '#07090e', color: '#c9d1d9', minHeight: '100vh', padding: '20px' }}>
      
      {/* Navigation Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1f6feb33', paddingBottom: '15px', marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <h2 style={{ margin: 0, color: '#58a6ff', textShadow: '0 0 10px rgba(88,166,255,0.4)' }}> Visualier Engine</h2>
          {/* <span style={{ fontSize: '12px', background: '#1f6feb22', color: '#58a6ff', padding: '4px 8px', borderRadius: '4px', border: '1px solid #58a6ff44' }}>v2.6 Core</span> */}
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => setCurrentView('home')}
            style={{ 
              background: currentView === 'home' ? '#1f6feb' : 'transparent', 
              color: '#fff', 
              border: '1px solid #30363d', 
              padding: '8px 16px', 
              borderRadius: '6px', 
              cursor: 'pointer', 
              fontWeight: 'bold',
              transition: 'all 0.2s'
            }}
          >
            Home / Visualizer
          </button>
          <button 
            onClick={() => setCurrentView('studio')}
            style={{ 
              background: currentView === 'studio' ? '#1f6feb' : 'transparent', 
              color: '#fff', 
              border: '1px solid #30363d', 
              padding: '8px 16px', 
              borderRadius: '6px', 
              cursor: 'pointer', 
              fontWeight: 'bold',
              transition: 'all 0.2s'
            }}
          >
            Compiler Studio
          </button>
        </div>
      </header>

      {/* View Switcher */}
      {currentView === 'home' && <Home onNavigateStudio={() => setCurrentView('studio')} />}
      {currentView === 'studio' && <CompilerStudio />}

    </div>
  );
}

export default App;