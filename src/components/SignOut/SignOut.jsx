import React from 'react';
import { Link } from "react-router-dom"
import { auth } from "../../firebase";
import Button from "../CustomButtons/Button.jsx"


const SignOutButton = () =>
  
<Link to="/pages">
  <Button
    width="100%"
    color="warning"
    onClick={auth.doSignOut}
  >
  
    Log Out
  </Button>
  </Link>

export default SignOutButton;