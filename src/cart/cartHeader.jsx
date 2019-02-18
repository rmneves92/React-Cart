import React from 'react'

export default props => (
    <header className='page-header flex-center'>
        <span className='close-cart' onClick={closeCart}>X</span>
        <i className="bag fas fa-shopping-bag fa-2x bag-icon"></i>
        <span className='bag-quantity'>{props.quantity}</span>
        <h1 className="cart-title">Sacola</h1>
    </header>
)

const closeCart = () => {
    const cart = document.querySelector('.cart')
    cart.classList.add('collapse-cart')
}