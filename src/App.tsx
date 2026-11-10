
import { useState } from "react";
import "./App.css";

import { products as initialProducts } from "./data/data";
import type { ClothingProduct } from "./data/data";

import ItemsContainer from "./components/ItemsContainer";
import CheckoutContainer from "./components/CheckoutContainer";

export interface ProductSelection {
  id: number;
  quantity: number;
}

function App() {
  const [productList, setProductList] = useState<ClothingProduct[]>(
    initialProducts
  );

  const [productSelections, setProductSelections] =
    useState<ProductSelection[]>(
      initialProducts.map((product) => ({
        id: product.id,
        quantity: 0
      }))
    );

  const [cartItems, setCartItems] = useState<ClothingProduct[]>([]);

  function handleAdjustQuantity(id: number, amount: number) {
    const product = productList.find((item) => item.id === id);

    if (product) {
      setProductSelections(
        productSelections.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Math.max(
                  0,
                  Math.min(product.quantity, item.quantity + amount)
                )
              }
            : item
        )
      );
    }
  }

  function handleAddToCart(id: number) {
    const product = productList.find((item) => item.id === id);
    const selection = productSelections.find((item) => item.id === id);

    if (!product || !selection || selection.quantity === 0) {
      return;
    }

    const selectedQuantity = selection.quantity;

    setProductList(
      productList.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - selectedQuantity }
          : item
      )
    );

    const existingProduct = cartItems.find((item) => item.id === id);

    if (existingProduct) {
      setCartItems(
        cartItems.map((item) =>
          item.id === id
            ? { ...item, itemQuantity: item.itemQuantity + selectedQuantity }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          ...product,
          quantity: product.quantity - selectedQuantity,
          itemQuantity: selectedQuantity
        }
      ]);
    }

    setProductSelections(
      productSelections.map((item) =>
        item.id === id ? { ...item, quantity: 0 } : item
      )
    );
  }

  function handleRemove(id: number) {
    const removedProduct = cartItems.find((item) => item.id === id);

    if (removedProduct) {
      setProductList(
        productList.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + removedProduct.itemQuantity }
            : item
        )
      );

      setCartItems(cartItems.filter((item) => item.id !== id));
    }
  }

  function handleEmptyCheckout() {
    setProductList(
      productList.map((item) => {
        const cartProduct = cartItems.find(
          (product) => product.id === item.id
        );

        if (cartProduct) {
          return {
            ...item,
            quantity: item.quantity + cartProduct.itemQuantity
          };
        }

        return item;
      })
    );

    setCartItems([]);
  }

  function handleCheckout() {
    document.getElementById("checkout")?.scrollIntoView({
      behavior: "smooth"
    });
  }

  return (
    <>
      <header className="app-header">
        <img
          src="/src/assets/images/logo.png"
          alt="Thrift Happens Logo"
          className="store-logo"
        />

        <h1>Thrift Happens</h1>
        <p>Second-hand Clothing Store</p>

        <button type="button" onClick={handleCheckout}>
          Checkout
        </button>
      </header>

      <ItemsContainer
        products={productList}
        productSelections={productSelections}
        handleAdjustQuantity={handleAdjustQuantity}
        handleAddToCart={handleAddToCart}
      />

      <CheckoutContainer
        cartItems={cartItems}
        handleRemove={handleRemove}
        handleEmptyCheckout={handleEmptyCheckout}
      />
    </>
  );
}

export default App;
