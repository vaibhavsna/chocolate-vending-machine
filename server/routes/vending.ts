import { RequestHandler } from 'express';
import { InMemoryVendingService } from '../services/InMemoryVendingService';

const Service = new InMemoryVendingService();

const isDatabaseConfigured = !!process.env.DATABASE_URL;
const activeService = Service;

export const getInventory: RequestHandler = async (req, res) => {
  try {
    const inventory = await activeService.getInventory();
    res.json({
      success: true,
      data: inventory,
      usingFallback: !isDatabaseConfigured
    });
  } catch (error) {
    console.error('Error in getInventory:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve inventory'
    });
  }
};

export const purchaseChocolate: RequestHandler = async (req, res) => {
  try {
    const chocolateId = Number(req.body?.chocolateId);
    const amountPaid  = Number(req.body?.amountPaid);
    if (!Number.isInteger(chocolateId) || chocolateId <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid chocolate ID'
      });
    }

    if (!Number.isFinite(amountPaid) || amountPaid <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid amount paid'
      });
    }

    const result = await activeService.purchaseChocolate(chocolateId, amountPaid);

    if (result.success) {
      res.json({
        success: true,
        data: result
      });
    } else {
      res.status(400).json({
        success: false,
        message: result.message
      });
    }
  } catch (error) {
    console.error('Error in purchaseChocolate:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process purchase'
    });
  }
};

export const restockChocolate: RequestHandler = async (req, res) => {
  try {
    const { chocolateId } = req.body;

    if (!chocolateId || typeof chocolateId !== 'number') {
      return res.status(400).json({
        success: false,
        message: 'Invalid chocolate ID'
      });
    }

    const result = await activeService.restockChocolate(chocolateId);

    if (result.success) {
      res.json({
        success: true,
        data: result
      });
    } else {
      res.status(400).json({
        success: false,
        message: result.message
      });
    }
  } catch (error) {
    console.error('Error in restockChocolate:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to restock chocolate'
    });
  }
};

export const getUserBalance: RequestHandler = async (req, res) => {
  try {
    const balance = await activeService.getUserBalance();
    res.json({
      success: true,
      data: { balance }
    });
  } catch (error) {
    console.error('Error in getUserBalance:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve user balance'
    });
  }
};

export const resetMachine: RequestHandler = async (req, res) => {
  try {
    const result = await activeService.resetMachine();

    if (result.success) {
      res.json({
        success: true,
        data: result
      });
    } else {
      res.status(400).json({
        success: false,
        message: result.message
      });
    }
  } catch (error) {
    console.error('Error in resetMachine:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reset vending machine'
    });
  }
};
