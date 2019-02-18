import React, {Component} from 'react'
import thumb from '../thumb/thumb.png'

export default class CartList extends Component {

    moneyFormat(price) {
        return parseFloat(price).toFixed(2).replace('.', ',')
    }

    mouseEnterPreRemove(e) {
        const product = e.target.parentNode.parentNode.parentNode.parentNode.parentNode

        product.classList.add('item-hovered')
    }

    mouseLeavePreRemove(e) {
        const product = e.target.parentNode.parentNode.parentNode.parentNode.parentNode

        product.classList.remove('item-hovered')
    }

    renderRows()  {
        const list = this.props.list || []

        if(list.length > 0){
            return list.map((item, index) => (
                <div key={item.id}>
    
                    <div className='line'></div>
                    <div className="product-line">
                        <div>
                            <div className="flex-space-between">
                                <div className='flex-center'>
                                    <div className='thumb'>
                                        <img src={thumb} alt={item.title} title={item.title} />
                                    </div>
    
                                    <div className='product-info'>
                      
                                        <div className='description'>
                                            <ul className='attributes'>
                                                <li><strong className="cart-name">{item.title}</strong></li>
                                                <li>{item.availableSizes[0]} | {item.style}</li>
                                                <li>Quantidade: {item.quantity} </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
    
                                <div className="cart-product-price">
                                    <p  className="icon-remove">
                                        <i className="material-icons cart-remove-item" 
                                            onClick={() => this.props.handleRemove(item.id)}
                                            onMouseEnter={this.mouseEnterPreRemove}
                                            onMouseLeave={this.mouseLeavePreRemove}>clear</i>
                                    </p>
                                    <p className="price">{item.currencyFormat} <span>{this.moneyFormat(item.price)}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))
        }

        else{
            return (
                <div className='empty-cart'>Sua sacola está vazia!</div>
            )
        }
        
    }

    render(){
        return (
            <div className="cart-all-products">
                {this.renderRows()}
            </div>
        )
       
    }
}



