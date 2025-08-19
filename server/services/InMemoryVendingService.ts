export interface Chocolate {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface PurchaseResult {
  success: boolean;
  message: string;
  chocolate?: Chocolate;
  amountPaid?: number;
  changeReturned?: number;
  remainingBalance?: number;
}

export interface InventoryData {
  chocolates: Chocolate[];
  userBalance: number;
}


let chocolates: Chocolate[] = [
  { id: 1, name: 'Toblerone', price: 500, quantity: 10 },
  { id: 2, name: 'Snickers Pack', price: 800, quantity: 10 },
  { id: 3, name: 'Ferrero', price: 1500, quantity: 10 }
];

let userBalance = 20000; 

export class InMemoryVendingService {
  async getInventory(): Promise<InventoryData> {
    return {
      chocolates: [...chocolates],
      userBalance
    };
  }

  async purchaseChocolate(chocolateId: number, amountPaid: number): Promise<PurchaseResult> {
  
    const chocolate = chocolates.find(c => c.id === chocolateId);
    
    if (!chocolate) {
      return { success: false, message: 'Chocolate not found' };
    }

    if (chocolate.quantity <= 0) {
      return { success: false, message: 'Chocolate is out of stock' };
    }

    if(userBalance < chocolate.price) {
      return {
        success: false,
        message: `Insufficient balance. Current balance: $${(userBalance / 100).toFixed(2)}, Required: $${(chocolate.price / 100).toFixed(2)}`
      };
    }

   
    if (amountPaid < chocolate.price) {
      return { 
        success: false, 
        message: `Insufficient payment. Required: $${(chocolate.price / 100).toFixed(2)}, Provided: $${(amountPaid / 100).toFixed(2)}` 
      };
    }

   
    const changeReturned = amountPaid - chocolate.price;
    const newBalance = userBalance - chocolate.price;

  
    chocolate.quantity -= 1;
    userBalance = newBalance;

    return {
      success: true,
      message: 'Purchase successful',
      chocolate: { ...chocolate },
      amountPaid,
      changeReturned,
      remainingBalance: newBalance
    };
  }

  async restockChocolate(chocolateId: number): Promise<{ success: boolean; message: string; chocolate?: Chocolate }> {
    const chocolate = chocolates.find(c => c.id === chocolateId);
    
    if (!chocolate) {
      return { success: false, message: 'Chocolate not found' };
    }

   
    if (chocolate.quantity >= 10) {
      return { success: false, message: 'Chocolate is already at maximum stock (10 pieces)' };
    }

   
    chocolate.quantity = 10;

    return {
      success: true,
      message: 'Chocolate restocked successfully',
      chocolate: { ...chocolate }
    };
  }

  async getUserBalance(): Promise<number> {
    return userBalance;
  }

  async resetMachine(): Promise<{ success: boolean; message: string }> {
  
    chocolates = [
      { id: 1, name: 'Toblerone', price: 500, quantity: 10 },
      { id: 2, name: 'Snickers Pack', price: 800, quantity: 10 },
      { id: 3, name: 'Ferrero', price: 1500, quantity: 10 }
    ];

   
    userBalance = 20000;

    return {
      success: true,
      message: 'Vending machine reset to initial state successfully'
    };
  }
}
