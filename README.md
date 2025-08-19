# 🍫 Chocolate Vending Machine

A full-stack web application that simulates a chocolate vending machine. Users can buy chocolates using cash and restock inventory. Built with React, Node.js, Express, TypeScript, and in Memory storage.

## 🎯 Features

- **Buy Chocolate**: Select chocolates, insert cash, get change
- **View Inventory**: See available stock and remaining balance
- **Restock**: Replenish chocolate inventory (max 10 pieces per item)
- **Real-time Updates**: Inventory and balance update instantly
- **Modern UI**: Clean, responsive design with toast notifications

## 🛠 Tech Stack

**Frontend:**
- React 18 with TypeScript
- Vite for build tooling
- TailwindCSS for styling

**Backend:**
- Node.js with Express
- TypeScript
- RESTful API design

## 📦 Initial Setup

**Stock Inventory:**
- Toblerone: $5.00 (10 pieces)
- Snickers Pack: $8.00 (10 pieces)  
- Ferrero: $15.00 (10 pieces)

**User Balance:** $200.00

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vending-machine
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory.

4. **Start the development server**
   ```bash
   npm dev
   ```

   The application will be available at `http://localhost:8080`

## 📚 API Documentation

### Base URL: `/api`

#### Get Inventory
- **GET** `/inventory`
- Returns all chocolates and user balance
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "chocolates": [
        {
          "id": 1,
          "name": "Toblerone",
          "price": 500,
          "quantity": 10
        }
      ],
      "userBalance": 20000
    }
  }
  ```

#### Purchase Chocolate
- **POST** `/purchase`
- **Body:**
  ```json
  {
    "chocolateId": 1,
    "amountPaid": 500
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "success": true,
      "message": "Purchase successful",
      "changeReturned": 0,
      "remainingBalance": 19500
    }
  }
  ```

#### Restock Chocolate
- **POST** `/restock`
- **Body:**
  ```json
  {
    "chocolateId": 1
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "success": true,
      "message": "Chocolate restocked successfully"
    }
  }
  ```

#### Get User Balance
- **GET** `/balance`
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "balance": 20000
    }
  }
  ```

## 🏗 Architecture

### Project Structure
```
├── client/              # React frontend
│   ├── components/ui/   # Reusable UI components
│   ├── pages/          # Page components
│   └── App.tsx         # Main app component
├── server/             # Express backend
│   ├���─ config/         # Database configuration
│   ├── routes/         # API route handlers
│   └── services/       # Business logic
├── shared/             # Shared TypeScript types
└── README.md
```

### Database Schema

**chocolates**
- `id` (SERIAL PRIMARY KEY)
- `name` (VARCHAR)
- `price` (INTEGER) - Price in cents
- `quantity` (INTEGER)

**user_balance**
- `id` (SERIAL PRIMARY KEY)
- `balance` (INTEGER) - Balance in cents

**transactions**
- `id` (SERIAL PRIMARY KEY)
- `chocolate_id` (INTEGER)
- `amount_paid` (INTEGER)
- `change_returned` (INTEGER)

## 💡 Design Decisions & Assumptions

1. **Currency**: All monetary values stored in cents to avoid floating-point precision issues
2. **Single User**: Application assumes one user for simplicity
3. **Maximum Stock**: Each chocolate type can hold maximum 10 pieces
4. **Change Calculation**: System automatically calculates and returns change
5. **Persistence**: All data persists in PostgreSQL database
6. **Error Handling**: Comprehensive validation for all user inputs
7. **Real-time Updates**: Frontend refreshes inventory after each transaction

## 🔒 Business Rules

- Users cannot purchase with insufficient funds
- Cannot buy chocolate that's out of stock
- Restocking brings quantity to maximum (10 pieces)
- User balance decreases by chocolate price (not the amount paid)
- Change is calculated and displayed to user
- All transactions are logged for audit purposes

## 🐛 Error Handling

The application handles various error scenarios:
- Invalid chocolate selection
- Insufficient payment
- Out of stock items
- Database connection issues
- Invalid API requests

## 🚀 Deployment

The application can be deployed to various platforms:
- **Vercel/Netlify**: For the frontend
- **Railway/Render**: For the full-stack application
- **Docker**: Containerized deployment

For PostgreSQL hosting, consider:
- **Neon**: Serverless PostgreSQL
- **Supabase**: PostgreSQL with additional features
- **Railway**: Integrated PostgreSQL hosting

## 📝 Development Notes

- Built following SOLID principles
- Clean separation of concerns
- Type-safe API communication
- Comprehensive error handling
- Modern React patterns with hooks
- RESTful API design
- Database transactions for data integrity

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
