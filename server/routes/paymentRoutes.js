import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// Health check - hit http://localhost:5000/api/payments/health to verify routes are loaded
router.get("/health", (req, res) => res.json({ ok: true, message: "Payments API is reachable" }));

// Create payment intent (Stripe integration placeholder)
router.post("/create-intent", async (req, res) => {
  try {
    const { amount, restaurant, table, orders } = req.body;

    // In production, integrate with Stripe:
    // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: amount,
    //   currency: 'inr',
    //   metadata: { restaurant, table, orders: JSON.stringify(orders) }
    // });
    // return res.json({ clientSecret: paymentIntent.client_secret, paymentIntentId: paymentIntent.id });

    // For now, return a mock payment intent
    const paymentIntentId = `pi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    res.json({
      paymentIntentId,
      clientSecret: null,
      message: "Payment intent created. Integrate Stripe for production."
    });
  } catch (error) {
    console.error("Payment Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Verify payment and update orders
router.post("/verify", async (req, res) => {
  try {
    const { paymentIntentId, orderIds } = req.body;

    /**
     * PRODUCTION INTEGRATION TIP:
     * Using Stripe? Verify the payment status here:
     * const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
     * if (paymentIntent.status !== 'succeeded') throw new Error('Payment not verified');
     */

    await Order.updateMany(
      { _id: { $in: orderIds } },
      { $set: { status: "Paid" } }
    );

    res.json({ success: true, message: "Payment verified. Orders marked as Paid." });
  } catch (error) {
    console.error("Payment Verification Error:", error);
    res.status(500).json({ message: "Verification failed" });
  }
});

export default router;
