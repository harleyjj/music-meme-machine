import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@crossmint/client-sdk-react-ui";
import {
  Music,
  Ticket,
  Wallet,
  Share2,
  Radio,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

export default function CampaignPage() {
  const User = () => {
    const { user } = useAuth();

    if (!user) {
        return <div>Loading user...</div>;
    }

    return (
        <div>
            <h1>User</h1>
            <p>User ID: {user.userId}</p>
            <p>Email: {user.email}</p>
            <p>Phone Number: {user.phoneNumber}</p>
            <p>Google Name: {user.google?.name}</p>
            <p>Google Picture: {user.google?.picture}</p>
            <p>Farcaster FID: {user.farcaster?.fid}</p>
            <p>Farcaster Username: {user.farcaster?.username}</p>
            <p>Farcaster Bio: {user.farcaster?.bio}</p>
            <p>Farcaster Display Name: {user.farcaster?.displayName}</p>
            <p>Farcaster PFP URL: {user.farcaster?.pfpUrl}</p>
            <p>Farcaster Custody: {user.farcaster?.custody}</p>
            <p>Farcaster Verifications: {user.farcaster?.verifications}</p>
        </div>
    );
}

const AuthButton =() => {
  const { login, logout, user, jwt } = useAuth();

  return (
    <div className="flex gap-4">
      {user == null ? (
        <button
          type="button"
          onClick={login}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      ) : (
        <button
          type="button"
          onClick={logout}
          className="bg-black text-white font-bold py-2 px-4 rounded border-2 border-blue-500"
        >
          Logout
        </button>
      )}
      <User/>
    </div>
  )}

  return (
    <div
      className="min-h-full bg-cover bg-center"
      style={{ backgroundImage: "url('/gradient-background.jpg')" }}
    >
      {/* Hero Section */}
      <section className="container px-4 py-16 md:py-24 lg:py-32">
        <div className="mx-auto max-w-[800px] text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-primary-500 to-primary-600 text-transparent bg-clip-text">
            Share Music, Earn Rewards
          </h1>
          <p className="mb-4 text-xl text-white">
            Support your favorite artists and earn tokens for exclusive rewards
          </p>
          <Link
            href="/artist-signup"
            className="inline-flex items-center text-white hover:text-white/75 transition-colors gap-1.5"
          >
            <span className="underline underline-offset-4">
              I&apos;m an artist myself and I want my own AI to promote my music
              for me
            </span>
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Rest of the component remains the same */}
      {/* Token Generation Section */}
      <section className="container px-4 py-16">
        <h2 className="mb-8 text-center text-primary-500 text-3xl font-bold">
          Ways to Generate Tokens
        </h2>
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
          <Card className="flex flex-col items-center p-6 text-center bg-transparent">
            <div className="mb-4 rounded-full border border-white p-3">
              <Music className="h-6 w-6 text-white" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-white">
              Share Album
            </h3>
            <p className="mb-4 text-white">
              Share your favorite albums with friends
            </p>
            <div className="mt-auto text-2xl font-bold text-white">
              5 Tokens
            </div>
          </Card>

          <Card className="flex flex-col items-center p-6 text-center bg-transparent">
            <div className="mb-4 rounded-full border border-white p-3">
              <Share2 className="h-6 w-6 text-white" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-white">
              Share Song
            </h3>
            <p className="mb-4 text-white">Spread individual tracks you love</p>
            <div className="mt-auto text-2xl font-bold text-white">
              5 Tokens
            </div>
          </Card>

          <Card className="flex flex-col items-center p-6 text-center bg-transparent">
            <div className="mb-4 rounded-full border border-white p-3">
              <Radio className="h-6 w-6 text-white" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-white">
              Share Live Show
            </h3>
            <p className="mb-4 text-white">
              Promote upcoming live performances
            </p>
            <div className="mt-auto text-2xl font-bold text-white">
              10 Tokens
            </div>
          </Card>
        </div>
      </section>

      {/* Token Spending Section */}
      <section className="container px-4 py-16">
        <h2 className="mb-8 text-center text-3xl font-bold text-primary-500">
          Spend Your Tokens
        </h2>
        <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
          <Card className="p-6 bg-transparent">
            <div className="mb-4 flex items-center gap-4">
              <div className="rounded-full border border-white p-3">
                <Ticket className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                Concert Tickets
              </h3>
            </div>
            <p className="text-white">
              Use your tokens to get exclusive access to concert tickets before
              they go on sale
            </p>
          </Card>

          <Card className="p-6 bg-transparent">
            <div className="mb-4 flex items-center gap-4">
              <div className="rounded-full border border-white p-3">
                <Share2 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Merchandise</h3>
            </div>
            <p className="text-white">
              Redeem tokens for exclusive artist merchandise and collectibles
            </p>
          </Card>
        </div>
      </section>

      {/* Wallet Section */}
      <section className="container px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-gradient-to-r from-primary-500 to-primary-600 p-4">
              <Wallet className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-primary-500">
            Your Token Wallet
          </h2>
          <p className="mb-8 text-xl text-white">
            Connect your existing wallet or we&apos;ll automatically create a
            new one for you to store your earned tokens securely
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 py-16">
        <div className="mx-auto max-w-md text-center">
          <Button
            size="lg"
            className="w-full text-lg text-black bg-gradient-to-r from-primary-500 to-primary-600 rounded-3xl"
          >
            Understood, Let&apos;s Get Started
          </Button>
        </div>
      </section>
      </div>
  );
}