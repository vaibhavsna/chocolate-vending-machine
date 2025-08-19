import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import type {
  Chocolate,
  InventoryResponse,
  PurchaseRequest,
  RestockRequest,
  ResetResponse,
} from "@shared/vending";
import BalanceBar from "@/components/BalanceBar";
import ChocolateCard from "@/components/ChocolateCard";
import PurchasePanel from "@/components/PurchasePanel";

export default function VendingMachine() {
  const [chocolates, setChocolates] = useState<Chocolate[]>([]);
  const [userBalance, setUserBalance] = useState(0);
  const [selectedChocolate, setSelectedChocolate] = useState<Chocolate | null>(null);
  const [cashInput, setCashInput] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchInventory = async () => {
    try {
      const res = await fetch("/api/inventory");
      const data: InventoryResponse = await res.json();
      if (data.success) {
        setChocolates(data.data.chocolates);
        setUserBalance(data.data.userBalance);
      } else {
        toast.error("Failed to load inventory");
      }
    } catch {
      toast.error("Error loading inventory");
    }
  };

  const handlePurchase = async () => {
    if (!selectedChocolate) return toast.error("Please select a chocolate");

    const cash = parseFloat(cashInput);
    if (isNaN(cash) || cash <= 0) return toast.error("Enter valid cash");

    setLoading(true);
    try {
      const req: PurchaseRequest = {
        chocolateId: selectedChocolate.id,
        amountPaid: Math.round(cash * 100),
      };
      const res = await fetch("/api/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req),
      });
      const result = await res.json();
      if (result.success && result.data.success) {
        const change = (result.data.changeReturned || 0) / 100;
        toast.success(`Purchase successful! ${change > 0 ? `Change: $${change.toFixed(2)}` : ""}`);
        setSelectedChocolate(null);
        setCashInput("");
        fetchInventory();
      } else {
        toast.error(result.message || "Purchase failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRestock = async (id: number) => {
    setLoading(true);
    try {
      const res = await fetch("/api/restock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chocolateId: id } as RestockRequest),
      });
      const result = await res.json();
      result.success && result.data.success
        ? toast.success("Restocked!")
        : toast.error(result.message || "Restock failed");
      fetchInventory();
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/reset", { method: "POST" });
      const result: ResetResponse = await res.json();
      if (result.success && result.data?.success) {
        toast.success("Machine reset!");
        setSelectedChocolate(null);
        setCashInput("");
        fetchInventory();
      } else {
        toast.error(result.data?.message || "Reset failed");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🍫 Chocolate Vending Machine</h1>
      <span className="w-4/5 flex flex-col items-center justify-center h-full mx-auto bg-white p-6 rounded-lg shadow-md">
        
        <BalanceBar balance={userBalance} loading={loading} onReset={handleReset} />

        <div className="w-full grid lg:grid-cols-3 gap-6">
          {/* Chocolates */}
          <div className="lg:col-span-2 space-y-4">
            {chocolates.map((choco) => (
              <ChocolateCard
                key={choco.id}
                chocolate={choco}
                selected={selectedChocolate?.id === choco.id}
                loading={loading}
                onSelect={setSelectedChocolate}
                onRestock={handleRestock}
              />
            ))}
          </div>
          <PurchasePanel
            chocolate={selectedChocolate}
            cashInput={cashInput}
            loading={loading}
            onCashChange={setCashInput}
            onPurchase={handlePurchase}
          />
        </div>
      </span>
    </div>
  );
}

