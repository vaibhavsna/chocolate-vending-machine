interface StockBadgeProps {
  quantity: number;
}

export default function StockBadge({ quantity }: StockBadgeProps) {
  return (
    <span
      className={`inline-block px-2 py-1 rounded-full text-xs font-semibold
        ${quantity > 5 ? "bg-blue-600 text-white" :
          quantity > 0 ? "bg-gray-200 text-gray-800" :
          "bg-red-500 text-white"}`}
    >
      {quantity} in stock
    </span>
  );
}
