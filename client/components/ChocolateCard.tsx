import { RefreshCw } from "lucide-react";
import StockBadge from "./StockBadge";
import type { Chocolate } from "@shared/vending";

interface ChocolateCardProps {
  chocolate: Chocolate;
  selected: boolean;
  loading: boolean;
  onSelect: (choco: Chocolate) => void;
  onRestock: (id: number) => void;
}

export default function ChocolateCard({ chocolate, selected, loading, onSelect, onRestock }: ChocolateCardProps) {
  return (
    <div
      onClick={() => chocolate.quantity > 0 && onSelect(chocolate)}
      className={`p-4 border rounded-lg cursor-pointer flex justify-between items-center
        ${selected ? "border-orange-500 bg-orange-50" : ""}
        ${chocolate.quantity === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <div>
        <h3 className="font-semibold">{chocolate.name}</h3>
        <p className="text-orange-600 font-bold">${(chocolate.price / 100).toFixed(2)}</p>
      </div>
      <div className="text-right">
        <StockBadge quantity={chocolate.quantity} />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRestock(chocolate.id);
          }}
          disabled={loading || chocolate.quantity >= 10}
          className="block w-full mt-2 text-sm border px-2 py-1 rounded hover:bg-gray-100"
        >
          <RefreshCw className="h-4 w-4 inline mr-1" /> Restock
        </button>
      </div>
    </div>
  );
}
