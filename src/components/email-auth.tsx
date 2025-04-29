import { useState } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useChains } from "wagmi";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { encodeFunctionData } from "viem";
import { CONSTANT_ADDRESSES, LEGACY_ABI } from "@/data/addresses-data";
import { toast } from "sonner";
import { SupportChainId } from "@/hooks/use-query-commemes";
import { TransactionToast } from "./ui/transaction-toast";
import { useWalletClient } from "wagmi";
import { supabase } from "@/lib/supabase";

export default function EmailAuth() {
  const [email, setEmail] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [selectedChain, setSelectedChain] = useState(1301);
  const chains = useChains();
  const chainsIds = chains.map((chain) => chain.id);
  const { data: wallet } = useWalletClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) throw error;
      setIsVerified(true);
      toast.success("Check your email for the verification link!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!wallet) {
      toast.error("Please connect your wallet");
      return;
    }

    try {
      const rawData = encodeFunctionData({
        abi: LEGACY_ABI,
        functionName: "getBack",
        args: [wallet.account.address],
      });

      const addresses = CONSTANT_ADDRESSES[selectedChain as SupportChainId];
      
      const res = await fetch(`${import.meta.env.VITE_RELAY}/transaction`, {
        body: JSON.stringify({
          to: addresses.legacyAddress,
          data: rawData,
          value: 0,
          chainId: selectedChain,
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseJson = (await res.json()) as unknown as {
        hash: string;
      };

      toast.success(
        <TransactionToast
          hash={responseJson.hash}
          title="UBI Received"
          scanner={`${addresses.scanner}/tx/`}
        />
      );
    } catch (error) {
      toast.error("Error receiving UBI");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-12 px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white shadow-lg rounded-lg p-8">
        <div className="text-center">
          <Label className="text-2xl font-semibold text-gray-800 mb-4">
            UBI for Indian Citizens Powered by Commeme
          </Label>
          <p className="text-gray-600">
            Login with Email to receive UBI (Universal Basic Income)
          </p>
        </div>

        {!isVerified ? (
          <form onSubmit={handleEmailSubmit} className="mt-6 space-y-4">
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Verification Link'}
            </Button>
          </form>
        ) : (
          <div className="mt-6 space-y-4">
            <p className="text-green-600 font-medium">✅ Email Verified</p>

            <div className="space-y-2">
              <Label className="font-medium text-gray-700">
                Select Blockchain (It's gasless to receive)
              </Label>
              <RadioGroup
                className="space-y-2"
                defaultValue={selectedChain.toString()}
                onValueChange={(e) => setSelectedChain(parseFloat(e))}
              >
                <div className="flex items-center">
                  <RadioGroupItem value={`${chainsIds[0]}`} id="option-one" />
                  <Label
                    htmlFor="option-one"
                    className="ml-2 text-gray-700 font-medium"
                  >
                    UnichainSepolia
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
              onClick={handleVerify}
            >
              Receive UBI
            </Button>
          </div>
        )}
      </div>
    </div>
  );
} 