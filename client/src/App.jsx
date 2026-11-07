// import { useState } from 'react'
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



import React, { useState } from 'react';
import './App.css';

function App() {
  const [code, setCode] = useState('int x = 5;\nint y = 10;\nint result = x + y;\nprint(result);');
  const [output, setOutput] = useState('// Click "Run Code" to compile and test your mini-language.');
  const [loading, setLoading] = useState(false);

  const handleRunCode = async () => {
    setLoading(true);
    setOutput('Compiling via ./mini_compiler.exe ...');

    try {
      const response = await fetch('http://localhost:5000/compile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      setOutput(data.output || 'No output generated.');
    } catch (err) {
      setOutput(`Error connecting to compiler backend: ${err.message}\nMake sure your server.js is running!`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ fontFamily: 'monospace', background: '#0d1117', color: '#c9d1d9', minHeight: '100vh', padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #30363d', paddingBottom: '15px', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, color: '#58a6ff' }}>⚡ MiniCompiler Web Studio</h2>
        <button 
          onClick={handleRunCode} 
          disabled={loading}
          style={{ background: '#238636', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          {loading ? 'Compiling...' : '▶ Run Code'}
        </button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', height: '75vh' }}>
        {/* Editor Side */}
        <div style={{ display: 'flex', flexDirection: 'column', background: '#161b22', borderRadius: '8px', border: '1px solid #30363d', overflow: 'hidden' }}>
          <div style={{ background: '#21262d', padding: '10px 15px', fontSize: '14px', borderBottom: '1px solid #30363d' }}>
            Source Code Editor (sample.txt)
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
            Compiler Terminal Output
          </div>
          <pre style={{ flex: 1, margin: 0, padding: '15px', color: '#7ee787', overflowY: 'auto', fontSize: '14px', whiteSpace: 'pre-wrap' }}>
            {output}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default App;