"use client";

// Add this
import { useAuth } from "@crossmint/client-sdk-react-ui";

function User() {
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

function AuthButton() {
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
  );
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
        <AuthButton />
    </main>
  );
}