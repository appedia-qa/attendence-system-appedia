import React, {Component, Fragment} from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import {t, Trans} from "@lingui/macro";
import {I18n} from "@lingui/react";
import Theme from '../theme/Theme';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { withAlert } from "react-alert";

class Main extends Component {

  static getDerivedStateFromProps(props, state) {
    if (!props.user) {
      props.history.push('/login');
    } else {
      props.history.push('/products');
    }
  }

  render() {
    return (
      <div><p>Loading</p></div>
    )
  }
}


const mapStateToProps = state => {
  const {
    user
  } = state.authentication;

  return {
    user
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Main);
