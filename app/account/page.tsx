import Link from "next/link";
import { User, Package, MapPin, LogOut } from "lucide-react";

import { Section, Container } from "@/components/craft";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "My Account",
  description: "Manage your account and view orders",
};

export default function AccountPage() {
  // Note: This is a placeholder. In production, you would:
  // 1. Implement authentication (NextAuth, custom JWT, or WooCommerce customer auth)
  // 2. Fetch customer data from WooCommerce API
  // 3. Display personalized information

  return (
    <Section>
      <Container>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold">My Account</h1>
            <p className="text-muted-foreground mt-2">
              Manage your account settings and view orders.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Orders */}
            <Link
              href="/account/orders"
              className="border rounded-lg p-6 hover:bg-accent/50 transition-colors group"
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold group-hover:underline">
                Orders
              </h2>
              <p className="text-muted-foreground mt-1">
                View your order history and track shipments
              </p>
            </Link>

            {/* Addresses */}
            <Link
              href="/account/addresses"
              className="border rounded-lg p-6 hover:bg-accent/50 transition-colors group"
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold group-hover:underline">
                Addresses
              </h2>
              <p className="text-muted-foreground mt-1">
                Manage your billing and shipping addresses
              </p>
            </Link>

            {/* Account Details */}
            <Link
              href="/account/details"
              className="border rounded-lg p-6 hover:bg-accent/50 transition-colors group"
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <User className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold group-hover:underline">
                Account Details
              </h2>
              <p className="text-muted-foreground mt-1">
                Update your profile and password
              </p>
            </Link>
          </div>

          <div className="border-t pt-8">
            <p className="text-muted-foreground mb-4">
              Note: This account section requires authentication to be
              implemented. Consider using NextAuth.js or a custom authentication
              solution with WooCommerce customer endpoints.
            </p>
            <Button variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
