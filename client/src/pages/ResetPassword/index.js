import React, { Component, Fragment } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { signupRequest } from "../../redux/actions/registration.action";
import { ProductPageEndPoint } from "../../routes/Routes";
import { Col } from "react-flexbox-grid";
import { t, Trans } from "@lingui/macro";
import { ReactComponent as GGICON } from "../../assets/icons/GGICON.svg";
import { ReactComponent as FBICON } from "../../assets/icons/FBICON.svg";
import { SignupContainer, ContainerRow, ImageOverlay } from "./styles";
import Checkbox from "@material-ui/core/Checkbox";
import LoaderComponent from "../../components/LoaderComponent";
import { EmailField, PasswordField } from "./inputField";
import { Button } from "@material-ui/core";
import { apiUrl } from "../../constants/urls";
import { addErrorItemInAlert } from "../../redux/actions/alert.action";
import axios from "axios";
import { I18n } from "@lingui/react";
import {
  passwordValidator,
  emailValidator,
} from "../../utils/emailPasswordValidator";
import { logoutRequest } from "../../redux/actions/authentication.action";
import { addSuccessItemInAlert } from "../../redux/actions/alert.action";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      password2: "",
      password3: "",
      errorState: null,
      loading: false,
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }

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

  handleInputPassword3 = (value) => {
    this.setState({
      password3: value,
    });
  };

  onReset = async () => {
    const { password, password2, password3 } = this.state;

    if (
      !passwordValidator(password) ||
      !passwordValidator(password2) ||
      !passwordValidator(password3)
    ) {
      this.setState({ errorState: "Password must be 8 characters long" });
      return;
    }

    if (password2 !== password3) {
      this.setState({ errorState: "New Password doesn't match" });
      return;
    }

    let url = apiUrl + `/users/password`;
    if (!url) return;
    this.setState({ loading: true });
    if (this.props.user == null) {
      this.setState({ loading: false });
      this.props.addErrorItemInAlert({
        message: "Please Login First",
      });
      return;
    } else {
      try {
        const responce = await axios.post(url, {
          user_id: this.props.user.id,
          password: this.state.password,
          new_password: this.state.password2,
        });

        if (responce.status == 200 || responce.status == 201) {
          this.setState({ loading: false });
          this.props.addSuccessItemInAlert({
            message: "Password Updated",
          });
          // this.props.logoutRequest();
          this.props.history.push("/admin");
        } else {
          this.setState({ loading: false });
          this.setState({ errorState: "Password not updated" });
          this.props.addErrorItemInAlert({
            message: responce.message,
          });
        }
      } catch (error) {
        this.setState({ loading: false });
        this.props.addErrorItemInAlert({
          message: "Password does not match",
        });
        return;
      }
    }
  };

  render() {
    const { loggedIn, errorState } = this.state;
    // TODO: fix this
    if (loggedIn) {
      return <Redirect to={ProductPageEndPoint} push={false} />;
    }
    return (
      <I18n>
        {({ i18n }) => (
          <SignupContainer width={this.props.windowWidth}>
            <h1
              className="navPath"
              onClick={() => this.props.history.push("/admin")}
            >
              &lt; Back to Home
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
                    <h4 className="check-valid">{errorState}</h4>
                    <h1>{i18n._(t`Reset Password`)} </h1>
                    <div class="password-section">
                      <label for="outlined-basic">
                        {i18n._(t`Current Password`)}*
                      </label>
                      <br />
                      <div class="input-field">
                        <PasswordField
                          onChange={(event) =>
                            this.handleInputPassword(event.target.value)
                          }
                        />
                      </div>
                      <div class="password-section">
                        <label for="outlined-basic">
                          {i18n._(t`New Password`)}*
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
                    </div>
                    <div class="password-section">
                      <label for="outlined-basic">
                        {i18n._(t`Confirm New Password`)}*
                      </label>
                      <br />
                      <div class="input-field">
                        <PasswordField
                          onChange={(event) =>
                            this.handleInputPassword3(event.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div id="signup-button">
                      <Button onClick={this.onReset} className="signup-button">
                        {i18n._(t`RESET`)}
                      </Button>
                    </div>
                  </div>
                )}
              </Col>
            </ContainerRow>
          </SignupContainer>
        )}
      </I18n>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addErrorItemInAlert,
      logoutRequest,
      addSuccessItemInAlert,
    },
    dispatch
  );

const mapStateToProps = (state) => {
  const { products, loading, error } = state.product;
  const { cartItems, isOpen, totalPrice } = state.cart;
  const { user } = state.authentication;

  return {
    products,
    loading,
    error,
    user,
    cartItems,
    isCartOpen: isOpen,
    totalPriceOfCart: totalPrice,
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ResetPassword);
