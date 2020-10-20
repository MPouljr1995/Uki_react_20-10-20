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

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

import CommonApi from '../ApiServices/CommonApi';


const style ={
    display: 'flex',
    justifyContent: 'center'
}

class UserDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            message: '',
            severity:'',
            AlertTitle:'',
        }
        // this.deleteUser = this.deleteUser.bind(this);
        // this.editUser = this.editUser.bind(this);
        // this.addUser = this.addUser.bind(this);
        // this.reloadUserList = this.reloadUserList.bind(this);
    }

    componentDidMount() {
        this.reloadUserList();
    }

/////////////////////
    reloadUserList = () => { 
        CommonApi.getAllUsers()
            .then((res) => {
                // console.log(res)
                this.setState({users: res.data.data})
            });
    }
    //////////////////////////

    deleteUser = (userId) => {
        // window.alert("this user delete");
        CommonApi.deleteUser(userId)
           .then(res => {
               this.setState({
                   message : 'User deleted successfully.',
                   severity:'success',
                   AlertTitle:'success',
                });
               this.setState({users: this.state.users.filter(users => users.userId !== userId)});
           })
           .catch(error => {
               console.log(error);
               this.setState({
                   message:'error',
                   severity:'error',
                   AlertTitle:'error',
               })
           })

           setTimeout(() => {
               this.setState({message:'',})
            //    window.location.reload(UserDetails);
           },2000)
        
    }

    render() {

        const {users} = this.state;

        return (
            <div>
                 {this.state.message&&(
                    <div>
                        <Alert variant="filled" severity={this.state.severity} style={{position:"absolute",right:"100px",width:"550px",zIndex:"3",color:"white"}}>
                            <AlertTitle>{this.state.AlertTitle}</AlertTitle>
                            {this.state.message}
                        </Alert>

                    </div>
                )}


            <div style={{width:'90%',margin:'auto', backgroundColor:'white' , marginTop:'50px',}}>
                <Typography variant="h4" style={style}>User Details</Typography>
                <Button variant="contained" style={{backgroundColor:'#03a9f4',color:'white',float:'right',marginRight:'30px'}} onClick={() => this.addUser()}>
                    Add User
                </Button>

                <Table>
                    <TableHead>
                        <TableRow>
                            {/* <TableCell>Id</TableCell> */}
                            <TableCell align="left">UserName</TableCell>
                            <TableCell align="left">FirstName</TableCell>
                            <TableCell align="left">LastName</TableCell>
                            <TableCell align="left">Phone</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Address</TableCell>
                            <TableCell align="left">Roles</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(row => (
                            <TableRow key={row.userId}>
                                {/* <TableCell component="th" scope="row">
                                    {row.userId}
                                </TableCell> */}
                                <TableCell align="left">{row.userName}</TableCell>
                                <TableCell align="left">{row.firstName}</TableCell>
                                <TableCell align="left">{row.lastName}</TableCell>
                                <TableCell align="left">{row.phoneNumber}</TableCell>
                                <TableCell align="left">{row.email}</TableCell>
                                <TableCell align="left">{row.address}</TableCell>
                                <TableCell align="left">
                                    {/* <TableRow> */}
                                        {row.roles.map(row1 => (
                                            <TableCell align="left">{row1.name}</TableCell>
                                        ))}
                                    {/* </TableRow> */}
                                </TableCell>
                                
                                <TableCell align="left" ><Button href = {"editUser/" + row.userId}><CreateIcon /></Button></TableCell>
                                <TableCell align="left" onClick={() => this.deleteUser(row.userId)}><Button><DeleteIcon/></Button></TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>
            </div>
        );
    }

}

export default UserDetails;
