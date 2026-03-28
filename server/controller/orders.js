const orderModel = require("../models/orders");

class Order {
  async getAllOrders(req, res) {
    try {
      const Orders = await orderModel
        .find({})
        .populate("allProduct.id", "pName pImages pPrice")
        .populate("user", "name email")
        .sort({ _id: -1 });
      return res.json({ Orders });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async getOrderByUser(req, res) {
    const { uId } = req.body;
    if (!uId) return res.json({ error: "All fields are required" });
    try {
      const Order = await orderModel
        .find({ user: uId })
        .populate("allProduct.id", "pName pImages pPrice")
        .populate("user", "name email")
        .sort({ _id: -1 });
      return res.json({ Order });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async postCreateOrder(req, res) {
    const { allProduct, user, amount, transactionId, address, phone } = req.body;
    if (!allProduct || !user || !amount || !transactionId || !address || !phone) {
      return res.json({ error: "All fields are required" });
    }
    try {
      const newOrder = new orderModel({ allProduct, user, amount, transactionId, address, phone });
      const save = await newOrder.save();
      if (save) return res.json({ success: "Order created successfully" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async postUpdateOrder(req, res) {
    const { oId, status } = req.body;
    if (!oId || !status) return res.json({ error: "All fields are required" });
    try {
      await orderModel.findByIdAndUpdate(oId, { status, updatedAt: Date.now() });
      return res.json({ success: "Order updated successfully" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async postDeleteOrder(req, res) {
    const { oId } = req.body;
    if (!oId) return res.json({ error: "All fields are required" });
    try {
      const deleteOrder = await orderModel.findByIdAndDelete(oId);
      if (deleteOrder) return res.json({ success: "Order deleted successfully" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

const ordersController = new Order();
module.exports = ordersController;
