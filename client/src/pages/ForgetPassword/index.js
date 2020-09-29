import React, { Component, Fragment } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loginRequest } from "../../redux/actions/authentication.action";
import { ProductPageEndPoint } from "../../routes/Routes";
import { USER_AUTH_KEY } from "../../redux/constants";
import { Col } from "react-flexbox-grid";
import { ReactComponent as GGICON } from "../../assets/icons/GGICON.svg";
import { ReactComponent as FBICON } from "../../assets/icons/FBICON.svg";
import { LoginContainer, ContainerRow, ImageOverlay } from "./styles";
import LoaderComponent from "../../components/LoaderComponent";
import { EmailField, PasswordField } from "./inputField";
import { Button } from "@material-ui/core";
import { apiUrl } from "../../constants/urls";
import axios from "axios";
import {
  addErrorItemInAlert,
  addSuccessItemInAlert,
} from "../../redux/actions/alert.action";
import {
  passwordValidator,
  emailValidator,
} from "../../utils/emailPasswordValidator";
import { I18n } from "@lingui/react";
import { t, Trans } from "@lingui/macro";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      errorState: null,
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
      email: value,
    });
  };

  handleInputPassword = (value) => {
    this.setState({
      password: value,
    });
  };
  onGeneratePassword = async () => {
    if (emailValidator(this.state.email)) {
      let url = apiUrl + `/forgot/password`;
      if (!url) return;
      try {
        const responce = await axios.post(url, {
          email: this.state.email,
        });
        if (responce.status == 200 || responce.status == 201) {
          this.setState({ loading: false });
          this.setState({ errorState: `${responce.data.message}` });
          this.props.addSuccessItemInAlert({
            message: `${responce.data.message}`,
          });
          this.props.history.push("/login");
        } else {
          this.setState({ loading: false });
          this.setState({ errorState: `${responce.data.message}` });
          this.props.addErrorItemInAlert({
            message: `${responce.data.message}`,
          });
        }
      } catch (error) {
        this.setState({ loading: false });
        this.props.addErrorItemInAlert({
          message: "Please try again",
        });
        return;
      }
    } else {
      this.setState({ errorState: "Please enter valid email" });
    }
  };
  render() {
    const { loggedIn, errorState } = this.state;
    if (loggedIn) {
      return <Redirect to={ProductPageEndPoint} push={false} />;
    }
    return (
      <I18n>
        {({ i18n }) => (
          <LoginContainer width={this.props.windowWidth}>
            <h1
              className="navPath"
              onClick={() => this.props.history.push("/")}
            >
              &lt; Back to Home
            </h1>
            <ContainerRow width={this.props.windowWidth}>
              <Col md={6} className="image-section">
                <ImageOverlay />
              </Col>
              <Col md={6}>
                {this.props.loading ? (
                  <LoaderComponent />
                ) : (
                  <div class="login-form">
                    <h4 id="check-valid">{errorState}</h4>
                    <h1> {i18n._(t`Forgot Password`)} ? </h1>
                    <div class="email-section">
                      <label for="outlined-basic">
                        {i18n._(t`Email Address`)}*
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
                    <div id="login-button">
                      <Button
                        onClick={this.onGeneratePassword}
                        className="login-button"
                      >
                        {i18n._(t`Regenerate Password and Send to Email`)}
                      </Button>
                      <div style={{display:'flex',justifyContent:'center'}}>
                      <Button
                        className="goto-login"
                        onClick={() => this.props.history.push("/login")}
                      >
                        {i18n._(t`Back to login`)}
                      </Button>
                      </div>
                    </div>
                  </div>
                )}
              </Col>
            </ContainerRow>
          </LoginContainer>
        )}
      </I18n>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addErrorItemInAlert,
      addSuccessItemInAlert,
    },
    dispatch
  );
const mapStateToProps = (state) => {
  // const { products, loading, error } = state.product;
  // const { cartItems, isOpen, totalPrice } = state.cart;
  // const { user } = state.authentication;
  // return {
  //   products,
  //   loading,
  //   error,
  //   user,
  //   cartItems,
  //   isCartOpen: isOpen,
  //   totalPriceOfCart: totalPrice,
  // };
};
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ForgotPassword);
