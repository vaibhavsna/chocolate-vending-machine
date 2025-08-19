import { ShoppingCart, Package } from "lucide-react";
import type { Chocolate } from "@shared/vending";

interface PurchasePanelProps {
  chocolate: Chocolate | null;
  cashInput: string;
  loading: boolean;
  onCashChange: (value: string) => void;
  onPurchase: () => void;
}

export default function PurchasePanel({
  chocolate,
  cashInput,
  loading,
  onCashChange,
  onPurchase,
}: PurchasePanelProps) {
  return (
    <div className="p-4 border rounded-lg h-fit sticky top-4">
      <h2 className="flex items-center gap-2 mb-3 font-bold">
        <ShoppingCart className="h-5 w-5" /> Purchase
      </h2>

      {chocolate ? (
        <>
          <div className="p-3 bg-orange-50 rounded mb-3">
            <h4>{chocolate.name}</h4>
            <p className="text-orange-600 font-bold">${(chocolate.price / 100).toFixed(2)}</p>
          </div>

          <input
            type="number"
            step="0.01"
            min="0"
            placeholder="Insert cash"
            value={cashInput}
            onChange={(e) => onCashChange(e.target.value)}
            className="border p-2 w-full rounded mb-3"
          />

          <button
            onClick={onPurchase}
            disabled={loading || !cashInput}
            className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700"
          >
            {loading ? "Processing..." : "Buy"}
          </button>

          {cashInput && (
            <div className="text-sm text-gray-600 mt-3 space-y-1">
              <div className="flex justify-between">
                <span>Amount:</span> <span>${parseFloat(cashInput).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Price:</span> <span>${(chocolate.price / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Change:</span>
                <span>
                  ${Math.max(0, parseFloat(cashInput) - chocolate.price / 100).toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center text-gray-500 py-6">
          <Package className="h-12 w-12 mx-auto mb-2 opacity-50" />
          Select a chocolate
        </div>
      )}
    </div>
  );
}
