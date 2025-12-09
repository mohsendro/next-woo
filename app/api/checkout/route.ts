import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/lib/woocommerce";
import type { CreateOrderInput } from "@/lib/woocommerce.d";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.billing?.email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    if (!body.line_items || body.line_items.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty" },
        { status: 400 }
      );
    }

    // Create order in WooCommerce
    const orderData: CreateOrderInput = {
      payment_method: "bacs", // Bank transfer (default)
      payment_method_title: "Direct Bank Transfer",
      set_paid: false,
      billing: body.billing,
      shipping: body.shipping,
      line_items: body.line_items,
      customer_note: body.customer_note,
    };

    const order = await createOrder(orderData);

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        number: order.number,
        status: order.status,
        total: order.total,
      },
    });
  } catch (error) {
    console.error("Checkout error:", error);

    const message =
      error instanceof Error ? error.message : "Failed to create order";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
