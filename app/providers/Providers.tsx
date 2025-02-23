"use client";

import { CrossmintProvider, CrossmintAuthProvider } from "@crossmint/client-sdk-react-ui";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CrossmintProvider apiKey={process.env.NEXT_PUBLIC_CROSSMINT_API_KEY ?? ""}>
      <CrossmintAuthProvider
        loginMethods={["email", "google", "farcaster", "web3", "twitter"]} // Only show email, Google, and Farcaster login methods
        authModalTitle="Meme Away for Tokens!"
        termsOfServiceText={
            <p>
                By continuing, you agree to our <a href="/terms">Terms of Service</a> and{" "}
                <a href="/privacy">Privacy Policy</a>
            </p>
        }
        appearance={{
            spacingUnit: "8px",
            borderRadius: "12px",
            colors: {
                inputBackground: "#fffdf9",
                buttonBackground: "#fffaf2",
                border: "#835911",
                background: "#FAF5EC",
                textPrimary: "#5f2c1b",
                textSecondary: "#835911",
                textLink: "#1400cb",
                danger: "#ff3333",
                accent: "#602C1B",
            },
        }}
      >
        {children}
      </CrossmintAuthProvider>
    </CrossmintProvider>
  );
}