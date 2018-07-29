import LoginPage from "views/Pages/LoginPage.jsx";
import RegisterPage from "views/Pages/RegisterPage.jsx";
// import LockScreenPage from "views/Pages/LockScreenPage.jsx";
import PasswordForget from "views/Pages/PasswordForget.jsx";

// @material-ui/icons
import PersonAdd from "@material-ui/icons/PersonAdd";
import Fingerprint from "@material-ui/icons/Fingerprint";
import LockOpen from "@material-ui/icons/LockOpen";

const pagesRoutes = [
  {
    path: "/pages/register-page",
    name: "Register Page",
    short: "Register",
    mini: "RP",
    icon: PersonAdd,
    component: RegisterPage
  },
  {
    path: "/pages/login-page",
    name: "Login Page",
    short: "Login",
    mini: "LP",
    icon: Fingerprint,
    component: LoginPage
  },
  
  {
    path: "/pages/pw-forget",
    name: "Password Forget",
    short: "Forgotten Password",
    mini: "FPW",
    icon: LockOpen,
    component: PasswordForget
  },
  
  {
    redirect: true,
    path: "/pages",
    pathTo: "/pages/login-page",
    name: "Login Page"
  }
];

export default pagesRoutes;
