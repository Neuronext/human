const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json()); // Needed to parse JSON bodies
app.use(express.static('.'));
app.use(cors());

const recordingStatus = {};

// Route to trigger the muselsl command
app.post('/record', (req, res) => {
  const { duration, filename } = req.body;
  const filepath = path.resolve(__dirname, filename);
  const command = `muselsl record_direct --duration ${duration} --filename ${filepath}`;

  // Initialize status
  recordingStatus[filename] = { status: 'Started', error: null };

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Exec error: ${error}`);
      recordingStatus[filename] = { status: 'Failed', error: stderr };
      return;
    }
    recordingStatus[filename] = { status: 'Completed', error: null };
  });

  res.json({ message: 'Recording has started', filename });
});

// Route to check the status of the recording
app.get('/status/:filename', (req, res) => {
  const filename = req.params.filename;
  if (recordingStatus[filename]) {
    res.json(recordingStatus[filename]);
  } else {
    res.status(404).json({ error: 'No recording found for this filename' });
  }
});

// // Route to trigger the muselsl command
// app.post('/record', (req, res) => {
//   const { duration, filename } = req.body;
//   const filepath = path.resolve(__dirname, filename);
//   const command = `muselsl record_direct --duration ${duration} --filename ${filepath}`;

//   exec(command, (error, stdout, stderr) => {
//     if (error) {
//       console.error(`Exec error: ${error}`);
//       res.status(500).json({ error: `Error executing command: ${stderr}` });
//       return;
//     }
//     res.json({ message: 'Recording completed and saved to CSV', filename });
//   });
// });

// Route to download the CSV file
app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filepath = path.resolve(__dirname, filename);
  if (!fs.existsSync(filepath)) {
    console.error('File not found:', filepath);
    return res.status(404).json({ error: "File not found" });
  }
  res.download(filepath, (err) => {
    if (err) {
      console.error('Error sending file:', err);
      return res.status(500).json({ error: 'Error sending file' });
    }
    // File sent successfully, now delete it
    fs.unlink(filepath, unlinkErr => {
      if (unlinkErr) console.error('Error deleting file:', unlinkErr);
      else console.log('File deleted successfully');
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
