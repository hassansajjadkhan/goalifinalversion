require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Load and log routes safely
let routes, authRoutes, inviteRoutes, adminRoutes, eventRoutes, fundraiserRoutes;
let paymentRoutes, checkoutRoutes, athleteRoutes, stripeRoutes, coachRoutes;
let ticketRoutes, masterAdminRoutes, duesRoutes, stripeRawRoute, seasonRoutes;

try {
  console.log("Loading /routes/index.js");
  routes = require('./routes');
  console.log("✅ Loaded /routes/index.js");
} catch (err) {
  console.error("❌ Failed to load /routes/index.js", err);
}

try {
  console.log("Loading /routes/auth.js");
  authRoutes = require('./routes/auth');
  console.log("✅ Loaded /routes/auth.js");
} catch (err) {
  console.error("❌ Failed to load /routes/auth.js", err);
}

try {
  console.log("Loading /routes/invite.js");
  inviteRoutes = require('./routes/invite');
  console.log("✅ Loaded /routes/invite.js");
} catch (err) {
  console.error("❌ Failed to load /routes/invite.js", err);
}

try {
  console.log("Loading /routes/admin.js");
  adminRoutes = require('./routes/admin');
  console.log("✅ Loaded /routes/admin.js");
} catch (err) {
  console.error("❌ Failed to load /routes/admin.js", err);
}

try {
  console.log("Loading /routes/events.js");
  eventRoutes = require('./routes/events');
  console.log("✅ Loaded /routes/events.js");
} catch (err) {
  console.error("❌ Failed to load /routes/events.js", err);
}

try {
  console.log("Loading /routes/fundraisers.js");
  fundraiserRoutes = require('./routes/fundraisers');
  console.log("✅ Loaded /routes/fundraisers.js");
} catch (err) {
  console.error("❌ Failed to load /routes/fundraisers.js", err);
}

try {
  console.log("Loading /routes/payment.js");
  paymentRoutes = require('./routes/payment');
  console.log("✅ Loaded /routes/payment.js");
} catch (err) {
  console.error("❌ Failed to load /routes/payment.js", err);
}

try {
  console.log("Loading /routes/checkout.js");
  checkoutRoutes = require('./routes/checkout');
  console.log("✅ Loaded /routes/checkout.js");
} catch (err) {
  console.error("❌ Failed to load /routes/checkout.js", err);
}

try {
  console.log("Loading /routes/athletes.js");
  athleteRoutes = require('./routes/athletes');
  console.log("✅ Loaded /routes/athletes.js");
} catch (err) {
  console.error("❌ Failed to load /routes/athletes.js", err);
}

try {
  console.log("Loading /routes/stripe.js");
  stripeRoutes = require('./routes/stripe');
  console.log("✅ Loaded /routes/stripe.js");
} catch (err) {
  console.error("❌ Failed to load /routes/stripe.js", err);
}

try {
  console.log("Loading /routes/coach.js");
  coachRoutes = require('./routes/coach');
  console.log("✅ Loaded /routes/coach.js");
} catch (err) {
  console.error("❌ Failed to load /routes/coach.js", err);
}

try {
  console.log("Loading /routes/ticket.js");
  ticketRoutes = require('./routes/ticket');
  console.log("✅ Loaded /routes/ticket.js");
} catch (err) {
  console.error("❌ Failed to load /routes/ticket.js", err);
}

try {
  console.log("Loading /routes/masterAdminRoutes.js");
  masterAdminRoutes = require('./routes/masterAdminRoutes');
  console.log("✅ Loaded /routes/masterAdminRoutes.js");
} catch (err) {
  console.error("❌ Failed to load /routes/masterAdminRoutes.js", err);
}

try {
  console.log("Loading /routes/dues.js");
  duesRoutes = require('./routes/dues');
  console.log("✅ Loaded /routes/dues.js");
} catch (err) {
  console.error("❌ Failed to load /routes/dues.js", err);
}

try {
  console.log("Loading /routes/stripeRawRoute.js");
  stripeRawRoute = require('./routes/stripeRawRoute');
  console.log("✅ Loaded /routes/stripeRawRoute.js");
} catch (err) {
  console.error("❌ Failed to load /routes/stripeRawRoute.js", err);
}

try {
  console.log("Loading /routes/seasonRoutes.js");
  seasonRoutes = require('./routes/seasonRoutes');
  console.log("✅ Loaded /routes/seasonRoutes.js");
} catch (err) {
  console.error("❌ Failed to load /routes/seasonRoutes.js", err);
}

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route mounts
if (stripeRawRoute) app.use('/api/payments/webhook', stripeRawRoute);
if (routes) app.use('/api', routes);
if (authRoutes) app.use('/api/auth', authRoutes);
if (inviteRoutes) app.use('/api/invite', inviteRoutes);
if (adminRoutes) app.use('/api/admin', adminRoutes);
if (eventRoutes) app.use('/api/events', eventRoutes);
if (fundraiserRoutes) app.use('/api/fundraisers', fundraiserRoutes);
if (paymentRoutes) app.use('/api/payments', paymentRoutes);
if (checkoutRoutes) app.use('/api/checkout', checkoutRoutes);
if (athleteRoutes) app.use('/api/athletes', athleteRoutes);
if (stripeRoutes) app.use('/api/stripe', stripeRoutes);
if (coachRoutes) app.use('/api/coach', coachRoutes);
if (ticketRoutes) app.use('/api/tickets', ticketRoutes);
if (masterAdminRoutes) app.use('/api/master', masterAdminRoutes);
if (duesRoutes) app.use('/api/dues', duesRoutes);
if (seasonRoutes) app.use('/api/season-tickets', seasonRoutes);

// Serve frontend build
console.log("✅ Mounting static frontend");
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

console.log("✅ App.js fully loaded and routes mounted");

module.exports = app;

