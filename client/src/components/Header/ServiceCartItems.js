import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";


const CartHoverContainer = styled.div`
${({ theme }) => `
    width: 237px;
    height: 290px;
    background-color: white;
    position: absolute;
    right: 45px;
    top: 58px;
    border: 1px solid #D9D9D9;
    z-index: 1;
  .items-container {
    margin-top: 5px;
    height: 177px;
    overflow: scroll;
  }
  .cart-item {
    margin-bottom: 5px;
    margin-left: 10px;
    margin-right: 10px;
    padding-bottom: 10px;
    height: 75px;
    border-bottom: 1px solid rgba(189,198,207,0.5);
    img {
      margin-left: 7px;
      margin-top: 10px;
      height: 65px;
      width: 70px;
      background-color: #BDC6CF;
    }
    h3 {
      margin-left: 5px;
      margin-top: 8px;
      margin-bottom: 41px;
      opacity: 0.9;
      font-size: 11px;
      font-weight: 500;
    }
    h4 {
      margin-left: 5px;
      opacity: 0.8;
      font-size: 11px;
      font-weight: 500;
    }
  }
  .price-checkout {
    margin-top: 30px;
    height: 73px;
    background-color: #FBFBFC
  }
    .quantity-price {
      margin-left: 10px;
      margin-right: 10px;
      display: flex;
      justify-content: space-between;
      h1{
        opacity: 0.7;
        font-size: 11px;
        font-weight: 500;
      }
      h2{
        opacity: 0.7;
        font-size: 11px;
        font-weight: 500;
      }
    }
    button.proceed-checkout {
      margin-left: 10px;
      height: 35px;
      width: 217px;
      background-color: ${theme.palette.primary.main};
      color: ${theme.palette.white.main};
    }
    button:hover {
      background-color: ${theme.palette.primary[900]};
    }
`}
`;

const CartItems = (props) => {

  const node = useRef(null);
  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClick = (e) => {
    if (node && node.current) {
      if (!node.current.contains(e.target)) {
        props.notShowItemsInCart();
      }
    }
  };
  return (
    <div
      ref={node}
    >
        <CartHoverContainer>
          <div className="items-container">{props.cartItemsList}</div>
          <div className="price-checkout">
            <div className="quantity-price">
              <h1>{props.totalQuantity} items</h1>
              <h2>QR {props.totalPrice}</h2>
            </div>
            <button className="proceed-checkout" onClick={props.onClick}>
              PROCEED TO CHECKOUT
            </button>
          </div>
        </CartHoverContainer>
    </div>
  );
}

export default CartItems;