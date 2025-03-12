import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import { calcPrices } from '../utils/calcPrices.js';

/**
 * Adds order items to the database.
 *******************************************************************************
 * @desc - Adds order items to the database.
 * @route - POST /api/orders
 * @access - Private
 ********************************************************************************
 */
const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items!');
  } else {
    /**
     * NOTE: here we must assume that the prices from our client are incorrect.
     * We must only trust the price of the item as it exists in our database.
     * This prevents a user paying whatever they want by hacking our client.
     */
    const itemsFromDb = await Product.find({
      _id: { $in: orderItems.map((x) => x._id) },
    });

    // Map over the items and use only the price from the database.
    const dbOrderItems = orderItems.map((itemFromClient) => {
      const matchingItemFromDb = itemsFromDb.find(
        (itemFromDb) => itemFromDb._id.toString() === itemFromClient._id
      );
      return {
        ...itemFromClient,
        product: itemFromClient._id,
        price: matchingItemFromDb.price,
        _id: undefined,
      };
    });

    // Calculate the prices.
    const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
      calcPrices(dbOrderItems);

    const order = new Order({
      orderItems: dbOrderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

/**
 * Get user order items from the database.
 *******************************************************************************
 * @desc - Gets user order items from the database.
 * @route - GET /api/orders/myorders
 * @access - Private
 ********************************************************************************
 */
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

/**
 * Get order by id.
 *******************************************************************************
 * @desc - Gets a order by id.
 * @route - GET /api/orders/:id
 * @access - Private
 ********************************************************************************
 */
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found!');
  }
});

/**
 * Update order to paid.
 *******************************************************************************
 * @desc - Updates the order to paid.
 * @route - PUT /api/orders/:id/pay
 * @access - Private
 ********************************************************************************
 */
const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send('Update order to paid');
});

/**
 * Update order to delivered.
 *******************************************************************************
 * @desc - Updates the order to delivered.
 * @route - GET /api/orders/:id/deliver
 * @access - Private/Admin
 ********************************************************************************
 */
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send('Update order to delivered');
});

/**
 * Get all orders.
 *******************************************************************************
 * @desc - Gets all orders.
 * @route - GET /api/orders
 * @access - Private/Admin
 ********************************************************************************
 */
const getOrders = asyncHandler(async (req, res) => {
  res.send('Get orders');
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
