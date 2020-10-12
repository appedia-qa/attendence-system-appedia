import React, { Component, Fragment } from "react";
import { withRouter, Redirect } from "react-router-dom";
import styled from "styled-components";
import { t, Trans } from "@lingui/macro";
import { I18n } from "@lingui/react";
import Theme from "../../theme/Theme";
import { compose } from "redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loginRequest } from "../../redux/actions/authentication.action";
import { useHistory } from "react-router-dom";
import { ProductPageEndPoint } from "../../routes/Routes";
import LoaderComponent from "../../components/LoaderComponent";
import { USER_AUTH_KEY } from "../../redux/constants";
import { Col } from "react-flexbox-grid";
import { ReactComponent as LoginImage } from "../../assets/images/login-rectangle.svg";
import { ReactComponent as GGICON } from "../../assets/icons/GGICON.svg";
import { ReactComponent as FBICON } from "../../assets/icons/FBICON.svg";
import { LoginContainer, ContainerRow, ImageOverlay } from "./styles";
import { EmailField, PasswordField } from "./inputField";
import {
  passwordValidator,
  emailValidator,
} from "../../utils/emailPasswordValidator";
import { ReactComponent as HeaderArb } from "../../assets/images/headerArb.svg";
import { ReactComponent as HeaderEng } from "../../assets/images/headerEng.svg";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorState: null,
      errorFileds: {
        passwordTouched: false,
        emailToched: false,
      },
    };
  }

  async componentDidMount() {
    const token = localStorage.getItem(USER_AUTH_KEY);
    window.scrollTo(0, 0);
  }

  static getDerivedStateFromProps = (props, state) => {
    if (props.loggedIn === true && props.user !== null) {
      props.history.push("/");
    } else if (props.loggingError) {
      return {
        errorState: props.loggingError,
      };
    }
  };

  handleInputEmail = (value) => {
    this.setState({
      ...this.state,
      email: value,
      errorFileds: {
        emailToched: false,
      },
    });
  };

  handleInputPassword = (value) => {
    this.setState({
      ...this.state,
      password: value,
      errorFileds: {
        passwordTouched: false,
      },
    });
    this.setState({});
  };
  onLogin = () => {
    if (
      emailValidator(this.state.email) &&
      passwordValidator(this.state.password)
    ) {
      this.props.loginRequest({
        email: this.state.email,
        password: this.state.password,
      });
      this.setState({ loggingIn: true, loggedIn: false });
    } else {
      let emailFlag = false;
      let passwordFlag = false;
      if (!passwordValidator(this.state.password)) {
        passwordFlag = true;
      }
      if (!emailValidator(this.state.email)) {
        emailFlag = true;
      }
      this.setState({
        ...this.state,
        errorFileds: {
          passwordTouched: passwordFlag,
          emailToched: emailFlag,
        },
      });
    }
  };
  render() {
    const {
      loggedIn,
      errorState,
      errorFileds: { passwordTouched, emailToched },
    } = this.state;

    if (loggedIn) {
      return <Redirect to={ProductPageEndPoint} push={false} />;
    }
    return (
      <LoginContainer width={this.props.windowWidth}>
        <ContainerRow width={this.props.windowWidth}>
          <Col md={6} style={{ marginTop: "0px" }} className="image-section">
            <ImageOverlay style={{ marginTop: "0px" }}>
              <HeaderArb />
            </ImageOverlay>
            <ImageOverlay>
              <HeaderEng />
            </ImageOverlay>
          </Col>
          <Col md={6} style={{ display: "flex" }}>
            {this.props.loading ? (
              <LoaderComponent height={"80vh"} />
            ) : (
              <div class="login-form">
                <h4 id="check-valid">{errorState}</h4>
                <div class="email-section">
                  <label for="outlined-basic">
                    <Trans>User Name</Trans>
                  </label>
                  <br />
                  <div class="input-field">
                    <EmailField
                      emailToched={emailToched}
                      onChange={(event) =>
                        this.handleInputEmail(event.target.value)
                      }
                    />
                  </div>
                </div>
                <div class="password-section">
                  <label for="outlined-basic">
                    <Trans>Password</Trans>
                  </label>
                  <br />
                  <div class="input-field">
                    <PasswordField
                      passwordTouched={passwordTouched}
                      onChange={(event) =>
                        this.handleInputPassword(event.target.value)
                      }
                    />
                  </div>
                </div>
                <div id="login-button">
                  <button onClick={this.onLogin} class="login-button">
                    <Trans>Login</Trans>
                  </button>
                </div>
              </div>
            )}
          </Col>
        </ContainerRow>
      </LoginContainer>
    );
  }
}

const mapStateToProps = (state) => {
  const { user, loggingIn, error, loggedIn, loading } = state.authentication;

  return {
    user,
    loggedIn,
    loggingIn,
    loading,
    loggingError: error,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      loginRequest,
    },
    dispatch
  );

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Login);
