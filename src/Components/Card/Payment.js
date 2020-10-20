import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import {DataContext} from '../Card/Data'

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

// import Input from '@material-ui/core/Input';
// import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

import {Grid,Paper,Button} from '@material-ui/core';

import './CardCss/Payment.css'
import './CardCss/BuyThins.css'

// import BuyingThings from './BuyThins';
import CommonApi from '../ApiServices/CommonApi';
import OderApi from '../ApiServices/OderApi';
// import './cssPages/Payment.css';

// import BuyingThings from './BuyingThings';


export default class Payment extends Component {

    constructor(props){
        super(props);
        this.state = {
            user:[],
            showReselt:'',

            buyProductDetails:[],

            severity:'',
            AlertTitle:'',
            message:"",
        }
    }

    static contextType = DataContext;

    componentDidMount(){
        // this.context.getTotal();

        // const{thinsByNowIs} = this.props.location
        //     console.log(thinsByNowIs);

        this.getUserDetail();
        this.getCardOderAllProduct();
    }

   getUserDetail() {
       CommonApi.getUserById(localStorage.getItem('userId'))
       .then(res => {
        this.setState({user:res.data})
       })
   }  

   getCardOderAllProduct ()  {
       {
           this.context.cart.map(pro => (
               console.log(pro),
                this.setState(prevState =>({
                    buyProductDetails: [...prevState.buyProductDetails,{
                        "buyProductId":pro.productId,
                        "shopId":pro.shopId,
                        "quantity":pro.count,
                        "price":pro.sellPrice,
                    }]
                }))
           ))
       }

   }

   oderAllProduct= () => {
    let oder = {
        userId : localStorage.getItem("userId"),
        buyProductDetails: this.state.buyProductDetails,
        totalPrice: this.context.total * 1.2
       }

    OderApi.addNewOder(oder)
    .then(res => {
        this.setState({
            message:"YOUR ODER SUCCESS",
            severity:'success',
            AlertTitle:'success',
        })

        setTimeout(() => {
            this.setState({message:''})
        },2000)
    })

    .catch(res => {
        this.setState({
            message:"YOUR ODER NOT COMPILITE",
            severity:'error',
            AlertTitle:'error',
        })

        setTimeout(() => {
            this.setState({message:''})
        },2000)
    })

    // console.log(this.state.buyProductDetails);
    // console.log(oder)
   }
   
   
    render() {

        const {total,buyNowTotal,payment,cart,remove2,removeProduct} = this.context;
        const {user} = this.state;

        return(

            <div>

                {this.state.message&&(
                    <div>
                        <Alert variant="filled" severity={this.state.severity} style={{position:"absolute",right:"100px",width:"550px",zIndex:"3",color:"white"}}>
                            <AlertTitle>{this.state.AlertTitle}</AlertTitle>
                            {this.state.message}
                        </Alert>

                    </div>
                )}

            
            <Paper id="paper1">
                <div className="payment_d">   
                    <div className="heading">
                        <h3>Oder Confirmation</h3>
                        <p>Oder Total :-{total*1.2} .00 </p>
                        <Button onClick={this.oderAllProduct} id="oder">Place Oder</Button>
                    </div>  

                    <div className="boder">
                        <div className="detail_1">
                            <Grid container>
                                <Grid item xs={6}>
                                    <Box className="box">
                                        <h3>Your Information</h3>
                                        <p>- - - - - - - - - - - - - - - - - - - - - - - - - -</p>
                                        <h4>Name -{user.userName} </h4>
                                        <h5>Email -{user.email} </h5>
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box className="box">
                                        <h3>Shipping Address</h3>
                                        <p>- - - - - - - - - - - - - - - - - - - - - - - - - - - -</p>
                                        {/* <TextField
                                        id="outlined-multiline-static"
                                        label="address"
                                        multiline
                                        rows={4}
                                        defaultValue="address"
                                        variant="outlined"
                                        />    */}
                                        <h2>{user.address} </h2>
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box className="box">
                                        <h3>Payment</h3>
                                        <p>- - - - - - - - - - - - - - - - - - - - - - - - - - - -</p>
                                        <h5>Cash On Delivery</h5>
                                        {/* <input></input> */}
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box className="box">
                                        <h3>Phone Number</h3>
                                        <p>- - - - - - - - - - - - - - - - - - - - - - - - - - - -</p>
                                        <div>
                                            {/* <TextField
                                            id="outlined-password-input"
                                            label="Enter PhoneNumber"
                                            type="Number"
                                            autoComplete="current-password"
                                            variant="outlined"
                                            />
                                            <Button id="phoneNumber_B">Enter</Button> */}
                                            <h2>{user.phoneNumber} </h2>
                                        </div>
                                        
                                    </Box>
                                </Grid>
                                <Button href='/profile' id="EDIT_B">EDIT</Button>
                            </Grid>                            
                        </div>                       
                    </div>
                    
                    {/* <div><BuyingThings/></div> */}
  {/* /////////////////////////////////////////////////////////                   */}

                <Paper className="thingsDetail_P">
                                    {cart.length !== 0 && (
                                        <Grid container>
                                            <Grid item xs={5} style={{textAlign:"center"}}><h3>items</h3></Grid>
                                            <Grid item xs={2} style={{textAlign:"center"}}><p>Quanity</p></Grid>
                                            <Grid item xs={3} style={{textAlign:"center"}}><p>Sell Price</p></Grid>
                                            <Grid item xs={2}></Grid>
                                        </Grid>
                                    )}
                                    

                                    <div>
                                        {
                                            cart.map(card1 =>(
                                                <div>
                                                    <Grid container>
                                                        <Grid item xs={5} style={{textAlign:"center"}}>
                                                            <Grid container>
                                                                <Grid item xs={4}>
                                                                    <img src={card1.image_1} style={{width:"100px", height:"100px"}}></img>
                                                                </Grid>
                                                                <Grid item xs={4}>
                                                                    <h2>{card1.title}</h2>
                                                                    <p>{card1.description}</p>
                                                                </Grid>
                                                                <Grid item xs={4}></Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={2} style={{textAlign:"center"}}><p>{card1.count}</p></Grid>
                                                        <Grid item xs={3} style={{textAlign:"center"}}>
                                                            <p>RS. {card1.sellPrice}</p>
                                                        </Grid>
                                                    </Grid>
                                                    <br/>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </Paper>

                {/* /////////////////////////////////////////////////////////////////////////// */}

                    <Box className="total_B">
                        <div className="total_d"> 
                            <div>
                                <h4>Subtotal -</h4>
                                <h4>Shipping fee -</h4>
                                <h1>TOTAL -</h1>
                            </div>
                            <div className="price_d">
                                <h4>RS. {total}.00</h4>
                                <h4>RS. {total*0.2}.00</h4>
                                <h1>RS. {total+total*0.2}.00</h1>
                            </div>
                        </div>
                        <Button onClick={this.oderAllProduct} id="oder_2">PLACE ODER</Button>                        
                    </Box> 
                </div>
            </Paper>
        </div>
        )
    }
}