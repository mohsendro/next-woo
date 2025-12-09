import Link from "next/link";
import { CheckCircle } from "lucide-react";

import { Section, Container } from "@/components/craft";
import { Button } from "@/components/ui/button";

interface SuccessPageProps {
  searchParams: Promise<{ order?: string }>;
}

export default async function CheckoutSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const { order: orderId } = await searchParams;

  return (
    <Section>
      <Container>
        <div className="flex flex-col items-center justify-center py-12 space-y-6 text-center">
          <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Thank you for your order!</h1>
            <p className="text-muted-foreground max-w-md">
              Your order has been placed successfully. We&apos;ll send you an
              email confirmation shortly.
            </p>
          </div>

          {orderId && (
            <div className="bg-muted px-6 py-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Order Number</p>
              <p className="text-2xl font-bold">#{orderId}</p>
            </div>
          )}

          <div className="flex gap-4">
            <Button asChild>
              <Link href="/shop">Continue Shopping</Link>
            </Button>
            {orderId && (
              <Button variant="outline" asChild>
                <Link href={`/account/orders/${orderId}`}>View Order</Link>
              </Button>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
