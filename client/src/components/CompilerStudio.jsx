// client/src/components/CompilerStudio.jsx
import React, { useState } from 'react';
import { compileCode } from '../api/compilerApi';

export default function CompilerStudio() {
  const [code, setCode] = useState('int x = 5;\nint y = 10;\nint result = x + y;\nprint(result);');
  const [output, setOutput] = useState('// Click "Run Code" to compile and test your mini-language.');
  const [loading, setLoading] = useState(false);

  const handleRunCode = async () => {
    setLoading(true);
    setOutput('Compiling on cloud container...');

    const result = await compileCode(code);
    if (result.error) {
      setOutput(result.error);
    } else {
      setOutput(result.output);
    }
    setLoading(false);
  };

  return (
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
  );
}