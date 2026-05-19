import { NextResponse } from "next/server";

interface OrderRequest {
  amount: number;
  currency?: string;
  receipt?: string;
}

export async function POST(request: Request) {
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return NextResponse.json(
      { error: "Razorpay environment variables are not configured." },
      { status: 500 }
    );
  }

  const body = (await request.json()) as OrderRequest;
  const amount = Number(body.amount);

  if (!Number.isFinite(amount) || amount < 1) {
    return NextResponse.json(
      { error: "A valid amount is required." },
      { status: 400 }
    );
  }

  const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: Math.round(amount * 100),
      currency: body.currency ?? "INR",
      receipt: body.receipt ?? `banglakart_${Date.now()}`,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      { error: data.error?.description ?? "Unable to create Razorpay order." },
      { status: response.status }
    );
  }

  return NextResponse.json(data);
}
