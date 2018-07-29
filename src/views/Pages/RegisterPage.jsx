import React from "react";
import PropTypes from "prop-types";
import { auth, db } from "../../firebase";
import { withRouter } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";

// @material-ui/icons
// import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
import LockOutline from "@material-ui/icons/LockOutline";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Badge from "components/Badge/Badge.jsx";

import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";

// import routes


const INITIAL_STATE = {
  names: {
    firstName: "",
    surname: ""
  },
  email:"",
  passwordOne:"",
  passwordTwo:"",
  error: null,
  cardAnimaton: "cardHidden",
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
})




class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
       ...INITIAL_STATE 
    };
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }

  onSubmit = (event) => {
    const names = this.state.names;
    const {
      email,
      passwordOne,
      } =  this.state;
    const {
      history,
    } = this.props;
    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
       // Create a user in your own accessible Firebase Database too
       db.doCreateUser(authUser.user.uid, names, email)
       .then(() => {
         this.setState(() => ({ ...INITIAL_STATE }));
         history.push("/dashboard");
       })
       .catch(error => {
         this.setState(byPropKey('error', error));
       });

   })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });
      event.preventDefault();
  }

  render() {
    const {
      names,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const passInvalid =
      passwordOne.length < 6 ||
      passwordOne !== passwordTwo ||
      passwordOne === "";

    const submitDisabled =
      names.surname === "" ||
      names.firstName === "" ||
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "";

    const firstNameInvalid =
    names.firstName === "";

    const surnameInvalid =
    names.surname === "";

    const emailInvalid = 
    email === "" ||
    !email.includes("@")  ;

    const { classes } = this.props;

     

    return (
      <div className={classes.content}>
        <div className={classes.container}>
        <center>
        
        </center>
          <GridContainer justify="center">
          
          
          
            <GridItem xs={12} sm={6} md={4}>
              <form onSubmit={this.onSubmit}>
                <Card login className={classes[this.state.cardAnimaton]}>
                  <CardHeader
                    className={`${classes.cardHeader} ${classes.textCenter}`}
                    color="rose"
                  >
                    <h4 className={classes.cardTitle}>Register</h4>
                    {/* <div className={classes.socialLine}>
                      {[
                        "fab fa-facebook-square",
                        "fab fa-twitter",
                        "fab fa-google-plus"
                      ].map((prop, key) => {
                        return (
                          <Button
                            color="transparent"
                            justIcon
                            key={key}
                            className={classes.customButtonClass}
                          >
                            <i className={prop} />
                          </Button>
                        );
                      })}
                    </div> */}
                  </CardHeader>
                  <CardBody>
                  <center>
                    { error && <Badge color="danger">{error.message}</Badge>}
                    </center>
                    <CustomInput
                      labelText="First Name"
                      id="firstName"
                      success={!firstNameInvalid}
                      
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        value: names.firstName,
                        onChange: event => this.setState({names:Object.assign({}, names, {firstName: event.target.value})}),
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputAdornmentIcon} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Surname"
                      id="surname"
                      success={!surnameInvalid}
                      
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        value: names.surname,
                        onChange: event => this.setState({names:Object.assign({}, names, {surname: event.target.value})}),
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputAdornmentIcon} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Email..."
                      id="email"
                      success={!emailInvalid}
                      error={emailInvalid}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "email",
                        value: email,
                        onChange: event => this.setState(byPropKey("email", event.target.value)),
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputAdornmentIcon} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Password"
                      id="passwordOne"
                      success={!passInvalid}
                      error={passInvalid}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "password",
                        value: passwordOne,
                        onChange: event => this.setState(byPropKey("passwordOne", event.target.value)),
                        endAdornment: (
                          <InputAdornment position="end">
                            <LockOutline
                              className={classes.inputAdornmentIcon}
                            />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Confirm Password"
                      id="passwordTwo"
                      success={!passInvalid}
                      error={passInvalid}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "password",
                        value: passwordTwo,
                        onChange: event => this.setState(byPropKey("passwordTwo", event.target.value)),
                        endAdornment: (
                          <InputAdornment position="end">
                            <LockOutline
                              className={classes.inputAdornmentIcon}
                            />
                          </InputAdornment>
                        )
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.justifyContentCenter}>
                  
                    <Button type="submit" disabled={submitDisabled} color="rose" simple size="lg" block>
                      Let's get started!
                    </Button>
                  </CardFooter>
                </Card>
              </form>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(loginPageStyle)(RegisterPage));
