import React, { Component, Fragment } from "react";
import { withRouter, Redirect } from "react-router-dom";
import styled from "styled-components";
import LoaderComponent from "../../components/LoaderComponent";
import { t, Trans } from "@lingui/macro";
import { I18n } from "@lingui/react";
import Theme from "../../theme/Theme";
import { compose } from "redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { signupRequest } from "../../redux/actions/registration.action";
import { useHistory } from "react-router-dom";
import { ProductPageEndPoint } from "../../routes/Routes";
import { Col } from "react-flexbox-grid";
import { ReactComponent as LoginImage } from "../../assets/images/login-rectangle.svg";
import { ReactComponent as GGICON } from "../../assets/icons/GGICON.svg";
import { ReactComponent as FBICON } from "../../assets/icons/FBICON.svg";
import { SignupContainer, ContainerRow, ImageOverlay } from "./styles";
import Checkbox from "@material-ui/core/Checkbox";
import { EmailField, PasswordField } from "./inputField";
import {
  passwordValidator,
  emailValidator,
} from "../../utils/emailPasswordValidator";
import { ReactComponent as FBICON1 } from "../../assets/icons/facebook-1.svg";
import { ReactComponent as FBICON2 } from "../../assets/icons/facebook-2.svg";
import { ReactComponent as GGICON1 } from "../../assets/icons/google-1.svg";
import { ReactComponent as GGICON2 } from "../../assets/icons/google-2.svg";
import { addSuccessItemInAlert } from "../../redux/actions/alert.action";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      password2: "",
      errorState: null,
      signupSuccessful: false,
      checked: false,
    };
  }

  handleChange = (event) => {
    console.log(event.target.checked);
    this.setState({
      checked: event.target.checked,
    });
  };

  static getDerivedStateFromProps = (props, state) => {
    if (
      props.registered === true &&
      props.error === null &&
      props.registering === false
    ) {
      props.history.push("/login");
      props.addSuccessItemInAlert({ message: "Signup Successful" });

      return {
        signupSuccessful: true,
      };
    } else if (props.error) {
      return {
        errorState: props.error,
      };
    }
  };

  handleInputEmail = (value) => {
    this.setState({
      email: value,
    });
  };

  handleInputPassword = (value) => {
    this.setState({
      password: value,
    });
  };

  handleInputPassword2 = (value) => {
    this.setState({
      password2: value,
    });
  };

  onSignup = () => {
    const { email, password, password2, name, checked } = this.state;

    if (!passwordValidator(password)) {
      this.setState({
        errorState:
          "Password must be 8 characters long And must contains Upper case letters and LowerCase letters",
      });
      return;
    }

    if (password !== password2) {
      this.setState({ errorState: "Password doesn't match" });
      return;
    }

    if (!emailValidator(email)) {
      this.setState({ errorState: "Email not valid" });
      return;
    }
    if (!checked) {
      this.setState({ errorState: "please select terms and condition box" });
      return;
    }

    this.props.signupRequest({
      email,
      password,
    });
  };
  render() {
    const { loggedIn, errorState } = this.state;
    // TODO: fix this
    if (loggedIn) {
      return <Redirect to={ProductPageEndPoint} push={false} />;
    }
    return (
      <SignupContainer width={this.props.windowWidth}>
        <h1 onClick={() => this.props.history.push("/")} id="backHome">
          &lt; <Trans>Back to Home</Trans>
        </h1>
        <ContainerRow width={this.props.windowWidth}>
          <Col md={6} className="image-section">
            <ImageOverlay />
          </Col>
          <Col md={6}>
            {this.props.registering ? (
              <LoaderComponent />
            ) : (
              <div class="signup-form">
                <h4 id="check-valid">{errorState}</h4>
                <h1>
                  <Trans>SIGN UP</Trans>
                </h1>
                <div class="email-section">
                  <label for="outlined-basic">
                    <Trans>Email Address</Trans>*
                  </label>
                  <br />
                  <div class="input-field">
                    <EmailField
                      onChange={(event) =>
                        this.handleInputEmail(event.target.value)
                      }
                    />
                  </div>
                </div>
                <div class="password-section">
                  <label for="outlined-basic">
                    <Trans>Password</Trans>*
                  </label>
                  <br />
                  <div class="input-field">
                    <PasswordField
                      onChange={(event) =>
                        this.handleInputPassword(event.target.value)
                      }
                    />
                  </div>
                </div>
                <div class="password-section">
                  <label for="outlined-basic">
                    <Trans>Confirm Password</Trans>*
                  </label>
                  <br />
                  <div class="input-field">
                    <PasswordField
                      onChange={(event) =>
                        this.handleInputPassword2(event.target.value)
                      }
                    />
                  </div>
                </div>
                {/* <div class="forget-password">
                  <a href="#">Forgot Password?</a>
                </div> */}
                <div id="signup-button">
                  <button onClick={this.onSignup} class="signup-button">
                    <Trans>SIGN UP</Trans>
                  </button>
                </div>
                <div class="account-exist">
                  <p>
                    <Trans>Have an account</Trans>
                  </p>
                  <a href="/login">
                    <Trans>LOG IN</Trans>
                  </a>
                </div>
                <div class="term-condition">
                  <Checkbox
                    color="primary"
                    checked={this.state.checked}
                    onChange={this.handleChange}
                    inputProps={{ "aria-label": "checkbox with default color" }}
                  />
                  <h3>
                    <Trans>By joining, you agree to our</Trans>
                  </h3>{" "}
                  <p>
                    {" "}
                    <Trans>Terms and Conditions</Trans>
                  </p>
                </div>
                {/* <div class="join-with">
                <div class="horizontal-line"></div>
                <h2>Or Join With</h2>
                <div class="horizontal-line"></div>
              </div>
              <div id="fb-button">
                <button class="fb-button">
                  <FBICON1 />
                  <FBICON2 class="fb-name" />
                </button>
              </div>
              <div id="gg-button">
                <button class="gg-button">
                  <GGICON1 />
                  <GGICON2 class="gg-name" />
                </button>
              </div> */}
              </div>
            )}
          </Col>
        </ContainerRow>
      </SignupContainer>
    );
  }
}

const mapStateToProps = (state) => {
  const { registering, registered, error } = state.registration;

  return {
    registering,
    registered,
    error,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      signupRequest,
      addSuccessItemInAlert,
    },
    dispatch
  );

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Signup);
