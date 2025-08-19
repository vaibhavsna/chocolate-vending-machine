import { Coins, RotateCcw } from "lucide-react";

interface BalanceBarProps {
  balance: number;
  loading: boolean;
  onReset: () => void;
}

export default function BalanceBar({ balance, loading, onReset }: BalanceBarProps) {
  return (
    <div className="flex items-center justify-between bg-green-100 p-4 rounded mb-6 w-full">
      <div className="flex items-center gap-2 text-green-700 font-bold">
        <Coins className="h-5 w-5" />
        Balance: ${(balance / 100).toFixed(2)}
      </div>
      <button
        onClick={onReset}
        disabled={loading}
        className="flex items-center gap-1 px-3 py-1 border rounded text-red-600 hover:bg-red-100"
      >
        <RotateCcw className="h-4 w-4" /> Reset
      </button>
    </div>
  );
}
