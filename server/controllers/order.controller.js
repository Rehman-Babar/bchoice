import Order from "../models/order.modal.js";

const CreateOrder = async (req, res) => {
  try {
    const {
      email,
      firstName,
      lastName,
      address,
      city,
      postalCode,
      phone,
      order_items,
      total_amount,
      payment_method,
      shipping_method,
    } = req.body;
    if (
      !email ||
      !firstName ||
      !lastName ||
      !address ||
      !city ||
      !phone ||
      !order_items ||
      !total_amount ||
      !payment_method ||
      !shipping_method
    ) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }
    const newOrder = new Order({
      email: email,
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      postalCode: postalCode, // Postal code is optional
      phone: phone,
      order_items: order_items.map((item) => ({
        item_name: item.item_name,
        quantity: item.quantity,
        price: item.price,
      })),
      total_amount: total_amount,
      payment_method: payment_method,
      shipping_method: shipping_method,
      // shipping_cost: shipping_cost,
    });
    const result = await newOrder.save();
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Failed to create order", error: error.message });
  }
};
export const GetAllOrder = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error getting orders:", error);
    res.status(500).json({ message: "Failed to get orders", error: error.message });
  }
};
export default CreateOrder;
