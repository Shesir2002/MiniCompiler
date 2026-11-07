// client/src/api/compilerApi.js

const RENDER_API_URL = 'https://minicompiler-zig0.onrender.com/compile';
// Uncomment if testing locally:
// const LOCAL_API_URL = 'http://localhost:3001/compile';

export const compileCode = async (code) => {
  try {
    const response = await fetch(RENDER_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });

    const data = await response.json();
    return {
      output: data.output || 'No output generated.',
      error: null
    };
  } catch (err) {
    return {
      output: '',
      error: `Error connecting to compiler backend: ${err.message}`
    };
  }
};