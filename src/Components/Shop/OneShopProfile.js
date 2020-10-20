import React, { Component } from 'react';
import './ShopCss/OneShopProfile.css'

import {DataContext} from '../Card/Data';

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

import {Grid,Card,CardContent,Typography,Button, CardActions} from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

// import Photo from './ShopImage/phone4.jpg'
import ShopApi from '../ApiServices/ShopApi';
import ProductApi from '../ApiServices/ProductApi';

class OneShopProfile extends Component {
    constructor(props){
        super(props)
        this.state={
            shop:[],
            product:[]
        }
    }

    static contextType = DataContext;

    componentDidMount() {
        const shopid = this.props.match.params.shopid;
        // console.log(searchKey);
        if(shopid) {
        this.getShop(shopid)
        this.getProductsForOneShop(shopid)
        }
    }

    getShop(shopid) {
        ShopApi.GetShopById(shopid)
        .then((res) =>(
            this.setState({shop:res.data})
        ))
    }

    getProductsForOneShop(shopid) {
        ProductApi.getProductByShopId(shopid)
        .then(produ => (
            this.setState({product:produ.data})
        ))
    }


    editShop = (id) =>  {
        this.props.history.push('/editshop/'+ id);
        // window.location('/editshop/'+ id)
    }

    editProduct= (id)=> {
        this.props.history.push('/editproduct/'+ id);
    }
        

    render() {
        const {addCart,message,severity,AlertTitle} = this.context;
        const {shop,product} = this.state;
        return(
            <div>
                {message&&(
                    <div>
                        <Alert variant="filled" severity={severity} style={{position:"absolute",right:"100px",width:"550px",marginTop:"400px", zIndex:"3",color:"white"}}>
                            <AlertTitle>{AlertTitle}</AlertTitle>
                            {message}
                        </Alert>

                    </div>
              )}
            
            <div className='oneShopMain'>
            <Grid container spacing={3} >
                <Grid item xs={12}>
                    <Card className= 'oneShopProfileMain'>
                        <CardActionArea>
                            <Grid container>
                                <Grid item xs={5}>
                                    <CardMedia>
                                        <img src= {shop.shopLogo} alt="Logo"/>
                                    </CardMedia>
                                </Grid>
                                <Grid item xs={7}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {shop.shopName}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                             {shop.description}
                                        </Typography> 
                                        <Rating name="read-only" value={shop.rating} readOnly />   
                                    </CardContent>
                                    <CardActions >
                                        <Button onClick={() => this.editShop(shop.shopId)} id="shopEditProfile"  variant="contained"  >
                                            Edit
                                        </Button>
                                        <Button href='/addproduct' id="shopEditProfile"  variant="contained"  >
                                            add product
                                        </Button>
                                    </CardActions>
                                </Grid>        
                            </Grid>                           
                        </CardActionArea>        
                    </Card>
                </Grid>

                {/* ///////////////////////////////////////////////// */}

                    {
                        product && (
                            product.map(product => (
                                <Grid item xs={6} sm={4} md={3} lg={3} style={{marginTop:'20px'}}>
                                <Card className='productCard'   elevation={3}>
                            <CardActionArea >
                            <Box className='showImgDiv'>
                                <CardMedia
                                className='showImg'
                                component="img"
                                image={product.image_1}
                                title="Contemplative Reptile"
                                class="img-responsive"
                                id="showImg"
    
                                />
                            </Box>
    
                            <CardContent>
                                <Typography gutterBottom  className='productTitle'>
                                {product.title}
                                {/* title */}
                                </Typography>
                                <Typography className='offerPrice' variant="h6">
                                {product.lastPrice}
                                {/* lastprice */}
                                </Typography>
                                <Typography className='sellPrice' variant="h6">
                                {product.sellPrice}
                                {/* sellprice */}
                                </Typography>
    
                                <Typography className='offerPrice'>
                                    <Rating name="read-only" value={product.rating} readOnly  />
                                </Typography>
                            </CardContent>
                            </CardActionArea>
                            <CardActions >

                            <Button href={`/buynowpayment/${product.productId}`} variant="contained" id="btn" style={{backgroundColor:'#03a9f4',color:'white',margin:'auto'}} >
                              <ShoppingBasketIcon/> BUY NOW
                            </Button>
                            <Button  onClick={()=> addCart(product.productId)} variant="contained" style={{backgroundColor:'#03a9f4',color:'white',margin:'auto'}} >
                               <ShoppingCartIcon/> ADD TO CARD
                            </Button>
                            <Button  onClick={()=>this.editProduct(product.productId)}  variant="contained" style={{backgroundColor:'#03a9f4',color:'white',margin:'auto'}} >
                                 EDIT
                            </Button>
                            </CardActions>
                            </Card>
                            </Grid>
                            ))
                        )
                        
                    }

               
            </Grid>
            </div>
        </div>
        )
    }
}
export default OneShopProfile;