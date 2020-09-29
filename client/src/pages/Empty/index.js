import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as ErrorIcon } from "../../assets/icons/error-404.svg";
import { Typography } from "@material-ui/core";

const Container = styled.div`
  ${({ theme }) => `
  width:100%;
  margin-top: -20px;
  display:flex;
  padding: 0 2% 5% 2%;
  flex-direction:column;
  align-items:center;
  .imageError {
    width: 300px;
  }
  h1 {
    margin-top: -20px;
    color: #002040;
    font-size: 40px;
    font-weight: 400;
    white-space: nowrap;
  }
  h2 {
    margin-top: -10px;
    color: #002040;
    font-size: 25px;
    font-weight: 400;
  }
  button {
    width: 258px;
    height: 58px;
    border: 1px solid black;
    cursor: pointer;
    margin-left: -10px;
    &:hover {
      background-color: ${theme.palette.secondary.main};
      color: ${theme.palette.white.main};
    }
  }
`}
`;

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
    };
  }
  fun() {
    this.props.history.push("/");
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <Container>
        <ErrorIcon class="imageError" />
        <h1>WhOoOPS!</h1>
        <h2>Sorry we couldn't find that page</h2>
        <button onClick={this.fun.bind(this)}>GO TO HOME PAGE</button>
      </Container>
    );
  }
}

export default withRouter(Page);
