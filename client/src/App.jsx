dawddawdaw// import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           type="button"
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }

// export default App



// import React, { useState } from 'react';
// import './App.css';

// function App() {
//   const [code, setCode] = useState('int x = 5;\nint y = 10;\nint result = x + y;\nprint(result);');
//   const [output, setOutput] = useState('// Click "Run Code" to compile and test your mini-language.');
//   const [loading, setLoading] = useState(false);

//   const handleRunCode = async () => {
//     setLoading(true);
//     setOutput('Compiling via ./mini_compiler.exe ...');

//     try {
//       // const response = await fetch('http://localhost:3001/compile', {
//       //   method: 'POST',
//       //   headers: { 'Content-Type': 'application/json' },
//       //   body: JSON.stringify({ code }),
//       // });

//       const response = await fetch('https://minicompiler-zig0.onrender.com/compile', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ code }),
//       });

//       // const response = await fetch('http://localhost:3001/compile', {
//       //   method: 'POST',
//       //   headers: { 'Content-Type': 'application/json' },
//       //   body: JSON.stringify({ code }),
//       // });

//       const data = await response.json();
//       setOutput(data.output || 'No output generated.');
//     } catch (err) {
//       setOutput(`Error connecting to compiler backend: ${err.message}\nMake sure your server.js is running!`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container" style={{ fontFamily: 'monospace', background: '#0d1117', color: '#c9d1d9', minHeight: '100vh', padding: '20px' }}>
//       <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #30363d', paddingBottom: '15px', marginBottom: '20px' }}>
//         <h2 style={{ margin: 0, color: '#58a6ff' }}>⚡ MiniCompiler Web Studio</h2>
//         <button 
//           onClick={handleRunCode} 
//           disabled={loading}
//           style={{ background: '#238636', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
//         >
//           {loading ? 'Compiling...' : '▶ Run Code'}
//         </button>
//       </header>

//       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', height: '75vh' }}>
//         {/* Editor Side */}
//         <div style={{ display: 'flex', flexDirection: 'column', background: '#161b22', borderRadius: '8px', border: '1px solid #30363d', overflow: 'hidden' }}>
//           <div style={{ background: '#21262d', padding: '10px 15px', fontSize: '14px', borderBottom: '1px solid #30363d' }}>
//             Source Code Editor (sample.txt)
//           </div>
//           <textarea
//             value={code}
//             onChange={(e) => setCode(e.target.value)}
//             spellCheck="false"
//             style={{ flex: 1, background: 'transparent', color: '#f0f6fc', border: 'none', padding: '15px', fontSize: '15px', fontFamily: 'monospace', resize: 'none', outline: 'none' }}
//           />
//         </div>

//         {/* Output Terminal Side */}
//         <div style={{ display: 'flex', flexDirection: 'column', background: '#010409', borderRadius: '8px', border: '1px solid #30363d', overflow: 'hidden' }}>
//           <div style={{ background: '#21262d', padding: '10px 15px', fontSize: '14px', borderBottom: '1px solid #30363d' }}>
//             Compiler Terminal Output
//           </div>
//           <pre style={{ flex: 1, margin: 0, padding: '15px', color: '#7ee787', overflowY: 'auto', fontSize: '14px', whiteSpace: 'pre-wrap' }}>
//             {output}
//           </pre>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;


import React, { useState } from 'react';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' or 'studio'
  const [code, setCode] = useState('int x = 5;\nint y = 10;\nint result = x + y;\nprint(result);');
  const [output, setOutput] = useState('// Click "Run Code" to compile and test your mini-language.');
  const [loading, setLoading] = useState(false);

  const handleRunCode = async () => {
    setLoading(true);
    setOutput('Compiling on cloud container...');

    try {
      const response = await fetch('https://minicompiler-zig0.onrender.com/compile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      setOutput(data.output || 'No output generated.');
    } catch (err) {
      setOutput(`Error connecting to compiler backend: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'monospace', background: '#07090e', color: '#c9d1d9', minHeight: '100vh', padding: '20px' }}>
      
      {/* Navigation Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1f6feb33', paddingBottom: '15px', marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <h2 style={{ margin: 0, color: '#58a6ff', textShadow: '0 0 10px rgba(88,166,255,0.4)' }}>⚡ Visualier Engine</h2>
          <span style={{ fontSize: '12px', background: '#1f6feb22', color: '#58a6ff', padding: '4px 8px', borderRadius: '4px', border: '1px solid #58a6ff44' }}>v2.6 Core</span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => setCurrentView('home')}
            style={{ background: currentView === 'home' ? '#1f6feb' : 'transparent', color: '#fff', border: '1px solid #30363d', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Home / Visualizer
          </button>
          <button 
            onClick={() => setCurrentView('studio')}
            style={{ background: currentView === 'studio' ? '#1f6feb' : 'transparent', color: '#fff', border: '1px solid #30363d', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Compiler Studio
          </button>
        </div>
      </header>

      {/* VIEW 1: HOME & VISUALIZER LANDING */}
      {currentView === 'home' && (
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>
          
          {/* Hero Section */}
          <div style={{ textAlign: 'center', padding: '40px 20px', background: 'linear-gradient(180deg, #161b22 0%, #0d1117 100%)', borderRadius: '12px', border: '1px solid #30363d', boxShadow: '0 0 30px rgba(88,166,255,0.1)' }}>
            <h1 style={{ fontSize: '38px', color: '#58a6ff', marginBottom: '15px', textShadow: '0 0 15px rgba(88,166,255,0.5)' }}>
              Interactive Compiler & AST Visualizer
            </h1>
            <p style={{ color: '#8b949e', fontSize: '16px', maxWidth: '700px', margin: '0 auto 25px auto', lineHeight: '1.6' }}>
              Inspect lexical analysis, syntax parsing boundaries, memory symbol hash-maps, and tree-walk interpretation in real-time.
            </p>
            <button 
              onClick={() => setCurrentView('studio')}
              style={{ background: '#238636', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 0 15px rgba(35,134,54,0.4)' }}
            >
              Launch Code Studio →
            </button>
          </div>

          {/* Visualization Grid: Loops & Hashmap Tree Node Mapping */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            
            {/* Loop & Code Execution Flow Preview */}
            <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '8px', padding: '20px' }}>
              <h3 style={{ color: '#58a6ff', marginTop: 0, borderBottom: '1px solid #30363d', paddingBottom: '10px' }}>
                🔄 Loop & State Trace Visualizer
              </h3>
              <p style={{ fontSize: '13px', color: '#8b949e' }}>Simulated block execution cycles:</p>
              <div style={{ background: '#0d1117', padding: '15px', borderRadius: '6px', border: '1px solid #21262d', color: '#7ee787', fontSize: '14px' }}>
                <code>
                  {`int n = 5;\nfor(int i = 0; i < n; i++) {\n  print(i); // State: i -> 0, 1, 2, 3, 4\n}`}
                </code>
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '15px' }}>
                {[0, 1, 2, 3, 4].map((val) => (
                  <div key={val} style={{ flex: 1, background: '#21262d', padding: '8px', textAlign: 'center', borderRadius: '4px', border: '1px solid #58a6ff55', color: '#58a6ff', fontWeight: 'bold' }}>
                    i={val}
                  </div>
                ))}
              </div>
            </div>

            {/* Hashmap & Tree Node Visualization */}
            <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '8px', padding: '20px' }}>
              <h3 style={{ color: '#58a6ff', marginTop: 0, borderBottom: '1px solid #30363d', paddingBottom: '10px' }}>
                🌲 Hashmap & AST Tree Node Map
              </h3>
              <p style={{ fontSize: '13px', color: '#8b949e' }}>Symbol Table & Hierarchy Mapping:</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginTop: '15px' }}>
                <div style={{ background: '#21262d', border: '1px solid #58a6ff', padding: '8px 16px', borderRadius: '6px', color: '#58a6ff', fontSize: '13px' }}>
                  Program Root [StmtList]
                </div>
                <div style={{ width: '2px', height: '15px', background: '#30363d' }}></div>
                <div style={{ display: 'flex', gap: '15px', width: '100%', justifyContent: 'center' }}>
                  <div style={{ background: '#0d1117', border: '1px solid #30363d', padding: '8px 12px', borderRadius: '6px', fontSize: '12px' }}>
                    Decl: <span style={{ color: '#7ee787' }}>x = 5</span>
                  </div>
                  <div style={{ background: '#0d1117', border: '1px solid #30363d', padding: '8px 12px', borderRadius: '6px', fontSize: '12px' }}>
                    Decl: <span style={{ color: '#7ee787' }}>y = 10</span>
                  </div>
                  <div style={{ background: '#0d1117', border: '1px solid #30363d', padding: '8px 12px', borderRadius: '6px', fontSize: '12px' }}>
                    Print: <span style={{ color: '#7ee787' }}>result</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* VIEW 2: COMPILER DASHBOARD STUDIO */}
      {currentView === 'studio' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', height: '75vh' }}>
          
          {/* Editor Side */}
          <div style={{ display: 'flex', flexDirection: 'column', background: '#161b22', borderRadius: '8px', border: '1px solid #30363d', overflow: 'hidden' }}>
            <div style={{ background: '#21262d', padding: '10px 15px', fontSize: '14px', borderBottom: '1px solid #30363d', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Source Code Editor (sample.txt)</span>
              <button 
                onClick={handleRunCode} 
                disabled={loading}
                style={{ background: '#238636', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}
              >
                {loading ? 'Compiling...' : '▶ Run Code'}
              </button>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck="false"
              style={{ flex: 1, background: 'transparent', color: '#f0f6fc', border: 'none', padding: '15px', fontSize: '15px', fontFamily: 'monospace', resize: 'none', outline: 'none' }}
            />
          </div>

          {/* Output Terminal Side */}
          <div style={{ display: 'flex', flexDirection: 'column', background: '#010409', borderRadius: '8px', border: '1px solid #30363d', overflow: 'hidden' }}>
            <div style={{ background: '#21262d', padding: '10px 15px', fontSize: '14px', borderBottom: '1px solid #30363d' }}>
              Compiler Terminal Output & Execution Log
            </div>
            <pre style={{ flex: 1, margin: 0, padding: '15px', color: '#7ee787', overflowY: 'auto', fontSize: '14px', whiteSpace: 'pre-wrap' }}>
              {output}
            </pre>
          </div>

        </div>
      )}

    </div>
  );
}

export default App;