import Link from "next/link";
import { Package, ArrowLeft, ExternalLink } from "lucide-react";

import { Section, Container } from "@/components/craft";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Order History",
  description: "View your order history",
};

// Note: In production, fetch orders from WooCommerce using authenticated customer ID
// For now, this is a placeholder showing the expected UI structure

const mockOrders = [
  {
    id: 1234,
    date: "2024-01-15",
    status: "completed",
    total: "129.99",
    items: 3,
  },
  {
    id: 1235,
    date: "2024-01-10",
    status: "processing",
    total: "79.50",
    items: 2,
  },
  {
    id: 1236,
    date: "2024-01-05",
    status: "on-hold",
    total: "249.00",
    items: 1,
  },
];

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  "on-hold": "bg-orange-100 text-orange-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  refunded: "bg-gray-100 text-gray-800",
  failed: "bg-red-100 text-red-800",
};

export default function OrdersPage() {
  return (
    <Section>
      <Container>
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/account">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Order History</h1>
              <p className="text-muted-foreground">
                View and track your orders
              </p>
            </div>
          </div>

          {mockOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Package className="h-16 w-16 text-muted-foreground/30" />
              <p className="text-muted-foreground">No orders yet</p>
              <Button asChild>
                <Link href="/shop">Start Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {mockOrders.map((order) => (
                <Link
                  key={order.id}
                  href={`/account/orders/${order.id}`}
                  className="block border rounded-lg p-6 hover:bg-accent/50 transition-colors"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-lg">
                          Order #{order.id}
                        </span>
                        <Badge
                          className={statusColors[order.status] || "bg-gray-100"}
                        >
                          {order.status.replace("-", " ")}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Placed on{" "}
                        {new Date(order.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-lg">${order.total}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.items} {order.items === 1 ? "item" : "items"}
                      </p>
                    </div>

                    <ExternalLink className="h-5 w-5 text-muted-foreground" />
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="border-t pt-6">
            <p className="text-sm text-muted-foreground">
              Note: This page requires authentication. Implement customer login
              to fetch real orders from WooCommerce.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
