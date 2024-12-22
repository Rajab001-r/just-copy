const express = require('express');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Temporary directory for storing video chunks
const UPLOAD_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR);
}

// Route: Upload a chunk
app.post('/upload', (req, res) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = UPLOAD_DIR;
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.error('Error parsing form:', err);
            return res.status(400).json({ error: 'Error parsing form.' });
        }

        // Log incoming data for debugging
        console.log('Received form data:', fields);
        console.log('Received file:', files.file);

        const { filename, chunkIndex } = fields;
        if (!filename || !chunkIndex) {
            return res.status(400).json({ error: 'Missing filename or chunkIndex' });
        }

        const file = files.file[0];
        const chunkPath = path.join(UPLOAD_DIR, `${filename}.part${chunkIndex}`);

        // Move the uploaded chunk to the right path
        fs.rename(file.filepath, chunkPath, (err) => {
            if (err) {
                console.error('Error moving file:', err);
                return res.status(500).json({ error: 'Error moving file.' });
            }

            console.log(`Uploaded chunk ${chunkIndex} for file ${filename}`);
            res.status(200).json({ message: `Chunk ${chunkIndex} uploaded successfully!` });
        });
    });
});

// Route: Combine chunks into the final video
app.post('/combine', (req, res) => {
    const { filename, totalChunks } = req.body;
    console.log(`Request to combine chunks for file ${filename} with ${totalChunks} chunks`);

    const outputPath = path.join(UPLOAD_DIR, filename);
    const writeStream = fs.createWriteStream(outputPath);

    let currentChunk = 0;

    const pipeNextChunk = () => {
        if (currentChunk >= totalChunks) {
            console.log('All chunks processed, finalizing...');
            writeStream.end();
            return;
        }

        const chunkPath = path.join(UPLOAD_DIR, `${filename}.part${currentChunk}`);
        console.log(`Processing chunk ${currentChunk} at path ${chunkPath}`);

        if (!fs.existsSync(chunkPath)) {
            console.error(`Error: Chunk ${currentChunk} is missing at ${chunkPath}`);
            return res.status(400).json({ error: `Chunk ${currentChunk} is missing.` });
        }

        const readStream = fs.createReadStream(chunkPath);
        readStream.pipe(writeStream, { end: false });

        readStream.on('end', () => {
            fs.unlinkSync(chunkPath); // Clean up chunk
            console.log(`Chunk ${currentChunk} processed successfully.`);
            currentChunk++;
            pipeNextChunk(); // Process next chunk
        });

        readStream.on('error', (err) => {
            console.error(`Error reading chunk ${currentChunk}:`, err);
            res.status(500).json({ error: 'Error processing chunk.', details: err.message });
        });
    };

    pipeNextChunk();

    writeStream.on('finish', () => {
        console.log('File successfully combined.');
        res.status(200).json({ message: 'File combined successfully!' });
    });

    writeStream.on('error', (err) => {
        console.error('Error combining file:', err);
        res.status(500).json({ error: 'Error combining file.', details: err.message });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
