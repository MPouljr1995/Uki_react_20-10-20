import React,{Component} from 'react';
import { Grid, FormControl, OutlinedInput} from '@material-ui/core';
import { Paper, Typography, Button,Box } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';

import CreateIcon from '@material-ui/icons/Create';
import SaveIcon from '@material-ui/icons/Save';
import Close from '@material-ui/icons/Close';
import AccountBox from '@material-ui/icons/AccountBox';

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

import './Css/Profile.css';
import CommonApi from '../ApiServices/CommonApi';



class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {show: 'true'};
    this.state={
      firstNameEdite:false,
      lastNameEdite:false,
    //   emailEdite:false,
      phoneEdite:false,
      addressEdite:false,

      showInfo:'show',
      setName:'',

      message:'',
      severity:'',
      AlertTitle:'',

      updateFirstName:localStorage.getItem('firstName'),
      updateLastName:localStorage.getItem('lastName'),
      updatePhone:localStorage.getItem('phoneNumber'),
      updateAddress:localStorage.getItem('address'),
     
      username:localStorage.getItem('userName'),
      email:localStorage.getItem('email'),
      userId:localStorage.getItem('userId'),
      roles:localStorage.getItem('roles'),
      first_name:localStorage.getItem('firstName'),
      last_name: localStorage.getItem('lastName'),
      address: localStorage.getItem('address'),
      phone:localStorage.getItem('phoneNumber'),
    };
  }

  componentDidMount() {
        this.loadUser(localStorage.getItem('userId'));
  }

  loadUser(nUserId) {
      CommonApi.getUserById(nUserId)
      .then((res) => {
          console.log(res);
        //   localStorage.setItem("firstName", res.data.firstName)
          localStorage.setItem("email", res.data.email)
          localStorage.setItem("firstName", res.data.firstName)
          localStorage.setItem("lastName", res.data.lastName)
          localStorage.setItem("phoneNumber", res.data.phoneNumber)
          localStorage.setItem("address", res.data.address)
      })
  }

  AllDetailUpdate=() => {
      let user = {
        // userId: "5f7f45371b8c13380cce1703",
        userId: localStorage.getItem('userId'),
        firstName: localStorage.getItem('firstName'),
        lastName : localStorage.getItem('lastName'),
        phoneNumber: localStorage.getItem('phoneNumber'),
        address: localStorage.getItem('address'),
        // updateRole: localStorage.getItem('roles'),
        updateRole: ['user']
      }
      CommonApi.userUpdate(user)
      .then(res => {
          this.setState({
            message:'USER UPDATED..',
            severity:'success',
            AlertTitle:'success',
          })

          setTimeout(() =>{
            this.setState({
                message:''
            })
        },2000)
      })

      .catch(error => {
        this.setState({
          message:'error..',
          severity:'error',
          AlertTitle:'error',
        })

        setTimeout(() =>{
          this.setState({
              message:''
          })
      },2000)
      })
  }


//profile_name edite start
    editeFirstName=()=>{
        this.setState({
          firstNameEdite:true,
        })
    }

    onChangeUpdateFirstName=(e)=>{
        this.setState({
          updateFirstName:e.target.value,
        })
    }

    editeFirstNameCancel=()=>{
        this.setState({
            updateFirstName:localStorage.getItem('firstName'),
          firstNameEdite:false,
        })
    }

    editeFirstNameUpdate=()=>{
        this.setState({
            first_name:this.state.updateFirstName,
          firstNameEdite:false,
        })
        localStorage.setItem('firstName', this.state.updateFirstName);
    }
//profile_name edite end


//profile last_name edite start
    editeLastName=()=>{
        this.setState({
          lastNameEdite:true,
        })
    }

    onChangeUpdateLastName=(e)=>{
        this.setState({
          updateLastName:e.target.value,
        })
    }

    editeLastNameCancel=()=>{
        this.setState({
            updateLastName:localStorage.getItem('lastName'),
          lastNameEdite:false,
        })
    }

    editeLastNameUpdate=()=>{
        this.setState({
            last_name:this.state.updateLastName,

          lastNameEdite:false,
        })
        localStorage.setItem('lastName', this.state.updateLastName);
    }
//profile last_name edite end



//profile email edite start
    // editeEmail=()=>{
    //     this.setState({
    //       emailEdite:true,
    //     })
    // }

    // onChangeUpdateEmail=(e)=>{
    //     this.setState({
    //       updateEmail:e.target.value,
    //     })
    // }

    // editeEmailCancel=()=>{
    //     this.setState({
    //         updateEmail:localStorage.getItem('email'),
    //       emailEdite:false,
    //     })
    // }

    // editeEmailUpdate=()=>{
    //     this.setState({
    //         email:this.state.updateEmail,

    //       emailEdite:false,
    //     })
    //     localStorage.setItem('email', this.state.updateEmail);
    // }
//profile email edite end


//profile phone edite start
    editePhone=()=>{
        this.setState({
          phoneEdite:true,
        })
    }

    onChangeUpdatePhone=(e)=>{
        this.setState({
          updatePhone:e.target.value,
        })
    }

    editePhoneCancel=()=>{
        this.setState({
            updatePhone:localStorage.getItem('phoneNumber'),
          phoneEdite:false,
        })
    }

    editePhoneUpdate=()=>{
        this.setState({
            phone:this.state.updatePhone,
          phoneEdite:false,
        })
        localStorage.setItem('phoneNumber', this.state.updatePhone);
    }
//profile phone edite end



//profile address edite start
    editeAddress=()=>{
        this.setState({
          addressEdite:true,
        })
    }

    onChangeUpdateAddress=(e)=>{
        this.setState({
          updateAddress:e.target.value,
        })
    }

    editeAddressCancel=()=>{
        this.setState({
            updateAddress:localStorage.getItem('address'),
          addressEdite:false,
        })
    }

    editeAddressUpdate=()=>{
        this.setState({
            address:this.state.updateAddress,

          addressEdite:false,
        })
        localStorage.setItem('address', this.state.updateAddress);
    }
//profile address edite end




  render(){


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

        <Paper className='profileDivWarraper' elevation={1}>
          <Typography id="profileHeading" ><AccountBox style={{marginRight:'5px',fontSize: '40px',position:'relative',top:'10px'}}/>My Profile</Typography>
            <Grid container id="profileGrid">
              {/*<Grid item xs={3} >
                  <div className='profileSideDiv'>
                    <br/>
                    <Button  type='button' onClick={() => this.handleClick('personalInfoContentDiv')}  id='proSideDivBtn'>Personal Info</Button><br/><br/>
                    <Divider />
                    <br/>
                    <Button  onClick={() => this.handleClick('editeProfileDiv')} id='proSideDivBtn'>Edite Personal Info</Button><br/><br/><Divider /><br/>
                    <Button  onClick={() => this.handleClick('myShopDiv')} id='proSideDivBtn'>My Shops</Button><br/><br/><Divider /><br/>
                    <Button  onClick={() => this.handleClick('myReviewDiv')} id='proSideDivBtn'>My Review</Button><br/><br/><Divider /><br/>
                  </div>
              </Grid>*/}


                  <Grid item xs={12} sm={12} md={6}>
                    <Paper id="userNameDiv" elevation={3}>
                        <Typography variant="h6" id="userNameDivTitle">User name</Typography>
                        <Typography variant="h5" id="userNameLabel">{this.state.username}</Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <Paper id="userNameDiv" elevation={3}>
                        <Typography variant="h6" id="userNameDivTitle">Email</Typography>
                        <Typography variant="h5" id="userNameLabel">{this.state.email}</Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <Paper id="firstNameDiv" elevation={3}>
                        <Box id="firstNamebox">
                          <Typography variant="h6" id="firstNameDivTitle">First name</Typography>
                          {!this.state.firstNameEdite &&(
                              <Typography variant="h5" id="firstNameLabel">{this.state.first_name}</Typography>
                          )}
                          {this.state.firstNameEdite &&(
                              <FormControl variant="outlined" id='firstNameIp'>
                                  <InputLabel htmlFor="component-outlined">First Name</InputLabel>
                                  <OutlinedInput
                                      id="component-outlined"
                                      value={this.state.updateFirstName}
                                      onChange={this.onChangeUpdateFirstName}
                                      label="First Name"
                                  />
                              </FormControl>
                          )}
                        </Box>
                        {!this.state.firstNameEdite &&(
                            <Button id="firstNameEditeBtn" onClick={this.editeFirstName}> <CreateIcon style={{marginRight:'5px'}}/> Edite</Button>
                        )}
                        {this.state.firstNameEdite &&(
                          <Box style={{float:'right'}}>
                            <Button id="firstNameEditeCancelBtn" onClick={this.editeFirstNameCancel}><Close style={{marginRight:'5px'}}/>Cancel</Button>
                            <Button id="firstNameEditeUpdateBtn" onClick={this.editeFirstNameUpdate}><SaveIcon style={{marginRight:'5px'}}/>Update</Button>
                          </Box>
                        )}
                    </Paper>

                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>

                    <Paper id="lastNameDiv" elevation={3}>
                        <Box id="lastNamebox">
                            <Typography variant="h6" id="lastNameDivTitle">Last name</Typography>
                            {!this.state.lastNameEdite &&(
                                <Typography variant="h5" id="lastNameLabel">{this.state.last_name}</Typography>
                            )}
                            {this.state.lastNameEdite &&(
                                <FormControl variant="outlined" id='proLastNameIp'>
                                    <InputLabel htmlFor="component-outlined">Last Name</InputLabel>
                                    <OutlinedInput
                                        id="component-outlined"
                                        value={this.state.updateLastName}
                                        onChange={this.onChangeUpdateLastName}
                                        label="Last Name"
                                    />
                                </FormControl>
                            )}

                        </Box>
                        {!this.state.lastNameEdite &&(
                            <Button id="lastNameEditeBtn" onClick={this.editeLastName}> <CreateIcon style={{marginRight:'5px'}}/> Edite</Button>
                        )}
                        {this.state.lastNameEdite &&(
                          <Box style={{float:'right'}}>
                            <Button id="lastNameEditeCancelBtn" onClick={this.editeLastNameCancel}><Close style={{marginRight:'5px'}}/>Cancel</Button>
                            <Button id="lastNameEditeUpdateBtn" onClick={this.editeLastNameUpdate}> <SaveIcon style={{marginRight:'5px'}}/>Update</Button>
                          </Box>
                        )}
                    </Paper>

                  </Grid>

                  {/* <Grid item xs={12} sm={12} md={6}>
                    <Paper id="emailDiv" elevation={3}>
                        <Box id="emailbox">
                            <Typography variant="h6" id="emailDivTitle">Email</Typography>
                            {!this.state.emailEdite &&(
                                <Typography variant="h5" id="emailLabel">{this.state.email}</Typography>
                            )}
                            {this.state.emailEdite &&(
                                <FormControl variant="outlined" id='emailIp'>
                                    <InputLabel htmlFor="component-outlined">Email</InputLabel>
                                    <OutlinedInput
                                        id="component-outlined"
                                        value={this.state.updateEmail}
                                        onChange={this.onChangeUpdateEmail}
                                        label="Email"
                                    />
                                </FormControl>
                            )}
                        </Box>
                        {!this.state.emailEdite &&(
                            <Button id="emailEditeBtn" onClick={this.editeEmail}> <CreateIcon style={{marginRight:'5px'}}/> Edite</Button>
                        )}
                        {this.state.emailEdite &&(
                          <Box style={{float:'right'}}>
                            <Button id="emailEditeCancelBtn" onClick={this.editeEmailCancel}><Close style={{marginRight:'5px'}}/>Cancel</Button>
                            <Button id="emailEditeUpdateBtn" onClick={this.editeEmailUpdate}><SaveIcon style={{marginRight:'5px'}}/>Update</Button>
                          </Box>
                        )}
                    </Paper>
                  </Grid> */}

                  <Grid item xs={12} sm={12} md={6}>

                    <Paper id="phoneDiv" elevation={3}>
                        <Box id="phonebox">
                            <Typography variant="h6" id="lastNameDivTitle">Phone Number</Typography>
                            {!this.state.phoneEdite &&(
                                <Typography variant="h5" id="emailLabel">{this.state.phone}</Typography>
                            )}
                            {this.state.phoneEdite &&(
                                <FormControl variant="outlined" id='emailIp'>
                                    <InputLabel htmlFor="component-outlined">Phone</InputLabel>
                                    <OutlinedInput
                                        id="component-outlined"
                                        value={this.state.updatePhone}
                                        onChange={this.onChangeUpdatePhone}
                                        label="Phone"
                                        type="Number"
                                    />
                                </FormControl>
                            )}
                        </Box>
                        {!this.state.phoneEdite &&(
                            <Button id="phoneEditeBtn" onClick={this.editePhone}><CreateIcon style={{marginRight:'5px'}}/>Edite</Button>
                        )}
                        {this.state.phoneEdite &&(
                          <Box style={{float:'right'}}>
                            <Button id="phoneEditeCancelBtn" onClick={this.editePhoneCancel}><Close style={{marginRight:'5px'}}/>Cancel</Button>
                            <Button id="phoneEditeUpdateBtn" onClick={this.editePhoneUpdate}> <SaveIcon style={{marginRight:'5px'}}/> Update</Button>
                          </Box>
                        )}
                    </Paper>

                  </Grid>



                  <Grid item xs={12} sm={12} md={6}>
                    <Paper id="addressDiv" elevation={3}>
                        <Box id="addressbox">
                            <Typography variant="h6" id="lastNameDivTitle">Address</Typography>
                            {!this.state.addressEdite &&(
                                <Typography variant="h5" id="emailLabel">{this.state.address}</Typography>
                            )}
                            {this.state.addressEdite &&(
                                <FormControl variant="outlined" id='emailIp'>
                                    <InputLabel htmlFor="component-outlined">Address</InputLabel>
                                    <OutlinedInput
                                        id="component-outlined"
                                        value={this.state.updateAddress}
                                        onChange={this.onChangeUpdateAddress}
                                        label="Address"
                                    />
                                </FormControl>
                            )}
                        </Box>
                        {!this.state.addressEdite &&(
                            <Button id="phoneEditeBtn" onClick={this.editeAddress}><CreateIcon style={{marginRight:'5px'}}/>Edite</Button>
                        )}
                        {this.state.addressEdite &&(
                          <Box style={{float:'right'}}>
                            <Button id="addressEditeCancelBtn" onClick={this.editeAddressCancel}><Close style={{marginRight:'5px'}}/>Cancel</Button>
                            <Button id="addressEditeUpdateBtn" onClick={this.editeAddressUpdate}><SaveIcon style={{marginRight:'5px'}}/>Update</Button>
                          </Box>
                        )}
                    </Paper>
                  </Grid>
                        <Box style={{float:'right'}}>
                            <Button id="AllUpdatelBtn" onClick={this.AllDetailUpdate}><SaveIcon style={{marginRight:'5px'}}/>All Update</Button>
                            <Button id="cancelBtn" href="/"><Close style={{marginRight:'5px'}}/>Cancel</Button>
                        </Box>
            </Grid>
        </Paper>
      </div>
    );
  }
}

export default Profile;
