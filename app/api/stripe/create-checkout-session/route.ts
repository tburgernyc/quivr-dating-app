import Stripe from 'stripe'
import { NextResponse } from 'next/server'

export async function POST(){
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' as any })
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: process.env.STRIPE_PRICE_ID_PLUS!, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/plus?status=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/plus?status=cancel`,
  })
  return NextResponse.json({ url: session.url })
}
