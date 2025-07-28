require('dotenv').config();
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const routes = require('./routes');
const authRoutes = require('./routes/auth');
const inviteRoutes = require('./routes/invite');
const adminRoutes = require('./routes/admin');
const eventRoutes = require('./routes/events');
const fundraiserRoutes = require('./routes/fundraisers');
const paymentRoutes = require('./routes/payment');
const checkoutRoutes = require('./routes/checkout');
const athleteRoutes = require('./routes/athletes');
const stripeRoutes = require('./routes/stripe');
const coachRoutes = require('./routes/coach');
const ticketRoutes = require('./routes/ticket');
const masterAdminRoutes = require('./routes/masterAdminRoutes');
const duesRoutes = require('./routes/dues');

const app = express();

console.log("✅ Mounting: /api/payments/webhook");
app.use('/api/payments/webhook', require('./routes/stripeRawRoute'));

app.use(cors());
app.use(bodyParser.json());

console.log("✅ Mounting: /api");
app.use('/api', routes);

console.log("✅ Mounting: /api/auth");
app.use('/api/auth', authRoutes);

console.log("✅ Mounting: /api/invite");
app.use('/api/invite', inviteRoutes);

console.log("✅ Mounting: /api/admin");
app.use('/api/admin', adminRoutes);

console.log("✅ Mounting: /api/events");
app.use('/api/events', eventRoutes);

console.log("✅ Mounting: /api/fundraisers");
app.use('/api/fundraisers', fundraiserRoutes);

console.log("✅ Mounting: /api/payments");
app.use('/api/payments', paymentRoutes);

console.log("✅ Mounting: /api/checkout");
app.use('/api/checkout', checkoutRoutes);

console.log("✅ Mounting: /api/athletes");
app.use('/api/athletes', athleteRoutes);

console.log("✅ Mounting: /api/stripe");
app.use('/api/stripe', stripeRoutes);

console.log("✅ Mounting: /api/coach");
app.use('/api/coach', coachRoutes);

console.log("✅ Mounting: /api/tickets");
app.use('/api/tickets', ticketRoutes);

console.log("✅ Mounting: /api/master");
app.use('/api/master', masterAdminRoutes);

console.log("✅ Mounting: /api/dues");
app.use('/api/dues', duesRoutes);

console.log("✅ Mounting: /api/season-tickets");
app.use('/api/season-tickets', require('./routes/seasonRoutes'));

console.log("✅ Mounting: Static React frontend");
const path = require('path');
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

console.log("✅ All routes mounted.");

module.exports = app;
