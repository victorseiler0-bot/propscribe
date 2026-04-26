import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createServerSupabaseClient } from "@/lib/supabase-server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

const CREDIT_MAP: Record<string, number> = {
  [process.env.NEXT_PUBLIC_STRIPE_PRICE_50!]: 50,
  [process.env.NEXT_PUBLIC_STRIPE_PRICE_200!]: 200,
  [process.env.NEXT_PUBLIC_STRIPE_PRICE_500!]: 500,
};

export async function POST(req: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Support both JSON and form POST
  let priceId: string | null = null;
  const contentType = req.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const body = await req.json();
    priceId = body.priceId;
  } else {
    const form = await req.formData();
    priceId = form.get("priceId") as string;
  }

  if (!priceId || !CREDIT_MAP[priceId]) {
    return NextResponse.json({ error: "Invalid price" }, { status: 400 });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL!;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${appUrl}/dashboard?payment=success`,
    cancel_url: `${appUrl}/dashboard`,
    customer_email: user.email,
    metadata: {
      user_id: user.id,
      price_id: priceId,
      credits: String(CREDIT_MAP[priceId]),
    },
  });

  return NextResponse.redirect(session.url!, { status: 303 });
}
