
import type { ClothingProduct } from "../data/data";

import CheckoutCard from "./CheckoutCard";

interface CheckoutContainerProps {
  cartItems: ClothingProduct[];
  handleRemove: (id: number) => void;
  handleEmptyCheckout: () => void;
}

export default function CheckoutContainer({
  cartItems,
  handleRemove,
  handleEmptyCheckout
}: CheckoutContainerProps) {

  const grandTotal = cartItems.reduce(
    (total, product) =>
      total + product.price * product.itemQuantity,
    0
  );

  return (
   <div className="CheckoutContainer" id="checkout">

      <h2>Checkout</h2>

      {cartItems.length === 0 ? (
        <p>Cart Empty</p>
      ) : (
        <>
          {cartItems.map((product) => (
            <CheckoutCard
              key={product.id}
              {...product}
              handleRemove={handleRemove}
            />
          ))}

          <h2>Grand Total: ${grandTotal.toFixed(2)}</h2>

          <button onClick={handleEmptyCheckout}>
            Empty Checkout
          </button>
        </>
      )}

    </div>
  );
}
