import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createServerSupabaseClient } from "@/lib/supabase-server";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-04-22.dahlia" });
}

export async function POST(req: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.redirect(new URL("/login", req.url));

  let priceId: string | null = null;
  const ct = req.headers.get("content-type") || "";
  if (ct.includes("application/json")) {
    const body = await req.json();
    priceId = body.priceId;
  } else {
    const form = await req.formData();
    priceId = form.get("priceId") as string;
  }

  const creditMap: Record<string, number> = {
    [process.env.NEXT_PUBLIC_STRIPE_PRICE_50 || ""]: 50,
    [process.env.NEXT_PUBLIC_STRIPE_PRICE_200 || ""]: 200,
    [process.env.NEXT_PUBLIC_STRIPE_PRICE_500 || ""]: 500,
  };

  if (!priceId || !creditMap[priceId]) {
    return NextResponse.json({ error: "Invalid price" }, { status: 400 });
  }

  const appUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://propscribe-omega.vercel.app";
  const session = await getStripe().checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: appUrl + "/dashboard?payment=success",
    cancel_url: appUrl + "/dashboard",
    customer_email: user.email,
    metadata: { user_id: user.id, price_id: priceId, credits: String(creditMap[priceId]) },
  });

  return NextResponse.redirect(session.url!, { status: 303 });
}