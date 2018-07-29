import React from "react";
// import { connect } from "react-redux";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
// import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Badge from "components/Badge/Badge.jsx";
// import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import { db } from "../../firebase";
import { auth } from "firebase";
// import avatar from "assets/img/faces/marc.jpg";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};


class Personal extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        formDisabled: true,
        formSaved: null,
        email: "",
        uid: "",
        names: {
          firstName: "",
          surname: ""
        }
       
      }
      this.saveClick = this.saveClick.bind(this);
  }
  componentWillMount() {
    const currentUser = auth().currentUser;
    
    
console.log("what is currentUser: "+currentUser);
db.getCurrentUser(currentUser).then(doc => {
  let users = doc.data();
  this.setState({
    names:users.names,
    email:users.email,
    uid: currentUser.uid
  });
  console.log(this.state.names);
  })
  }
  setHider = () => {
    this.setState({ formSaved: null})

  }
  saveClick = (event) => {
    const names = this.state.names;
    const {
      email,
      uid
      } =  this.state;
    
     db.doUpdateUser(uid, names, email)
       
         this.setState({ formDisabled: true, formSaved: "Details updated!" });         
          setTimeout(this.setHider, 3000);
      event.preventDefault();
  }


  editClick = () => {
    
    this.setState({ 
      formDisabled: !this.state.formDisabled 
    });
   console.log("edit Click pressed: "+this.state.formDisabled);
  }
  
  

  render (){
  const { classes } = this.props;
  const { formDisabled, names, email, formSaved} = this.state; 
  

  return (
    <div>
      
      <Grid container>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
          
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Welcome {names.firstName}!</p>
              
              
            
            </CardHeader>
            <br />
            <br />
            <CardBody>
            
              <Grid container>
              
              {/* <GridItem xs={12} sm={12} md={3}>
                  <CardAvatar profile >
              
                <img src={avatar} alt="..." />
              
            </CardAvatar>
                </GridItem> */}
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="First Name"
                    id="firstName"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value: names ? names.firstName : "",
                      disabled: formDisabled,
                      onChange: event => this.setState({names:Object.assign({}, names, {firstName: event.target.value})})
                                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Surname"
                    id="lastName"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value: names.surname,
                      disabled: formDisabled,
                      onChange: event => this.setState({names:Object.assign({}, names, {surname: event.target.value})})
                                    
                    }}
                  />
                </GridItem>
                
              </Grid>
              <Grid container>
                <GridItem xs={12} sm={12} md={8}>
                  <CustomInput
                    labelText="E-Mail Address"
                    id="email"
                    formControlProps={{
                      fullWidth: true

                    }}
                    inputProps={{
                      value: email,
                      disabled: true,
                      onChange: event => this.setState({email : event.target.value})
                        
                    }}
                  />
                </GridItem>
                {/* <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText=""
                    id="last-name"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </Grid>
              <Grid container>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="City"
                    id="city"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Country"
                    id="country"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Postal Code"
                    id="postal-code"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </Grid>
              <Grid container>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel style={{ color: "#AAAAAA" }}>About me</InputLabel>
                  <CustomInput
                    labelText="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
                    id="about-me"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5
                    }}
                  />
                </GridItem> */}
              </Grid>
            </CardBody>
            <center>
                    { formSaved && <Badge color="success">{formSaved}</Badge>}
                    </center>
            <CardFooter>
              <Button color="primary" onClick={this.editClick} >Edit Profile</Button>
              <Button disabled={formDisabled} onClick={this.saveClick} color="primary">Save Profile</Button>
            </CardFooter>
          </Card>
          
        </GridItem>
        {/* <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            
            <CardBody profile>
              <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
              <h4 className={classes.cardTitle}>Alec Thompson</h4>
              <p className={classes.description}>
                Don't be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves Kanye
                I love Rick Owens’ bed design but the back is...
              </p>
              <Button color="primary" round>
                Follow
              </Button>
            </CardBody>
          </Card>
        </GridItem> */}
      </Grid>
      
    </div>
  );
}
}


export default withStyles(styles)(Personal);
