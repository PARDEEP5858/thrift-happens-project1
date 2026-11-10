
import type { ClothingProduct } from "../data/data";
import type { ProductSelection } from "../App";

import ItemCard from "./ItemCard";

interface ItemsContainerProps {
  products: ClothingProduct[];
  productSelections: ProductSelection[];
  handleAdjustQuantity: (id: number, amount: number) => void;
  handleAddToCart: (id: number) => void;
}

export default function ItemsContainer({
  products,
  productSelections,
  handleAdjustQuantity,
  handleAddToCart
}: ItemsContainerProps) {

  return (
    <div className="ItemsContainer">

      <h2>Our Clothing Collection</h2>

      <div className="items-grid">

        {products.map((list) => {

          const selection = productSelections.find(
            (item) => item.id === list.id
          );

          if (!selection) {
            return null;
          }

          return (
            <ItemCard
              key={list.id}
              {...list}
              selectedQuantity={selection.quantity}
              handleAdjustQuantity={handleAdjustQuantity}
              handleAddToCart={handleAddToCart}
            />
          );
        })}

      </div>

    </div>
  );
}
