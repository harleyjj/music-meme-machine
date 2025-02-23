"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";

export default function TermsAndConditions() {
  const router = useRouter();

  const handleAccept = () => {
    // Handle acceptance logic here
    router.push("/dashboard"); // or wherever you want to redirect
  };

  const handleDecline = () => {
    // Handle decline logic here
    router.push("/"); // redirect to home or show a decline message
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-black"
      style={{ backgroundImage: "url('/gradient-background.jpg')" }}
    >
      <div className="container px-4 py-8 flex-1">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-primary-500">
            Terms and Conditions
          </h1>

          <ScrollArea className="h-[60vh] border rounded-lg p-4 mb-8">
            <div className="space-y-4 text-white">
              <h2 className="text-xl font-semibold">1. Introduction</h2>
              <p className="">
                These Terms and Conditions govern your use of our music sharing
                and token reward platform. By using our service, you agree to
                these terms.
              </p>

              <h2 className="text-xl font-semibold">2. Token Generation</h2>
              <p className="">
                Users can earn tokens through various sharing activities. Token
                generation is subject to fair usage policies and may be adjusted
                or revoked if abuse is detected.
              </p>

              <h2 className="text-xl font-semibold">3. Token Usage</h2>
              <p className="">
                Tokens can be redeemed for merchandise and concert tickets.
                Tokens have no monetary value and cannot be exchanged for cash.
              </p>

              <h2 className="text-xl font-semibold">4. Wallet Services</h2>
              <p className="text-white">
                We may create a wallet on your behalf to store tokens. You are
                responsible for maintaining the security of your wallet
                credentials.
              </p>

              <h2 className="text-xl font-semibold">5. User Conduct</h2>
              <p className="text-white">
                Users must not engage in fraudulent sharing activities or
                attempt to manipulate the token system.
              </p>

              <h2 className="text-xl font-semibold">6. Modifications</h2>
              <p className="text-white">
                We reserve the right to modify these terms at any time.
                Continued use of the service constitutes acceptance of modified
                terms.
              </p>

              <h2 className="text-xl font-semibold">7. Termination</h2>
              <p className="text-white">
                We reserve the right to terminate or suspend accounts that
                violate these terms or engage in fraudulent activities.
              </p>

              <h2 className="text-xl font-semibold">8. Privacy</h2>
              <p className="text-white mb-4">
                Your use of the service is also governed by our Privacy Policy.
                Please review our Privacy Policy to understand our practices.
              </p>
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Fixed button container */}
      <div className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container px-4 py-4">
          <div className="max-w-2xl mx-auto flex gap-4 justify-end">
            <Button
              variant="outline"
              onClick={handleDecline}
              className="w-28 text-white rounded-3xl"
            >
              Decline
            </Button>
            <Button
              onClick={handleAccept}
              className="w-28 rounded-3xl text-black bg-gradient-to-r from-primary-500 to-primary-600"
            >
              Accept
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
