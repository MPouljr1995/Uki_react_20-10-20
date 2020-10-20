import React, { Component } from 'react'

import {DataContext} from '../Card/Data'

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

// import Input from '@material-ui/core/Input';
// import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

import {Grid,Paper,Button} from '@material-ui/core';

import './CardCss/Payment.css'
import './CardCss/BuyThins.css'

import CommonApi from '../ApiServices/CommonApi';
import OderApi from '../ApiServices/OderApi';
import ProductApi from '../ApiServices/ProductApi';



export default class BuyNowPayment extends Component {

    constructor(props){
        super(props);
        this.state = {
            user:[],

            buyProductDetails:[],
            price:'',
            productDetail:[],

            severity:'',
            AlertTitle:'',
            message:"",
        }
    }

    static contextType = DataContext;

    componentDidMount(){

        const reseltid = this.props.match.params.id;
        if (reseltid) {
            this.getCardOderProduct(reseltid);
        }

        this.getUserDetail();
        
    }

   getUserDetail() {
       CommonApi.getUserById(localStorage.getItem('userId'))
       .then(res => {
        this.setState({user:res.data})
       })
   }  

   getCardOderProduct (reseltid)  {
       console.log("hi....All")

       ProductApi.getProductById(reseltid)
       .then(res => {
       console.log("end....");
           this.setState({
            productDetail:res.data,
            buyProductDetails: [{
                "buyProductId":res.data.productId,
                "shopId":res.data.shopId,
                "quantity":res.data.count,
                "price":res.data.sellPrice,
            }],
            price:res.data.sellPrice,
           })
       })
   }

   oderAllProduct= () => {
    let oder = {
        userId : localStorage.getItem("userId"),
        buyProductDetails: this.state.buyProductDetails,
        totalPrice: this.state.price *1.2,
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
            this.props.history.push('/');
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

        // const {payment} = this.context;
        const {user , productDetail} = this.state;

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
                        <p>Oder Total :-{this.state.price*1.2} .00 </p>
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
                    
  {/* /////////////////////////////////////////////////////////                   */}

                <Paper className="thingsDetail_P">
                                    {productDetail.length !== 0 && (
                                        <Grid container>
                                            <Grid item xs={5} style={{textAlign:"center"}}><h3>items</h3></Grid>
                                            <Grid item xs={2} style={{textAlign:"center"}}><p>Quanity</p></Grid>
                                            <Grid item xs={3} style={{textAlign:"center"}}><p>Sell Price</p></Grid>
                                            <Grid item xs={2}></Grid>
                                        </Grid>
                                    )}

                                    <div>
                                        {/* {
                                        this.state.productDetail.map(pay =>( */}
                                                <div>
                                                    <Grid container>
                                                        <Grid item xs={5} style={{textAlign:"center"}}>
                                                            <Grid container>
                                                                <Grid item xs={4}>
                                                                    <img src={productDetail.image_1} style={{width:"100px", height:"100px"}}></img>
                                                                </Grid>
                                                                <Grid item xs={4}>
                                                                    <h2>{productDetail.title}</h2>
                                                                    <p>{productDetail.description}</p>
                                                                </Grid>
                                                                <Grid item xs={4}></Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={2} style={{textAlign:"center"}}><p>{productDetail.count} </p></Grid>
                                                        <Grid item xs={3} style={{textAlign:"center"}}>
                                                            <p>RS. {productDetail.sellPrice}</p>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                        </Grid>
                                                    </Grid>
                                                    <br/>
                                                </div>
                                            {/* )) */}
                                        {/* } */}
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
                                <h4>RS. {this.state.price}.00</h4>
                                <h4>RS. {this.state.price*0.2}.00</h4>
                                <h1>RS. {this.state.price*1.2}.00</h1>
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