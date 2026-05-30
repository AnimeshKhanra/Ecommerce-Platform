import Stripe from "stripe";

// console.log(process.env.STRIPE_SECRET_KEY);
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  // apiVersion: "2025-04-30.basil",
  apiVersion: "2026-04-22.dahlia",
});