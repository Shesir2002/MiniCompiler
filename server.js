// const express = require('express');
// const { exec } = require('child_process');
// const fs = require('fs');
// const path = require('path');
// const cors = require('cors');
// const os = require('os');

// const app = express();
// app.use(express.json());
// app.use(cors());

// app.post('/compile', (req, res) => {
//     const code = req.body.code;
//     const tempFilePath = path.join(__dirname, 'temp_input.txt');

   
//     fs.writeFileSync(tempFilePath, code);

//     const isWindows = os.platform()==='win32';
//     const compilerBinary = isWindows?'mini_compiler.exe':'mini_compiler';
//     const compilerPath = path.join(__dirname,compilerBinary);

//     const command = `"${compilerPath}" "${tempFilePath}"`;

   
//     exec(command, (error, stdout, stderr) => {
//         // Clean up the temporary file afterwards
//         if (fs.existsSync(tempFilePath)) {
//             fs.unlinkSync(tempFilePath);
//         }

       
//         res.json({
//             output: stdout + (stderr ? "\n" + stderr : ""),
//             exitCode: error ? error.code : 0,
//             platform:os.platform()
//         });
//     });
// });

// const PORT = process.env.PORT||3001;
// app.listen(PORT, () => {
//     console.log(`Compiler bridge server running at http://localhost:${PORT} [OS: ${os.platform()}]`);
// });


// server.js
const express = require('express');
const cors = require('cors');
const os = require('os');
const compilerRoutes = require('./routes/compiler.routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Mount modular API routes
app.use('/', compilerRoutes);

app.listen(PORT, () => {
    console.log(`Compiler bridge server running at http://localhost:${PORT} [OS: ${os.platform()}]`);
});