// server.js
const app = require('./app')
require('events').EventEmitter.defaultMaxListeners = 20

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

const path = require('path');

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../client/build')));

// Catch-all route to serve React index.html on any unmatched route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});
