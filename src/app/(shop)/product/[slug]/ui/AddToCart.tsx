'use client'
import { useState } from 'react'

import { QuantitySelector, SizeSelector } from '@/components'
import { CartProduct, Product, Size } from '@/interfaces'
import React from 'react'
import { useCartStore } from '@/store'

interface Props {
    product: Product
}

export const AddToCart = ( { product }  : Props ) => {

  const addProductToCart = useCartStore( state => state.addProductTocart );


  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);


  const addToCart = () => {
    setPosted(true);

    if (!size) return;

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: size,
      image: product.images[0]
    }

    addProductToCart(cartProduct);
    setPosted(false);
    setQuantity(1);
    setSize(undefined);


  };

  return (
    <>

      {posted && !size && (
        <span className="mt-2 text-red-500 fade-in">
          Debe de seleccionar una talla*
        </span>
      )}

     {/* Selector de Tallas */}
        <SizeSelector
          onSizeChanged={ size => setSize(size) } 
          selectedSize={size}
          availableSizes={product.sizes}
        />

        {/* Selector de Cantidad */}
        <QuantitySelector 
            quantity={quantity} 
            onQuantityChanged={ quantity => setQuantity(quantity) }
        />

        {/* Button */}
        <button onClick={ addToCart } className="btn-primary my-5">Agregar al carrito</button>
    </>
  )
}
