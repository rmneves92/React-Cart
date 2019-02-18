import React, {Component} from 'react'
import Header from './cartHeader'
import CartList from '../cart/cartList'
import Subtotal from '../cart/cartFooter'

export default class Cart extends Component {
    constructor(props){ 
        super(props)
        this.state = {
            list: [], 
            total: 0, 
            installments: 0,
            quantity: 0
        }
    }

    componentWillReceiveProps(nextProps){
        this.refresh(nextProps)
    }

    refresh(props) {
     
        this.setState(
            {...this.state, list: props.list}, 
            () =>  {
                const total = this.sum()
                const installments = this.installments()
                const quantity = this.updateQuantity()
        

                this.setState({...this.state, total, installments, quantity})
            }
        )       
    }

    sum() {
        const itens = this.state.list || []
     
        let total = itens
                    .map(item => item.price * item.quantity)
                    .reduce((a, b) => (a + b), 0)

        total = total.toFixed(2)

        return total
    }

    installments() {
        const array = []

        const itens = this.state.list || []
        itens.map(item => array.push(item.installments))
        
        const maxValue = array.length > 0 ? Math.max(...array) : 0

        return maxValue
    }

    
    updateQuantity() {
        const list = this.state.list
  
        let quantity = 0

        list.forEach(item => {
            return quantity += item.quantity

        })

        return quantity
    }

    render(){
        return(
            <div className='cart'>
                <Header 
                    quantity={this.state.quantity}/>
                <CartList 
                    handleRemove={this.props.handleRemove}
                    list={this.state.list}/>  
                <Subtotal 
                    format={this.state.format} 
                    value={this.state.total} 
                    installments={this.state.installments} 
                    quantity={this.state.quantity}/>
            </div>
        )
    }
}