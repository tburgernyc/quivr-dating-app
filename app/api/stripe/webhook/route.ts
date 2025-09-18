import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest){
  const sig = req.headers.get('stripe-signature')!
  const payload = await req.text()
  let event: Stripe.Event
  try{
    event = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' as any })
      .webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  }catch(err:any){
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 })
  }
  // TODO: map Stripe customer to user.id and set profiles.plan = 'plus'
  return NextResponse.json({ received: true })
}

export const config = { api: { bodyParser: false } } as any
