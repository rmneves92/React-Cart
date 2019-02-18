import React from 'react'
import Button from '../main/button'

export default props => (
   
    <div className='cart-footer'>
        <div className='flex-space-between cart-subtotal'>
            <p className="cart-subtotal-text">Subtotal</p>
            <div>
                <p className="cart-price price">R$ <span>{moneyFormat(props.value)}</span></p>
                
                {!!props.installments && (
                    <small className='cart-installments'>Ou em até {props.installments} 
                    X R$ {moneyFormat(divideTotalPrice(props.value, props.installments))}</small>
                )}
                
            </div>
        </div>
        <Button quantity={props.quantity} text='Comprar' />
    </div>
)

const divideTotalPrice = (total, installments) => (
    (total / installments).toFixed(2)
) 

const moneyFormat = price => parseFloat(price).toFixed(2).replace('.', ',')
