// Function that adds decimals together and rounds them returning a string.
export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

// Function that performs calculations and updates the cart.
export const updateCart = (state) => {
  /* Calculate the items price in whole number (pennies) to avoid
   * issues with floating point number calculations.
   */
  const itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + (item.price * 100 * item.qty) / 100,
    0
  );

  state.itemsPrice = addDecimals(itemsPrice);

  // Calculate the shipping price.
  const shippingPrice = itemsPrice >= 100 ? 0 : 10;
  state.shippingPrice = addDecimals(shippingPrice);

  // Calculate the tax price.
  const taxPrice = 0.15 * itemsPrice;
  state.taxPrice = addDecimals(taxPrice);

  // Calculate the total price.
  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  state.totalPrice = addDecimals(totalPrice);

  // Save the cart instance to localStorage.
  localStorage.setItem('cart', JSON.stringify(state));

  return state;
};
