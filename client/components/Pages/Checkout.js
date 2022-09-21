import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchMenu } from '../../store';
import {fetchCart } from '../../store/cart';
import axios from "axios";


const Checkout = ({ dishes, cart})=> {
  const token = localStorage.getItem("token");
  const stripeSession = async () => {
    const { data: url } = await axios.post("/api/stripe", {
      headers: {
        authorization: token,
      },
    });
    window.location.href = url;
  };

  let cartTotal = 0;

  cart.lineItems.forEach(lineItem => {
    let quantity = lineItem.quantity;
    let price = lineItem.dish.price;
    if(quantity && price) {
      let lineItemCost =  price*quantity;
      cartTotal = lineItemCost + cartTotal;
    }
  });
  return (
    
    <div>

      <div>
      <div>
          <div className='text-red-400 text-xl font-semibold'>
              <h1>Check Out</h1>
          </div>
      </div> 
     
        <div className='w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col'>
          <table>
            <thead>
              <tr>
                <th width='75%'>Dishes In Cart</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>

            {dishes.map( dish => {
            const lineItem = cart.lineItems.find(lineItem => lineItem.dishId === dish.id) || { quantity: 0 };
              if (lineItem.quantity > 0){
                return (
                  <tr key={ dish.id }>
                    <td>{dish.name}</td>
                    <td width='20px'>${dish.price}</td>
                    <td>{lineItem.quantity}</td>
                    <td>${Math.round((Number(dish.price) * lineItem.quantity+ Number.EPSILON) * 100) / 100}</td>
                  </tr>
                )
              }})}
              <tr className='w-full flex-1 bg-cartTotal rounded-t-[2rem] flex items-end px-8 py-2 text-gray-400 text-lg'>
                <td colSpan='2'>Grand Total</td>
                <td colSpan='4'>${Math.round(cartTotal * 100) / 100}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className='w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-end justify-evenly px-8 py-2'>
            <Link to='/restaurants'>
            <svg xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor" 
              className="bi bi-arrow-left" 
              viewBox="0 0 16 16">
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
            </svg>
              <span className='text-black-200 text-xl font-semibold'>Cancel and Keep Shopping</span>
            </Link>

            <div>
              <button
                onClick={() => {stripeSession();
                }}
                >
              Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
  )
}
  
const mapStateToProps = (state)=> {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCart: () => dispatch(fetchCart()),
    fetchMenu: () => dispatch(fetchMenu()),
    dispatchAction: (action)=> dispatch(action)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);