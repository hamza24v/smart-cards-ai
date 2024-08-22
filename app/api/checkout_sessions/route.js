import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

const createCheckoutSession = async (req) => {
  const { price_id } = await req.json();
  console.log("price_id:", price_id);
  const params = {
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: "price_1PqLqKRu5fL7KkEU6jYaQweS",
        quantity: 1,
      },
    ],
    success_url: `${req.headers.get(
      "Referer"
    )}result?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.get(
      "Referer"
    )}result?session_id={CHECKOUT_SESSION_ID}`,
  };

  return await stripe.checkout.sessions.create(params);
};

export async function POST(req) {
  try {
    const checkoutSession = await createCheckoutSession(req);
    return NextResponse.json(checkoutSession, { status: 200 });
  } catch (error) {
    console.error("Error creating checkout session:", error.message);
    return new NextResponse(
      JSON.stringify({ error: { message: error.message } }),
      { status: 500 }
    );
  }
}

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const session_id = searchParams.get("session_id");

  try {
    if (!session_id) {
      throw new Error("Session ID is required");
    }

    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

    return NextResponse.json(checkoutSession);
  } catch (error) {
    console.error("Error retrieving checkout session:", error);
    return NextResponse.json(
      { error: { message: error.message } },
      { status: 500 }
    );
  }
}
