require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Connection, PublicKey } = require('@solana/web3.js');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));

// Wallet connection endpoint
app.post('/api/connect-wallet', async (req, res) => {
  try {
    const { publicKey } = req.body;
    // Validate the public key
    new PublicKey(publicKey);
    
    // You can add more wallet validation or user tracking here
    
    res.json({ 
      success: true, 
      address: publicKey,
      message: 'Wallet connected successfully'
    });
  } catch (error) {
    console.error('Wallet connection error:', error);
    res.status(400).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 