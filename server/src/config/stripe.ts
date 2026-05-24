import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  // apiVersion: "2025-04-30.basil",
  apiVersion: "2026-04-22.dahlia",
});