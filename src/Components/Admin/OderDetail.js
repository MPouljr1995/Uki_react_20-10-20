import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import AddBox from '@material-ui/icons/AddBox';

import OderApi from '../ApiServices/OderApi';
import CommonApi from '../ApiServices/CommonApi';
// import AccountBox from '@material-ui/icons/AccountBox';




const style ={
    display: 'flex',
    justifyContent: 'center'
}

class OrderDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            orders: [],
            ordersDetail: [],
            item:'',
            message: null,
            
        }
    }

    componentDidMount() {
        this.reloadOrderList();
    }

    reloadOrderList = () => {
        OderApi.getAllOders()
        .then((res) => {
            // console.log(res);
            this.setState({item : res.data});
            console.log(this.state.item);

            {
            this.state.item.map(item_1 => (
                CommonApi.getUserById(item_1.userId)
                .then((user) => {
                    // console.log(user);
                    let oneUser = user.data;
                    console.log(oneUser);

                    this.setState(prevState => ({
                        ordersDetail: [...prevState.ordersDetail, {
                            "oderId" :item_1.orderId,
                            "userName":oneUser.userName,
                            "address":oneUser.address,
                            "email" :oneUser.email,
                            "orderDateTime":item_1.orderDateTime,
                            "totalPrice":item_1.totalPrice,
                            "orderId":item_1.orderId,
                            "userId":item_1.userId,
                            
                        }]
                    }))

                    // {
                    //     item_1.buyProductDetails.map(item_2 =>(
                    //         console.log(item_2),
                    //         this.setState(prevState => ({
                    //             ordersDetail: [{...prevState.ordersDetail {
                                    
                    //                 "buyProductId":item_2.buyProductId,
                    //                 "quantity":item_2.quantity,
                    //                 "price":item_2.price,
                                        
                    //             }]
                    //         }))
                    //     ))
                    // }

                    
                })    
            ))}
        
        })

        .catch((error) => {
            console.log("error..");
        })
        console.log("res............");
    }

    deleteOrder = (orderId) => {
        // ApiService.deleteOrder(orderId)
        //    .then(res => {
        //        this.setState({message : 'User deleted successfully.'});
        //        this.setState({orders: this.state.orders.filter(order => order.id !== orderId)});
        //    })
        console.log(this.state.ordersDetail);
    }

    editOrder = (id) => {
        window.localStorage.setItem("editOrder", id);
        this.props.history.push('/editOrder');
    }

    addOrder = () => {
        window.localStorage.removeItem("orderId");
        this.props.history.push('/addOrder');
    }

    render() {
        const {ordersDetail} =this.state;
    //   const order = [{
    //         id:0,
    //         username:'Ayaan1',
    //         productId: 'iphone1',
    //         time:'10:33 am',
    //         date:'10.07.2020',
    //         price:'23000',
    //         quantity:1,
    //         email:'Ayaan@gmail.com',
    //         address:'Manipay North Manipay',
    //       },{
    //         id:1,
    //         username:'Ahana1',
    //         productId: 'iphone2',
    //         time:'10:33 am',
    //         date:'10.07.2020',
    //         price:'23000',
    //         quantity:1,
    //         email:'Ahana@gmail.com',
    //         address:'Navali South navali',
    //       },{
    //         id:2,
    //         username:'Peter1',
    //         productId:'pnone1',
    //         time:'10:33 am',
    //         date:'10.07.2020',
    //         price:'23000',
    //         quantity:1,
    //         email:'Peter@gmail.com',
    //         address:'Thavady North Kokkuvil',
    //       },{
    //         id:3,
    //         username:'Virat1',
    //         productId: 'phone3',
    //         time:'10:33 am',
    //         date:'10.07.2020',
    //         price:'23000',
    //         quantity:1,
    //         email:'Virat@gmail.com',
    //         address:'Kokkuvil South Kondavil',
    //       },{
    //         id:4,
    //         username:'Rohit1',
    //         productId: 'phone3',
    //         time:'10:33 am',
    //         date:'10.07.2020',
    //         price:'23000',
    //         quantity:1,
    //         email:'Rohit@gmail.com',
    //         address:'Uduvil North Uduvil',
    //       },{
    //         id:5,
    //         productId: 'phone2',
    //         username: 'Dhoni1',
    //         time:'10:33 am',
    //         date:'10.07.2020',
    //         price:'23000',
    //         quantity:1,
    //         email:'Dhoni@gmail.com',
    //         address:'Chunnakam west Mallakam',
    //       },{
    //         id:6,
    //         username:'Naveen1',
    //         productId: 'phone1',
    //         time:'10:33 am',
    //         date:'10.07.2020',
    //         price:'23000',
    //         quantity:1,
    //         email:'Naveen@gmail.com',
    //         address:'Inuvil south chunnakam',
    //       }]
        return (
            <div style={{width:'90%',margin:'auto', backgroundColor:'white' , marginTop:'50px',}}>
                <Typography variant="h4" style={style}>Order Details</Typography>
                <Button variant="contained" style={{backgroundColor:'#03a9f4',color:'white',float:'right',marginRight:'30px',fontWeight:'bold'}} onClick={() => this.addOrder()}><AddBox style={{marginRight:'5px'}}/>
                    Add Order
                </Button>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>USER NAME</TableCell>
                            {/* <TableCell align="left">UserName</TableCell> */}
                            <TableCell align="left">ODER ID</TableCell>
                            <TableCell align="left">TIME</TableCell>
                            {/* <TableCell align="left">Date</TableCell> */}
                            <TableCell align="left">TOTAL PRICE</TableCell>
                            {/* <TableCell align="left">Quantity</TableCell> */}
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Address</TableCell>


                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ordersDetail.map(row => (
                            <TableRow key={row.orderId}>
                                {/* <TableCell component="th" scope="row">
                                    {row.orderId}
                                </TableCell> */}
                                <TableCell align="left">{row.userName}</TableCell>
                                <TableCell align="left">{row.orderId}</TableCell>
                                <TableCell align="left">{row.orderDateTime}</TableCell>
                                {/* <TableCell align="left">{row.date}</TableCell> */}
                                <TableCell align="left">{row.totalPrice}</TableCell>
                                {/* <TableCell align="left">{row.quantity}</TableCell> */}

                                <TableCell align="left">{row.email}</TableCell>
                                <TableCell align="left">{row.address}</TableCell>
                                {/* <TableCell align="left" onClick={() => this.editOrder(row.orderId)}><CreateIcon /></TableCell> */}
                                <TableCell align="left" onClick={() => this.deleteOrder(row.orderId)}><DeleteIcon /></TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>
        );
    }

}

export default OrderDetail;
