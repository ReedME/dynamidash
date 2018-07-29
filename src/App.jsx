import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import { ScaleLoader } from "halogenium"
import { auth } from "firebase";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import { connect } from "react-redux";

import indexRoutes from "./routes/index";



const hist = createBrowserHistory();

class App extends React.Component {
  state = { loading: true, authenticated: false };
  
  componentWillMount() {
    const { onSetAuthUser } = this.props;
    auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          loading: false,
          authenticated: true
          });
          onSetAuthUser(user);
          console.log("auth true:"+user);
      } else {
        this.setState({
          loading: false,
          authenticated: false
          
        });
        onSetAuthUser(null);
        
      }
    });
  }

render(){
  const { loading, authenticated } = this.state;

  const spinnerStyle = {
  
    margin :"auto",
    height: "200px",
    width: "200px",
    position: "fixed",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    background: "red"
   
}

  if (loading) {
    console.log(loading);

    return(  
    <div align="center">
    <ScaleLoader className={spinnerStyle} color="#b70c0f" size="72px" margin="10px" loading={loading}  />
    </div>
    )
  }

    return(
      <div>
     
        <Router history={hist}>
    <Switch>
      {/* {indexRoutes.map((prop, key) => {
        return <Route path={prop.path} component={prop.component} key={key} />;
      })}
       */}
       
  <Route path={indexRoutes[0].path} component={indexRoutes[0].component} />
  <PrivateRoute 
  path={indexRoutes[1].path} 
  component={indexRoutes[1].component} 
  authenticated={authenticated} 
  />

      
      </Switch>


    
  </Router>

  </div>
    )
}
}


const mapDispatchToProps = (dispatch) => ({
  onSetAuthUser: (authUser) => dispatch({ type: 'AUTH_USER_SET', authUser }),
  
});


export default connect(null, mapDispatchToProps)(App);