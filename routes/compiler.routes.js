// // routes/compiler.routes.js
// const express = require('express');
// const router = express.Router();
// const { exec } = require('child_process');
// const fs = require('fs');
// const path = require('path');

// router.post('/compile', (req, res) => {
//     const { code } = req.body;
//     const filePath = path.join(__dirname, '../sample.txt');

//     fs.writeFile(filePath, code, (err) => {
//         if (err) {
//             return res.status(500).json({ output: 'Error saving source file.' });
//         }

//         const compilerCommand = process.platform === 'win32' 
//             ? 'node_modules/.bin/.. ./mini_compiler.exe sample.txt' 
//             : './mini_compiler.exe sample.txt';

//         // Fallback execution depending on OS
//         const cmd = process.platform === 'win32' ? '.\mini_compiler.exe sample.txt' : './mini_compiler.exe sample.txt';

//         exec(cmd, { timeout: 5000 }, (error, stdout, stderr) => {
//             if (error) {
//                 return res.json({ output: stderr || error.message });
//             }
//             res.json({ output: stdout });
//         });
//     });
// });

// module.exports = router;



// routes/compiler.routes.js
const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

router.post('/compile', (req, res) => {
    const { code } = req.body;
    const tempFilePath = path.join(__dirname, '../temp_input.txt');

    try {
        fs.writeFileSync(tempFilePath, code);
    } catch (err) {
        return res.status(500).json({ output: 'Error saving source file.' });
    }

    const isWindows = os.platform() === 'win32';
    const compilerBinary = isWindows ? 'mini_compiler.exe' : 'mini_compiler';
    const compilerPath = path.join(__dirname, '../', compilerBinary);

    // Enclose paths in quotes to safely handle spaces in directory names
    const command = `"${compilerPath}" "${tempFilePath}"`;

    exec(command, { timeout: 5000 }, (error, stdout, stderr) => {
        // Clean up the temporary file afterwards
        if (fs.existsSync(tempFilePath)) {
            try {
                fs.unlinkSync(tempFilePath);
            } catch (e) {
                // Ignore cleanup lock issues if any
            }
        }

        res.json({
            output: stdout + (stderr ? "\n" + stderr : ""),
            exitCode: error ? error.code : 0,
            platform: os.platform()
        });
    });
});

module.exports = router;