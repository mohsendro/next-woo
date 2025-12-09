import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Section, Container } from "@/components/craft";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: OrderDetailPageProps) {
  const { id } = await params;
  return {
    title: `Order #${id}`,
    description: `View details for order #${id}`,
  };
}

// Note: In production, fetch order from WooCommerce API
// This is a placeholder structure

const mockOrder = {
  id: 1234,
  number: "1234",
  status: "processing",
  date_created: "2024-01-15T10:30:00",
  total: "129.99",
  subtotal: "119.99",
  shipping_total: "10.00",
  tax_total: "0.00",
  payment_method_title: "Credit Card",
  billing: {
    first_name: "John",
    last_name: "Doe",
    email: "john@example.com",
    phone: "555-1234",
    address_1: "123 Main St",
    city: "New York",
    state: "NY",
    postcode: "10001",
    country: "US",
  },
  shipping: {
    first_name: "John",
    last_name: "Doe",
    address_1: "123 Main St",
    city: "New York",
    state: "NY",
    postcode: "10001",
    country: "US",
  },
  line_items: [
    {
      id: 1,
      name: "Sample Product 1",
      quantity: 2,
      price: 49.99,
      total: "99.98",
    },
    {
      id: 2,
      name: "Sample Product 2",
      quantity: 1,
      price: 20.01,
      total: "20.01",
    },
  ],
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  "on-hold": "bg-orange-100 text-orange-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  refunded: "bg-gray-100 text-gray-800",
  failed: "bg-red-100 text-red-800",
};

export default async function OrderDetailPage({
  params,
}: OrderDetailPageProps) {
  const { id } = await params;

  // In production: const order = await getOrder(parseInt(id));

  return (
    <Section>
      <Container>
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/account/orders">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">Order #{id}</h1>
              <Badge className={statusColors[mockOrder.status] || "bg-gray-100"}>
                {mockOrder.status.replace("-", " ")}
              </Badge>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Items */}
              <div className="border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Order Items</h2>
                <div className="space-y-4">
                  {mockOrder.line_items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity} x ${item.price}
                        </p>
                      </div>
                      <p className="font-medium">${item.total}</p>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${mockOrder.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>${mockOrder.shipping_total}</span>
                  </div>
                  {parseFloat(mockOrder.tax_total) > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>${mockOrder.tax_total}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${mockOrder.total}</span>
                  </div>
                </div>
              </div>

              {/* Addresses */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="border rounded-lg p-6">
                  <h3 className="font-bold mb-3">Billing Address</h3>
                  <address className="not-italic text-muted-foreground">
                    {mockOrder.billing.first_name} {mockOrder.billing.last_name}
                    <br />
                    {mockOrder.billing.address_1}
                    <br />
                    {mockOrder.billing.city}, {mockOrder.billing.state}{" "}
                    {mockOrder.billing.postcode}
                    <br />
                    {mockOrder.billing.country}
                    <br />
                    <br />
                    {mockOrder.billing.email}
                    <br />
                    {mockOrder.billing.phone}
                  </address>
                </div>

                <div className="border rounded-lg p-6">
                  <h3 className="font-bold mb-3">Shipping Address</h3>
                  <address className="not-italic text-muted-foreground">
                    {mockOrder.shipping.first_name}{" "}
                    {mockOrder.shipping.last_name}
                    <br />
                    {mockOrder.shipping.address_1}
                    <br />
                    {mockOrder.shipping.city}, {mockOrder.shipping.state}{" "}
                    {mockOrder.shipping.postcode}
                    <br />
                    {mockOrder.shipping.country}
                  </address>
                </div>
              </div>
            </div>

            {/* Order Info Sidebar */}
            <div className="space-y-6">
              <div className="border rounded-lg p-6 space-y-4">
                <h3 className="font-bold">Order Information</h3>

                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Order Date</span>
                    <p className="font-medium">
                      {new Date(mockOrder.date_created).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>
                  </div>

                  <div>
                    <span className="text-muted-foreground">Payment Method</span>
                    <p className="font-medium">
                      {mockOrder.payment_method_title}
                    </p>
                  </div>

                  <div>
                    <span className="text-muted-foreground">Order Number</span>
                    <p className="font-medium">#{mockOrder.number}</p>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="font-bold mb-3">Need Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Have questions about your order? Contact our support team.
                </p>
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <p className="text-sm text-muted-foreground">
              Note: This page shows mock data. Implement authentication and
              fetch real order data from WooCommerce.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
