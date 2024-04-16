const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('.'));
app.use(cors());

app.post('/record', (req, res) => {
  const duration = 5;  // Customize this as needed
  const filename = `muse_output_${Date.now()}.csv`;
  const command = `muselsl record_direct --duration ${duration} --filename ${filename}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        res.status(500).json({ error: `Error executing muselsl command: ${error.message}` });
        return;
    }
    console.log(`Recording completed. Output: ${stdout}`);
    res.json({ message: 'Recording completed', filename: filename });
});
});

app.get('/download/:filename', (req, res) => {
  const filepath = path.join(__dirname, req.params.filename);
  res.download(filepath);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});



// const express = require('express');
// const { exec } = require('child_process');
// const cors = require('cors');

// const app = express();
// const port = 3000;

// app.use(express.static('.'));

// // Middleware to parse JSON bodies
// // app.use(express.json());
// app.use(cors()); 

// // Route to trigger the muselsl command
// app.post('/record', (req, res) => {
//   const duration = 1; // or use req.body.duration to make it dynamic
//   const command = `muselsl record_direct --duration ${duration}`;

//   exec(command, (error, stdout, stderr) => {
//     if (error) {
//       console.error(`exec error: ${error}`);
//       res.status(500).send('Error executing muselsl command');
//       return;
//     }
//     console.log(`Recording completed. Output: ${stdout}`);
//   });
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

// document.getElementById('recordMuse').addEventListener('click', () => {
// fetch('http://localhost:3000/record', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({})
// })
// .then(response => response.text())
// .then(data => console.log(data))
// .catch((error) => {
//   console.error('Error:', error);
// });
// });


// document.getElementById('recordMuse').addEventListener('click', function() {
//   const countdownDisplay = document.getElementById('recordMuse');
//   console.log('clicked on record muse')
//   let duration = 5;  // This should match the server-side setting

//   // Start countdown
//   countdownDisplay.innerText = `Recording: ${duration} seconds remaining`;
//   const interval = setInterval(() => {
//       duration -= 1;
//       countdownDisplay.innerText = `Recording: ${duration} seconds remaining`;
//       if (duration <= 0) {
//           clearInterval(interval);
//           countdownDisplay.innerText = 'Recording complete. Downloading...';
//           fetchDownload();
//       }
//   }, 1000);

//   function fetchDownload() {
//       fetch('http://localhost:3000/record', {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json',
//           }
//       })
//       .then(response => response.json())
//       .then(data => {
//         console.log('filename');
//         console.log(data.filename);
//           if (data.filename) {
//               window.location.href = `http://localhost:3000/download/${data.filename}`;
//           }
//       })
//       .catch((error) => {
//           console.error('Error:', error);
//       });
//   }
// });



// document.getElementById('recordMuse').addEventListener('click', function() {
//   const button = this;
//   let duration = 5; // Duration can be dynamically set as needed
//   const filename = `recording_${new Date().toISOString()}.csv`.replace(/:/g, '-');

//   button.innerText = `Recording: ${duration} seconds remaining`;

//   // Start recording immediately
//   fetch('http://localhost:3000/record', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ duration, filename })
//   });

//   const interval = setInterval(() => {
//     duration -= 1;
//     button.innerText = `Recording: ${duration} seconds remaining`;
//     if (duration <= 0) {
//       clearInterval(interval);
//       button.innerText = 'Downloading...';
//       window.location.href = `http://localhost:3000/download/${filename}`;
//     }
//   }, 1000);
// });


// document.getElementById('recordMuse').addEventListener('click', function() {
//   const button = this; // Reference to the button
//   const countdownDisplay = document.getElementById('countdown'); // Ensure this is present in your HTML
  
//   if (!countdownDisplay) {
//     console.error('Countdown display element not found!');
//     return; // Exit if no element found
//   }

//   button.innerText = 'Recording...';
//   let duration = 5;  // Assumed correct duration setting

//   countdownDisplay.innerText = `Recording: ${duration} seconds remaining`;
//   const interval = setInterval(() => {
//     duration -= 1;
//     countdownDisplay.innerText = `Recording: ${duration} seconds remaining`;
//     if (duration <= 0) {
//       clearInterval(interval);
//       countdownDisplay.innerText = 'Recording complete. Downloading...';
//       fetchDownload();
//     }
//   }, 1000);

//   function fetchDownload() {
//     fetch('http://localhost:3000/record', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     })
//     .then(response => response.json())
//     .then(data => {
//       if (data.filename) {
//         window.location.href = `http://localhost:3000/download/${data.filename}`;
//         button.innerText = 'Record Muse';
//         countdownDisplay.innerText = 'Click to record again';
//       }
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//       button.innerText = 'Record Muse';
//       countdownDisplay.innerText = 'Error! Click to retry';
//     });
//   }
// });



// app.get('/download/:filename', (req, res) => {
//   const filename = req.params.filename;
//   const filepath = path.resolve(__dirname, filename);
//   res.download(filepath, () => {
//     fs.unlink(filepath, err => { // Clean up file after sending
//       if (err) console.error('Error deleting file:', err);
//     });
//   });
// });




// const express = require('express');
// const { exec } = require('child_process');
// const cors = require('cors');
// const fs = require('fs');
// const path = require('path');

// const app = express();
// const port = 3000;

// app.use(express.static('.'));
// app.use(cors());

// // Route to trigger the muselsl command
// app.post('/record', (req, res) => {
//   console.log("Received request to /record");
//   const duration = 5; // dynamic handling could be added here
//   const filename = 'output.csv';
//   const command = `muselsl record_direct --duration ${duration} --filename ${filename}`;

//   console.log(`Executing command: ${command}`);
//   exec(command, (error, stdout, stderr) => {
//     if (error) {
//       console.error(`Exec error: ${error}`);
//       console.error(`stderr: ${stderr}`);
//       res.status(500).json({ error: `Error executing command: ${stderr}` });
//       return;
//     }
//     console.log(`Command stdout: ${stdout}`);
//     res.json({ message: 'Recording completed and saved to CSV', filename: filename });
//   });
// });

// // Route to download the CSV file
// app.get('/download/:filename', (req, res) => {
//   const filename = req.params.filename;
//   const filepath = path.resolve(__dirname, filename);
//   console.log('filepath on server side:', filepath);
//   res.download(filepath); // Set the correct path, using __dirname to get the current directory of the script
// });


// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });



// document.getElementById('recordMuse').addEventListener('click', function() {
//   const button = this;
//   let duration = 5; // Set duration as needed
//   const filename = `recording_${new Date().toISOString()}.csv`.replace(/:/g, '-');

//   button.innerText = `Starting recording...`;

//   // Start recording immediately
//   fetch('http://localhost:3000/record', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ duration, filename })
//   })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Failed to start recording');
//     }
//     return response.json(); // Assuming the server sends back a JSON response
//   })
//   .then(data => {
//     button.innerText = `Recording: ${duration} seconds remaining`;
//     const interval = setInterval(() => {
//       duration -= 1;
//       button.innerText = `Recording: ${duration} seconds remaining`;
//       if (duration <= 0) {
//         clearInterval(interval);
//         button.innerText = 'Downloading...';
//         window.location.href = `http://localhost:3000/download/${filename}`;
//       }
//     }, 1000);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//     button.innerText = 'Record Muse'; // Reset the button text
//     clearInterval(interval);
//     alert('Error recording: ' + error.message); // Alert the user
//   });
// });



// document.getElementById('recordMuse').addEventListener('click', function() {
//   const button = this;
//   let duration = 5; // Set duration as needed
//   const filename = `recording_${new Date().toISOString()}.csv`.replace(/:/g, '-');

//   button.innerText = `Starting recording...`;

//   // Start recording immediately
//   fetch('http://localhost:3000/record', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ duration, filename })
//   })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Failed to start recording');
//     }
//     return response.json(); // Assuming the server sends back a JSON response
//   })
//   .then(data => {
//     button.innerText = `Recording: ${duration} seconds remaining`;
//     const interval = setInterval(() => {
//       duration -= 1;
//       button.innerText = `Recording: ${duration} seconds remaining`;
//       if (duration <= 0) {
//         clearInterval(interval);
//         // Check if the file is ready for download
//         fetch(`http://localhost:3000/download/${filename}`)
//         .then(downloadResponse => {
//           if (!downloadResponse.ok) {
//             throw new Error('Failed to download file');
//           }
//           return downloadResponse.blob();
//         })
//         .then(blob => {
//           // Create a link and trigger the download
//           const url = window.URL.createObjectURL(blob);
//           const a = document.createElement('a');
//           a.href = url;
//           a.download = filename;
//           document.body.appendChild(a);
//           a.click();
//           document.body.removeChild(a);
//           button.innerText = 'Record Muse'; // Reset the button text
//         })
//         .catch(downloadError => {
//           console.error('Download Error:', downloadError);
//           button.innerText = 'Record Muse'; // Reset the button text
//           alert('Error downloading file: ' + downloadError.message); // Alert the user
//         });
//       }
//     }, 1000);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//     button.innerText = 'Record Muse'; // Reset the button text
//     clearInterval(interval);
//     alert('Error recording: ' + error.message); // Alert the user
//   });
// });



// document.getElementById('recordMuse').addEventListener('click', function() {
//   const button = this;
//   let duration = 5; // Set duration as needed
//   const filename = `recording_${new Date().toISOString()}.csv`.replace(/:/g, '-');

//   button.innerText = `Starting recording...`;

//   // Start recording immediately
//   fetch('http://localhost:3000/record', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ duration, filename })
//   })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Failed to start recording');
//     }
//     return response.json(); // Assuming the server sends back a JSON response
//   })
//   .then(data => {
//     button.innerText = `Recording: ${duration} seconds remaining`;
//     const interval = setInterval(() => {
//       duration -= 1;
//       button.innerText = `Recording: ${duration} seconds remaining`;
//       if (duration <= 0) {
//         clearInterval(interval);
//         button.innerText = 'Download Ready'; // Optionally, show a different message before download
//         // Trigger the download without navigating away
//         const a = document.createElement('a');
//         a.href = `http://localhost:3000/download/${filename}`;
//         a.style.display = 'none';
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);

//         // Reset the button after a short delay to ensure the download dialog has initiated
//         setTimeout(() => {
//           button.innerText = 'Record Muse';
//         }, 1000);
//       }
//     }, 1000);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//     button.innerText = 'Record Muse'; // Reset the button text
//     clearInterval(interval);
//     alert('Error recording: ' + error.message); // Alert the user
//   });
// });
// app.get('/download/:filename', (req, res) => {
//   const filename = req.params.filename;
//   const filepath = path.resolve(__dirname, filename);
//   res.download(filepath, (err) => {
//     if (err) {
//       console.error('Error sending file:', err);
//     } else {
//       // File sent successfully, now delete it
//       fs.unlink(filepath, unlinkErr => {
//         if (unlinkErr) console.error('Error deleting file:', unlinkErr);
//         else console.log('File deleted successfully');
//       });
//     }
//   });
// });



// document.getElementById('recordMuse').addEventListener('click', function() {
//   const button = this;
//   const filename = `recording_${new Date().toISOString()}.csv`.replace(/:/g, '-');
//   let duration = 5
//   let interval; // Declare interval here to ensure it's accessible in all contexts

//   button.innerText = `Starting recording...`;

//   // Start recording immediately
//   fetch('http://localhost:3000/record', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ duration, filename })
//   })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Failed to start recording');
//     }
//     return response.json(); // Assuming the server sends back a JSON response
//   })
//   .then(data => {
//     button.innerText = `Recording: ${duration} seconds remaining`;
//     interval = setInterval(() => {
//       duration -= 1;
//       button.innerText = `Recording: ${duration} seconds remaining`;
//       if (duration === 0) {
//         clearInterval(interval);
//         button.innerText = 'Preparing download...';
//         // Wait a moment before trying to download to ensure the server is ready
//         setTimeout(() => {
//           fetch(`http://localhost:3000/download/${filename}`)
//           .then(downloadResponse => {
//             if (!downloadResponse.ok) {
//               throw new Error(`Failed to download file: ${downloadResponse.status} ${downloadResponse.statusText}`);
//             }
//             return downloadResponse.blob();
//           })
//           .then(blob => {
//             const url = window.URL.createObjectURL(blob);
//             const a = document.createElement('a');
//             a.href = url;
//             a.download = filename;
//             document.body.appendChild(a);
//             a.click();
//             document.body.removeChild(a);
//             button.innerText = 'Record Muse'; // Reset the button text after download
//           })
//           .catch(downloadError => {
//             console.error('Download Error:', downloadError);
//             button.innerText = 'Record Muse'; // Reset the button text
//             alert('Error downloading file: ' + downloadError.message); // Alert the user
//           });
//         }, 1000);
//       }
//     }, 1000);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//     clearInterval(interval);
//     button.innerText = 'Record Muse'; // Reset the button text on error
//     alert('Error recording: ' + error.message); // Alert the user
//   });
// });



// document.getElementById('recordMuse').addEventListener('click', function() {
//   const button = this;
//   const filename = `recording_${new Date().toISOString()}.csv`.replace(/:/g, '-');
//   let duration = 5;

//   button.innerText = `Starting recording...`;

//   fetch('http://localhost:3000/record', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ duration, filename })
//   })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Failed to start recording');
//     }
//     return response.json(); 
//   })
//   .then(data => {
//     button.innerText = `Recording: ${duration} seconds remaining`;
//     let interval = setInterval(() => {
//       duration -= 1;
//       if (duration >= 0) {
//         button.innerText = `Recording: ${duration} seconds remaining`;
//       }
//       if (duration === 0) {
//         clearInterval(interval);
//         button.innerText = 'Preparing download...';
//         setTimeout(() => downloadFile(filename, button), 1000);
//       }
//     }, 1000);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//     button.innerText = 'Record Muse';
//     alert('Error recording: ' + error.message);
//   });
// });

// function downloadFile(filename, button) {
//   fetch(`http://localhost:3000/download/${filename}`)
//     .then(downloadResponse => {
//       if (!downloadResponse.ok) {
//         throw new Error(`Failed to download file: ${downloadResponse.status} ${downloadResponse.statusText}`);
//       }
//       return downloadResponse.blob();
//     })
//     .then(blob => {
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = filename;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       button.innerText = 'Record Muse';
//     })
//     .catch(downloadError => {
//       console.error('Download Error:', downloadError);
//       button.innerText = 'Record Muse';
//       alert('Error downloading file: ' + downloadError.message);
//     });
// }


// then(data => {
//   button.innerText = `Recording: ${duration} seconds remaining`;
//   let interval = setInterval(() => {
//     duration -= 1;
//     if (duration >= 0) {
//       button.innerText = `Recording: ${duration} seconds remaining`;
//     }
//   button.innerText = `Recording: ${duration} seconds remaining`;
//   let interval = setInterval(() => {
//     duration -= 1;
//     if (duration >= 0) {
//       button.innerText = `Recording: ${duration} seconds remaining`;
//     }
//     if (duration === 0) {
//       clearInterval(interval);
//       checkRecordingStatus(filename, button);
//     }
//   }, 1000);
