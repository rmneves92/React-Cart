import React from 'react'

export default props => (
    <a className="waves-effect waves-light btn button-buy" onClick={() => showToast(props.quantity)} >
        {props.text} 
    </a>
)


function showToast(quantity){
    quantity > 0 ? 
    Materialize.toast('Compra realizada com sucesso <i class = "material-icons">check</i>', 3000, 'green')
     : Materialize.toast('Selecione pelo menos um produto', 3000, 'red')
}
