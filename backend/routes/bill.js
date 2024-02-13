const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');

// GET route to fetch invoice details by ID
router.get('/:id', async (req, res) => {
    try {
        const invoice = await Invoice.findOne({ InvoiceId: req.params.id });
        if (!invoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }
        // Send the invoice as JSON response
        res.json({ invoice });
    } catch (error) {
        console.error('Error fetching invoice:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST route to create invoice
router.post('/bill', async (req, res) => {
  try {
    // Code to create invoice
    const newInvoice = new Invoice({
      // Populate with required fields from req.body
    });
    const savedInvoice = await newInvoice.save();
    res.status(201).json({ message: 'Invoice created successfully', invoiceId: savedInvoice.id });
  } catch (error) {
    console.error('Error creating invoice:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;