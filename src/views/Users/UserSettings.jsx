import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
// import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
// import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Badge from "components/Badge/Badge.jsx";

import { auth } from "../../firebase";

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

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
  });
  
  const INITIAL_STATE = {
    passOne: '',
    passTwo: '',
    error: null,
  };
  

class ChangePassword extends Component {
    constructor(props) {
        super(props);
    
        this.state = { ...INITIAL_STATE };
      }

      
      onSubmit = (event) => {
        const { passOne } = this.state;
        const {
            history,
          } = this.props;
        auth.doPasswordUpdate(passOne)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
            alert("Please sign in again")
            history.push("/pages/login-page")
          })
          .catch(error => {
            this.setState(byPropKey('error', error));
          });
    
        event.preventDefault();
      }
    
      render() {
        const {
          passOne,
          passTwo,
          error,
        } = this.state;
    
        const isInvalid =
          passOne !== passTwo ||
          passOne === '';
          
        const classes = this.props.classes;
    
  return (
    <div>
      <Grid container>
      <form onSubmit={this.onSubmit}>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Change Password</h4>
              <p className={classes.cardCategoryWhite}>Change your Password</p>
            </CardHeader>
            <GridItem xs={12} sm={12} md={12}>
            <CardBody>
              
                {/* <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <FormLabel className={classes.labelHorizontal}>
                      Current Password
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={9}>
                    <CustomInput
                      id="currentPass"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "password"
                      }}
                    />
                  </GridItem>
                </GridContainer> */}
                <GridContainer>
                <center>
                    { error && <Badge color="danger">{error.message}</Badge>}
                    </center>
                  <GridItem xs={12} sm={12} md={12}>
                    <FormLabel className={classes.labelHorizontal}>
                      New Password
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      id="passOne"
                      success={!isInvalid}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "Password",
                        value: passOne,
                        onChange: event => this.setState(byPropKey("passOne", event.target.value)),
                      
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <FormLabel className={classes.labelHorizontal}>
                      Confirm Password
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      id="passTwo"
                      success={!isInvalid}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "Password",
                        value: passTwo,
                        onChange: event => this.setState(byPropKey("passTwo", event.target.value)),
                      
                      }}
                    />
                  </GridItem>
                </GridContainer>
                
                
              
            
          
            </CardBody>
            <CardFooter>
            <Button disabled={isInvalid} type="submit" color="primary">Update Password</Button>
         
                 </CardFooter>
            </GridItem>
          </Card>
        </GridItem>
        </form>
        {/* <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
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
export default withRouter(withStyles(styles)(ChangePassword));
