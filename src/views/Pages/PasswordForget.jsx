import React from "react";
import PropTypes from "prop-types";
import { auth } from "../../firebase";
import { withRouter } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";

// @material-ui/icons
// import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
// import LockOutline from "@material-ui/icons/LockOutline";

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

// react component used to create sweet alerts
import SweetAlert from "react-bootstrap-sweetalert";

// import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";

import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";



const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  error: null,
  cardAnimaton: "cardHidden",
  alert: null,
  show: false
};


class PasswordForget extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
       ...INITIAL_STATE 
    };
    this.hideAlert = this.hideAlert.bind(this);
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

  titleAndTextAlert() {
    this.setState({
      alert: (
        <SweetAlert
          style={{ display: "block", marginTop: "-100px" }}
          title="Success!"
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
        >
         An Email has been sent to your provided Email address. Check here to reset your password
        </SweetAlert>
      )
    });}
    hideAlert() {
      this.setState({
        alert: null
      });
    }
  onSubmit = (event) => {
    const { email } = this.state;
    const {
      history,
    } = this.props;

    auth.doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        alert("An email has been sent to you with instructions to reset your password");
        history.push("/pages/login-page");
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }
  render() {
    const { classes } = this.props;
    const {
      email,
     
      error,
    } = this.state;

    const isInvalid =
      
      email === '';

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
                  
                    <h4 className={classes.cardTitle}>Forgot Your Password?</h4>
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
                      labelText="Email..."
                      id="email"
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
                    
                  </CardBody>
                  <CardFooter className={classes.justifyContentCenter}>
                    <Button 
                    disabled={isInvalid} 
                    type="submit" 
                    color="rose" 
                    simple 
                    size="lg" 
                    block
                    onClick={this.titleAndTextAlert.bind(this)}>
                      Request Password Reset
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

PasswordForget.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(loginPageStyle)(PasswordForget));
