// server/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./config/database');
const User = require('./models/User');
const Image = require('./models/Image');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Sync Database
sequelize.sync()
    .then(() => console.log("MySQL database synced"))
    .catch((error) => console.error("Database sync error:", error));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/images', require('./routes/images'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
