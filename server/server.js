

const app = require('./app'); // Your Express app from app.js
require('events').EventEmitter.defaultMaxListeners = 20;

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
