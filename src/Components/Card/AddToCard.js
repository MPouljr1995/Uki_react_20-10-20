import React, { Component } from 'react'
import {DataContext} from '../Card/Data'
import {Link} from 'react-router-dom'

import './CardCss/AddToCard.css'
import './CardCss/Detail.css'

export  class AddToCard extends Component {
    static contextType = DataContext;

    componentDidMount(){
        this.context.getTotal();
    }

    render() {
        const {cart,increase,reduction,removeProduct,total} = this.context;

        if(cart.length === 0){
            return <h2 style={{textAlign:"center"}}>Nothings Product</h2>
        }else{
            return (
                
                <div className= "fullBox" >
                    {
                        cart.map(item =>(
                            <div className="details cart" key={item.productId}>
                                <img src={item.image_1} alt=""/>
                                <div className="box">
                                    <div className="row">
                                        <h2>{item.title}</h2>
                                        <span> {item.sellPrice} * {item.count}=  Rs{item.sellPrice * item.count}</span>
                                    </div>

                                    <p>{item.description}</p>

                                    <div className="amount">
                                        <button className="count" onClick={() => reduction(item.productId)}> - </button>
                                        <span>{item.count}</span>
                                        <button className="count" onClick={() => increase(item.productId)}> + </button>
                                    </div>
                                </div>
                                <div className="delete" onClick={() => removeProduct(item.productId)}>X</div>
                            </div>
                        ))
                    }
                    <div className="total">
                        <Link to="/payment">Buy all item</Link>
                        <h3>Total: Rs. {total}.00</h3>
                    </div>
                </div>
                )
            }
    }
}

export default AddToCard;
