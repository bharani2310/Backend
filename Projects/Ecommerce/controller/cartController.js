import Cart from "../models/cartModel.js";

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { userId, productId, name, price, quantity, imageBase64 } = req.body;

    // console.log("id  ... ", userId, productId, name, price, quantity)

    let cartItem = await Cart.findOne({ userId, productId });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({
        userId,
        productId,
        name,
        price,
        quantity,
        imageBase64
      });
    }
 
    res.status(200).json({ message: "Item added to cart", cartItem });
  } catch (error) {
    // console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get user's cart items
export const getCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    const cartItems = await Cart.find({ userId });

    if (cartItems.length === 0) {
      return res.status(404).json({ message: "No items in cart" });
    }

    res.status(200).json(cartItems);
  } catch (error) {
    // console.error("Error fetching cart items:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update cart item quantity
export const updateCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const { quantity } = req.body;

    const cartItem = await Cart.findOne({ userId, productId });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json({ message: "Cart item updated", cartItem });
  } catch (error) {
    // console.error("Error updating cart item:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Remove item from cart
export const removeCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const cartItem = await Cart.findOne({ userId, productId });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    await cartItem.deleteOne();

    res.status(200).json({ message: "Cart item removed" });
  } catch (error) {
    // console.error("Error removing cart item:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
 