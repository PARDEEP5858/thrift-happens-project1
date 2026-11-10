
import type { ClothingProduct } from "../data/data";

interface ItemCardProps extends ClothingProduct {
  selectedQuantity: number;
  handleAdjustQuantity: (id: number, amount: number) => void;
  handleAddToCart: (id: number) => void;
}

export default function ItemCard({
  id,
  image,
  name,
  fit,
  category,
  color,
  description,
  size,
  price,
  quantity,
  selectedQuantity,
  handleAdjustQuantity,
  handleAddToCart
}: ItemCardProps) {

  return (
    <div className="ItemCard">

      <img src={`/${image}`} alt={name} width="150px" />

      <h2>{name}</h2>
      <p>Fit: {fit}</p>
      <p>Category: {category}</p>
      <p>Colour: {color}</p>
      <p>{description}</p>
      <p>Size: {size}</p>
      <p>Price: ${price.toFixed(2)}</p>
      <p>Available Stock: {quantity}</p>

      {quantity === 0 && <p>Out of Stock</p>}

      <button
        onClick={() => handleAdjustQuantity(id, -1)}
        disabled={selectedQuantity === 0 || quantity === 0}
      >
        -
      </button>

      <span>{selectedQuantity}</span>

      <button
        onClick={() => handleAdjustQuantity(id, 1)}
        disabled={selectedQuantity >= quantity || quantity === 0}
      >
        +
      </button>

      <button
        onClick={() => handleAddToCart(id)}
        disabled={quantity === 0 || selectedQuantity === 0}
      >
        Add to Cart
      </button>

    </div>
  );
}
