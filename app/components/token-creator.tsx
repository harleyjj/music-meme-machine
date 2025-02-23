import React, { useState } from "react";
import { Connection, Keypair } from "@solana/web3.js";
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
} from "@solana/spl-token";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Solana Connection Setup
const connection = new Connection("http://localhost:8899", "confirmed");

function TokenCreator() {
  const [totalSupply, setTotalSupply] = useState("");
  const [tokenName, setTokenName] = useState(""); // State for token name
  const [mintAddress, setMintAddress] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [balance, setBalance] = useState(0);

  const handleCreateToken = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setMintAddress("");
    setWalletAddress("");

    try {
      // Generate a new wallet (Keypair)
      const wallet = Keypair.generate();
      setWalletAddress(wallet.publicKey.toBase58());

      // Airdrop SOL to the wallet
      const airdropSignature = await connection.requestAirdrop(
        wallet.publicKey,
        2 * 10 ** 9
      ); // 2 SOL
      await connection.confirmTransaction(airdropSignature);

      // Check wallet balance
      const walletBalance = await connection.getBalance(wallet.publicKey);
      setBalance(walletBalance / 10 ** 9); // Convert balance to SOL

      if (walletBalance <= 0) {
        throw new Error("Insufficient funds in the wallet.");
      }

      // Create the new token mint
      const mint = await createMint(
        connection,
        wallet, // Payer of the transaction fees
        wallet.publicKey, // Mint authority
        null, // Freeze authority (optional)
        0 // Decimals
      );

      // Create or retrieve the associated token account for the wallet
      const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        wallet,
        mint,
        wallet.publicKey // Owner of the token account
      );

      // Mint the total supply of tokens to the associated token account
      await mintTo(
        connection,
        wallet, // Payer for the transaction fees
        mint, // Mint address
        tokenAccount.address, // Token account address to receive the tokens
        wallet.publicKey, // Authority to mint tokens
        parseInt(totalSupply) // Total supply (the number of tokens to mint)
      );

      setMintAddress(mint.toBase58());
    } catch (err) {
      console.error(err);
      setError("Error during token creation: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-white">Create a New SPL Token</h2>
      <form onSubmit={handleCreateToken}>
        <div>
          <label className="text-white">
            Token Name:
            <Input
              type="text"
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
              placeholder="Enter token name"
              required
              className="text-white"
            />
          </label>
        </div>
        <div>
          <label className="text-white">
            Total Supply:
            <Input
              type="number"
              value={totalSupply}
              onChange={(e) => setTotalSupply(e.target.value)}
              placeholder="Enter total supply"
              required
              className="text-white"
            />
          </label>
        </div>
        <Button
          className="border border-white text-white mt-2"
          type="submit"
          disabled={loading}
        >
          {loading ? "Deploying..." : "Deploy Token"}
        </Button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {mintAddress && (
        <div className="text-white">
          <h3>Token Created!</h3>
          <p>Mint Address: {mintAddress}</p>
          <p>Wallet Address: {walletAddress}</p>
          <p>Wallet Balance: {balance} SOL</p>
        </div>
      )}
    </div>
  );
}

export default TokenCreator;
