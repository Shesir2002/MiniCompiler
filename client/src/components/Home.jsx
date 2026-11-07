// // client/src/components/Home.jsx
// import React from 'react';

// export default function Home({ onNavigateStudio }) {
//   return (
//     <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>
      
//       {/* Hero Section */}
//       <div style={{ textAlign: 'center', padding: '40px 20px', background: 'linear-gradient(180deg, #161b22 0%, #0d1117 100%)', borderRadius: '12px', border: '1px solid #30363d', boxShadow: '0 0 30px rgba(88,166,255,0.1)' }}>
//         <h1 style={{ fontSize: '38px', color: '#58a6ff', marginBottom: '15px', textShadow: '0 0 15px rgba(88,166,255,0.5)' }}>
//           Interactive Compiler & AST Visualizer
//         </h1>
//         <p style={{ color: '#8b949e', fontSize: '16px', maxWidth: '700px', margin: '0 auto 25px auto', lineHeight: '1.6' }}>
//           Inspect lexical analysis, syntax parsing boundaries, memory symbol hash-maps, and tree-walk interpretation in real-time.
//         </p>
//         <button 
//           onClick={onNavigateStudio}
//           style={{ background: '#238636', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 0 15px rgba(35,134,54,0.4)' }}
//         >
//           Launch Code Studio →
//         </button>
//       </div>

//       {/* Visualization Grid: Loops & Hashmap Tree Node Mapping */}
//       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
//         {/* Loop & Code Execution Flow Preview */}
//         <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '8px', padding: '20px' }}>
//           <h3 style={{ color: '#58a6ff', marginTop: 0, borderBottom: '1px solid #30363d', paddingBottom: '10px' }}>
//             🔄 Loop & State Trace Visualizer
//           </h3>
//           <p style={{ fontSize: '13px', color: '#8b949e' }}>Simulated block execution cycles:</p>
//           <div style={{ background: '#0d1117', padding: '15px', borderRadius: '6px', border: '1px solid #21262d', color: '#7ee787', fontSize: '14px' }}>
//             <code>
//               {`int n = 5;\nfor(int i = 0; i < n; i++) {\n  print(i); // State: i -> 0, 1, 2, 3, 4\n}`}
//             </code>
//           </div>
//           <div style={{ display: 'flex', gap: '8px', marginTop: '15px' }}>
//             {[0, 1, 2, 3, 4].map((val) => (
//               <div key={val} style={{ flex: 1, background: '#21262d', padding: '8px', textAlign: 'center', borderRadius: '4px', border: '1px solid #58a6ff55', color: '#58a6ff', fontWeight: 'bold' }}>
//                 i={val}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Hashmap & Tree Node Visualization */}
//         <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '8px', padding: '20px' }}>
//           <h3 style={{ color: '#58a6ff', marginTop: 0, borderBottom: '1px solid #30363d', paddingBottom: '10px' }}>
//             🌲 Hashmap & AST Tree Node Map
//           </h3>
//           <p style={{ fontSize: '13px', color: '#8b949e' }}>Symbol Table & Hierarchy Mapping:</p>
          
//           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginTop: '15px' }}>
//             <div style={{ background: '#21262d', border: '1px solid #58a6ff', padding: '8px 16px', borderRadius: '6px', color: '#58a6ff', fontSize: '13px' }}>
//               Program Root [StmtList]
//             </div>
//             <div style={{ width: '2px', height: '15px', background: '#30363d' }}></div>
//             <div style={{ display: 'flex', gap: '15px', width: '100%', justifyContent: 'center' }}>
//               <div style={{ background: '#0d1117', border: '1px solid #30363d', padding: '8px 12px', borderRadius: '6px', fontSize: '12px' }}>
//                 Decl: <span style={{ color: '#7ee787' }}>x = 5</span>
//               </div>
//               <div style={{ background: '#0d1117', border: '1px solid #30363d', padding: '8px 12px', borderRadius: '6px', fontSize: '12px' }}>
//                 Decl: <span style={{ color: '#7ee787' }}>y = 10</span>
//               </div>
//               <div style={{ background: '#0d1117', border: '1px solid #30363d', padding: '8px 12px', borderRadius: '6px', fontSize: '12px' }}>
//                 Print: <span style={{ color: '#7ee787' }}>result</span>
//               </div>
//             </div>
//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }



// // client/src/components/Home.jsx
// import React from 'react';

// export default function Home({ onNavigateStudio }) {
//   return (
//     <div style={{ position: 'relative', overflow: 'hidden', minHeight: '80vh', paddingBottom: '40px' }}>
      
//       {/* 🌌 FLOATING BACKGROUND VISUALIZATION ELEMENTS (Array, Hashmap, Tree Nodes, Code) */}
//       <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: 0.15 }}>
        
//         {/* Floating Array Element */}
//         <div className="float-anim-1" style={{ position: 'absolute', top: '10%', left: '5%', background: '#1f6feb22', border: '1px solid #58a6ff', padding: '10px 15px', borderRadius: '6px', color: '#58a6ff', fontSize: '12px' }}>
//           [ Array: Delete / Insert ]
//         </div>

//         {/* Floating Hashmap Node */}
//         <div className="float-anim-2" style={{ position: 'absolute', top: '25%', right: '8%', background: '#23863622', border: '1px solid #7ee787', padding: '10px 15px', borderRadius: '6px', color: '#7ee787', fontSize: '12px' }}>
//           {'Map { "x" => 5, "y" => 10 }'}
//         </div>

//         {/* Floating Tree Node */}
//         <div className="float-anim-3" style={{ position: 'absolute', bottom: '15%', left: '10%', background: '#8957e522', border: '1px solid #bc8cff', padding: '10px 15px', borderRadius: '6px', color: '#bc8cff', fontSize: '12px' }}>
//           🌲 AST: BinaryExpr (+)
//         </div>

//         {/* Floating Code Snippet */}
//         <div className="float-anim-1" style={{ position: 'absolute', bottom: '25%', right: '12%', background: '#ff7b7222', border: '1px solid #ff7b72', padding: '10px 15px', borderRadius: '6px', color: '#ff7b72', fontSize: '12px' }}>
//           while(i &lt; n) &#123; i++; &#125;
//         </div>
//       </div>

//       {/* 🌟 MAIN CONTENT CONTAINER */}
//       <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>
        
//         {/* Hero Section with Glow Hover */}
//         <div className="hero-card" style={{ 
//           textAlign: 'center', 
//           padding: '50px 20px', 
//           background: 'linear-gradient(180deg, #161b22 0%, #0d1117 100%)', 
//           borderRadius: '12px', 
//           border: '1px solid #30363d', 
//           boxShadow: '0 0 30px rgba(88,166,255,0.08)',
//           transition: 'all 0.3s ease-in-out'
//         }}>
//           <h1 style={{ fontSize: '40px', color: '#58a6ff', marginBottom: '15px', textShadow: '0 0 20px rgba(88,166,255,0.4)' }}>
//             Interactive Compiler & AST Visualizer
//           </h1>
//           <p style={{ color: '#8b949e', fontSize: '16px', maxWidth: '700px', margin: '0 auto 30px auto', lineHeight: '1.6' }}>
//             Inspect lexical analysis, syntax parsing boundaries, memory symbol hash-maps, and tree-walk interpretation in real-time.
//           </p>
//           <button 
//             onClick={onNavigateStudio}
//             className="launch-btn"
//             style={{ 
//               background: '#238636', 
//               color: '#fff', 
//               border: 'none', 
//               padding: '14px 32px', 
//               borderRadius: '8px', 
//               fontSize: '16px', 
//               fontWeight: 'bold', 
//               cursor: 'pointer', 
//               boxShadow: '0 0 15px rgba(35,134,54,0.4)',
//               transition: 'all 0.2s ease'
//             }}
//           >
//             Launch Code Studio →
//           </button>
//         </div>

//         {/* Visualization Grid: Loops & Hashmap Tree Node Mapping */}
//         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
          
//           {/* Loop & Code Execution Flow Preview Card */}
//           <div className="hover-card" style={{ 
//             background: '#161b22', 
//             border: '1px solid #30363d', 
//             borderRadius: '10px', 
//             padding: '25px',
//             transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
//           }}>
//             <h3 style={{ color: '#58a6ff', marginTop: 0, borderBottom: '1px solid #30363d', paddingBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
//               <span>🔄</span> Loop & State Trace Visualizer
//             </h3>
//             <p style={{ fontSize: '13px', color: '#8b949e' }}>Simulated block execution cycles & arrays:</p>
            
//             <div style={{ background: '#0d1117', padding: '15px', borderRadius: '6px', border: '1px solid #21262d', color: '#7ee787', fontSize: '14px', margin: '15px 0' }}>
//               <code>
//                 {`int n = 5;\nfor(int i = 0; i < n; i++) {\n  print(i); // State: i -> 0, 1, 2, 3, 4\n}`}
//               </code>
//             </div>

//             <div style={{ display: 'flex', gap: '8px' }}>
//               {[0, 1, 2, 3, 4].map((val) => (
//                 <div key={val} className="array-node" style={{ 
//                   flex: 1, 
//                   background: '#21262d', 
//                   padding: '10px 0', 
//                   textAlign: 'center', 
//                   borderRadius: '6px', 
//                   border: '1px solid #58a6ff33', 
//                   color: '#58a6ff', 
//                   fontWeight: 'bold',
//                   transition: 'all 0.2s ease'
//                 }}>
//                   i={val}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Hashmap & Tree Node Visualization Card */}
//           <div className="hover-card" style={{ 
//             background: '#161b22', 
//             border: '1px solid #30363d', 
//             borderRadius: '10px', 
//             padding: '25px',
//             transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
//           }}>
//             <h3 style={{ color: '#58a6ff', marginTop: 0, borderBottom: '1px solid #30363d', paddingBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
//               <span>🌲</span> Hashmap & AST Tree Node Map
//             </h3>
//             <p style={{ fontSize: '13px', color: '#8b949e' }}>Symbol Table & Hierarchy Mapping:</p>
            
//             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginTop: '20px' }}>
//               <div className="tree-node-root" style={{ background: '#21262d', border: '1px solid #58a6ff', padding: '10px 20px', borderRadius: '6px', color: '#58a6ff', fontSize: '13px', fontWeight: 'bold' }}>
//                 Program Root [StmtList]
//               </div>
//               <div style={{ width: '2px', height: '15px', background: '#30363d' }}></div>
//               <div style={{ display: 'flex', gap: '12px', width: '100%', justifyContent: 'center' }}>
//                 <div className="tree-node-child" style={{ background: '#0d1117', border: '1px solid #30363d', padding: '10px 12px', borderRadius: '6px', fontSize: '12px', transition: 'all 0.2s ease' }}>
//                   Decl: <span style={{ color: '#7ee787' }}>x = 5</span>
//                 </div>
//                 <div className="tree-node-child" style={{ background: '#0d1117', border: '1px solid #30363d', padding: '10px 12px', borderRadius: '6px', fontSize: '12px', transition: 'all 0.2s ease' }}>
//                   Decl: <span style={{ color: '#7ee787' }}>y = 10</span>
//                 </div>
//                 <div className="tree-node-child" style={{ background: '#0d1117', border: '1px solid #30363d', padding: '10px 12px', borderRadius: '6px', fontSize: '12px', transition: 'all 0.2s ease' }}>
//                   Print: <span style={{ color: '#7ee787' }}>result</span>
//                 </div>
//               </div>
//             </div>

//           </div>

//         </div>

//       </div>

//       {/* CSS Styles for Floating Animations and Hover Effects */}
//       <style>{`
//         @keyframes floatAnim {
//           0% { transform: translateY(0px) rotate(0deg); }
//           50% { transform: translateY(-12px) rotate(1deg); }
//           100% { transform: translateY(0px) rotate(0deg); }
//         }
//         .float-anim-1 { animation: floatAnim 6s ease-in-out infinite; }
//         .float-anim-2 { animation: floatAnim 8s ease-in-out infinite 1s; }
//         .float-anim-3 { animation: floatAnim 7s ease-in-out infinite 2s; }

//         .hero-card:hover {
//           border-color: #58a6ff55;
//           box-shadow: 0 0 40px rgba(88,166,255,0.15) !important;
//         }

//         .launch-btn:hover {
//           background: #2ea043 !important;
//           box-shadow: 0 0 25px rgba(46,160,67,0.6) !important;
//           transform: translateY(-2px);
//         }

//         .hover-card:hover {
//           border-color: #58a6ff88;
//           transform: translateY(-4px);
//           box-shadow: 0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(88,166,255,0.1);
//         }

//         .array-node:hover {
//           background: #1f6feb22 !important;
//           border-color: #58a6ff !important;
//           color: #ffffff !important;
//           transform: scale(1.05);
//         }

//         .tree-node-child:hover {
//           border-color: #7ee787 !important;
//           box-shadow: 0 0 10px rgba(126,231,135,0.2);
//           transform: translateY(-2px);
//         }
//       `}</style>
//     </div>
//   );
// }






// client/src/components/Home.jsx
import React from 'react';

export default function Home({ onNavigateStudio }) {
  return (
    <div style={{
      position: 'relative',
      minHeight: '75vh',
      borderRadius: '16px',
      overflow: 'hidden',
      backgroundImage: `linear-gradient(rgba(156, 172, 216, 0.46), rgba(68, 84, 124, 0.88)), url('/homebg.jpeg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 20px',
      border: '1px solid #30363d',
      boxShadow: '0 20px 50px rgba(0,0,0,0.6)'
    }}>
      
      {/* 🌟 HERO CONTENT BOX WITH FROSTED GLASS EFFECT */}
      <div className="hero-card" style={{ 
        textAlign: 'center', 
        padding: '60px 40px', 
        background: 'rgba(22, 27, 34, 0.80)',
        backdropFilter: 'blur(12px)',
        borderRadius: '16px', 
        border: '1px solid #30363d', 
        boxShadow: '0 0 40px rgba(88,166,255,0.15)',
        maxWidth: '750px',
        width: '100%',
        transition: 'all 0.3s ease-in-out'
      }}>
        <h1 style={{ fontSize: '42px', color: '#58a6ff', marginBottom: '20px', textShadow: '0 0 20px rgba(88,166,255,0.5)', letterSpacing: '-0.5px' }}>
          Interactive Compiler & AST Visualizer
        </h1>
        <p style={{ color: '#8b949e', fontSize: '16px', lineHeight: '1.6', marginBottom: '35px' }}>
          Inspect lexical analysis, syntax parsing boundaries, memory symbol hash-maps, and tree-walk interpretation in real-time through an advanced execution engine.
        </p>
        <button 
          onClick={onNavigateStudio}
          className="launch-btn"
          style={{ 
            background: '#238636', 
            color: '#fff', 
            border: 'none', 
            padding: '14px 32px', 
            borderRadius: '8px', 
            fontSize: '16px', 
            fontWeight: 'bold', 
            cursor: 'pointer', 
            boxShadow: '0 0 20px rgba(35,134,54,0.5)',
            transition: 'all 0.2s ease'
          }}
        >
          Launch Code Studio →
        </button>
      </div>

      {/* CSS Hover Glow Effects */}
      <style>{`
        .hero-card:hover {
          border-color: #58a6ff88;
          box-shadow: 0 0 50px rgba(88,166,255,0.25) !important;
          transform: translateY(-2px);
        }

        .launch-btn:hover {
          background: #2ea043 !important;
          box-shadow: 0 0 30px rgba(46,160,67,0.8) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}