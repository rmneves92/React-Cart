import React, {Component} from 'react'
import Cart from '../cart/cart'
import axios from 'axios'
import thumb from '../thumb/thumb.png'


const URL = 'http://localhost:3000/api/products'
const products =  []

export default class MainPage extends Component {
    constructor(props){
        super(props)

        this.state = {
            list: [],
            cartList: [],
            quantity: 0
        }

        this.handleRemove = this.handleRemove.bind(this)

        this.getProducts()
  
    }

    getProducts(){
        axios.get(URL)
        .then(resp => 
            this.setState(
                {...this.state, list: resp.data.products}
            )
        )
    }

    addProduct(item){
        let alreadyInCart = false
        this.state.cartList.forEach(prod => {
            if(prod.id === item.id){
                item.quantity += 1
                alreadyInCart = true
            }
        })
        if(!alreadyInCart){
            item.quantity = 1
            products.push(item)
        }
        this.setState({...this.state, cartList: products})

    }
    
    renderRows() {
        const list = this.state.list || []
        
        return list.map(item => (
            <div key={item.id} className="product-item" >
                <img  onClick={() => this.addProduct(item)} src={thumb} alt='thumb'/>
                <p className='product-name'>{item.title}</p>
                <p className='product-instalment'><small>{item.currencyFormat}</small><big>{' ' + item.price.toFixed(2)}</big></p>
                <p className='product-installment'><small>OU {item.installments} x {item.currencyFormat} {this.divideTotalPrice(item.price, item.installments)} </small></p>
            </div>
        ))
    }

    
    divideTotalPrice(total, installments) {
        return(total / installments).toFixed(2)
    }

    handleRemove(id){
        const cartList = this.state.cartList

        cartList.forEach((item, index) => {
            if(item.id === id){
                cartList.splice(index, 1);
            }
        })
    
        this.setState({...this.state, cartList: cartList})

    }

    openCart(){
        const cart = document.querySelector('.cart')
        cart.classList.remove('collapse-cart')
    }


    render() {
        return (
            <div>
                <button className="waves-effect waves-light btn open-cart-button" onClick={this.openCart}>Abrir sacola</button>
                <div className='container-products'>
                    {this.renderRows()}
                    <Cart 
                        list={this.state.cartList} 
                        handleRemove={this.handleRemove}
                        />
                </div>
            </div>
        )
    }
}
