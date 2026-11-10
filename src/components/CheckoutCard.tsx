
import type { ClothingProduct } from "../data/data";

interface CheckoutCardProps extends ClothingProduct {
  handleRemove: (id: number) => void;
}

export default function CheckoutCard({
  id,
  image,
  name,
  price,
  itemQuantity,
  handleRemove
}: CheckoutCardProps) {

  const subtotal = price * itemQuantity;

  return (
    <div className="CheckoutCard">

      <img src={image} alt={name} width="120px" />

      <h2>{name}</h2>

      <p>Unit Price: ${price.toFixed(2)}</p>

      <p>Quantity: {itemQuantity}</p>

      <p>Subtotal: ${subtotal.toFixed(2)}</p>

      <button onClick={() => handleRemove(id)}>
        Remove
      </button>

    </div>
  );
}
