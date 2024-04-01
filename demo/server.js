const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.static('.'));

// Middleware to parse JSON bodies
// app.use(express.json());
app.use(cors()); 

// Route to trigger the muselsl command
app.post('/record', (req, res) => {
  const duration = 1; // or use req.body.duration to make it dynamic
  const command = `muselsl record_direct --duration ${duration}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      res.status(500).send('Error executing muselsl command');
      return;
    }
    console.log(`Recording completed. Output: ${stdout}`);
    console.log(`Recording completed. Output: ${stdout}`);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
