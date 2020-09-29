import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { t, Trans } from "@lingui/macro";
import { I18n } from "@lingui/react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MarineToSpanish, MarineToEnglish } from "../data/MarineSpanish";
// import {Link} from "react-router-dom";
import Volcanoes from "./../data/Volcanoes";
import { selectOverviewReducers } from '../redux/selectors/overview';
import { fetchOverviewData } from '../redux/actions/overview';

const CardContainer = styled.div`
  display: flex;
  flex: 0 1 auto;
  flex-wrap: wrap;

  margin-right: -0.5rem;
  margin-left: -0.5rem;

  box-sizing: border-box;

  > div {
    padding: 0.5rem;
    flex-basis: 33.3333333%;
    -ms-flex-preferred-size: 33.3333333%;
    max-width: 33.3333333%;
    box-sizing: border-box;
  }

  @media (max-width: 1375px) {
    > div {
      flex-basis: 50%;
      -ms-flex-preferred-size: 50%;
      max-width: 50%;
    }
  }
  @media (max-width: 950px) {
    margin-right: 0;
    margin-left: 0;
    > div {
      padding: 0.5rem 0;
      flex-basis: 100%;
      -ms-flex-preferred-size: 100%;
      max-width: 100%;
    }
  }
`;

const Header = styled.div`
  margin: 70px 0px 20px 0px;
  .headingText {
    height: 31px;
    color: #444;
    font-size: 32px;
    margin-right: 20px;
    font-weight: 600;
  }
`;

const unCamelCase = str => {
  str = str.replace(/([a-z\xE0-\xFF])([A-Z\xC0\xDF])/g, "$1 $2");
  return str;
};

const allSuggestions = zones => {
  let names = [];
  zones.forEach(zone => {
    names.push(unCamelCase(zone.name));
  });
  return names;
};

const allMarineToSpanish = zones => {
  let names = [];
  zones.forEach(zone => {
    names.push(MarineToSpanish(zone));
  });
  return names;
};

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      data: [],
      filtered: [],
      suggestions: [],
      checked: {
        marine: true,
        terrestrial: true
      },
      key: true,
      keyHeight: 262,
      measurementSelect: ["temperature", "productivity", "precipitation"],
      loading: true,
      error: false
    };
    this.setValue = this.setValue.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.setChecked = this.setChecked.bind(this);
    this.filter = this.filter.bind(this);
    this.toggleMeasurement = this.toggleMeasurement.bind(this);
    this.keyRef = React.createRef();
  }

  componentDidMount() {
    this.setState({
      keyHeight: this.keyRef.current.scrollHeight
    });
    this.fetchOverviewData();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.loading !== prevState.loading) {
      if (
        nextProps.loading === false &&
        nextProps.loaded === true &&
        nextProps.error === false
      ) {
        nextProps.data.forEach((d, i) => {
          Volcanoes.forEach(v => {
            if (v.includes(": " + unCamelCase(d.name))) {
              nextProps.data[i].name = v;
            }
          });
        });

        return {
          loading: nextProps.loading,
          data: nextProps.data,
          filtered: nextProps.data,
          suggestions: allSuggestions(nextProps.data)
        };
      }

      return {
        loading: nextProps.loading
      };
    }

    // Return null if the state hasn't changed
    return null;
  }

  fetchOverviewData() {
    this.props.fetchOverviewData();
    this.setState({ loading: true });
  }

  setValue = value => {
    this.setState({ value: value }, this.filter);
  };

  onSelect = suggestion => this.setValue(suggestion);

  setChecked = (value, name) => {
    let checked = this.state.checked;

    checked[name] = value;
    this.setState(
      {
        checked
      },
      this.filter
    );
  };

  filter = () => {
  };

  toggleMeasurement(measurement) {
    let { measurementSelect } = this.state;
    if (measurementSelect.includes(measurement)) {
      measurementSelect = measurementSelect.filter(
        arrayItem => arrayItem !== measurement
      );
    } else {
      measurementSelect.push(measurement);
    }
    this.setState({ measurementSelect }, () => this.filter());
  }

  renderFilteredCards = size => {
    const marineCards = this.state.filtered
      .filter(item => item.type === "marine")
      .sort(function(a, b) {
        return a.name === b.name ? 0 : a.name < b.name ? -1 : 1;
      });
    const terrestrialCards = this.state.filtered
      .filter(item => item.type === "islands" || item.type === "volcanoes")
      .sort(function(a, b) {
        return a.name === b.name ? 0 : a.name < b.name ? -1 : 1;
      });
    return (
      <div>
        {marineCards && marineCards.length > 0 ? (
          <div>
            <CardContainer size={size}>
              {marineCards.map(zone => {
                return (
                  <div key={zone.name}>
                    <text>indicator circle</text>
                  </div>
                );
              })}
            </CardContainer>
          </div>
        ) : null}
        {terrestrialCards && terrestrialCards.length > 0 ? (
          <div>
            <Header>
              <text className="headingText">
                <Trans>Terrestrial</Trans>
              </text>
            </Header>
            <CardContainer size={size}>
              {terrestrialCards.map(zone => {
                return (
                  <div key={zone.name}>
                    <text>key</text>
                  </div>
                );
              })}
            </CardContainer>
          </div>
        ) : null}
      </div>
    );
  };

  render() {
    const {
      value,
      suggestions,
      checked,
      key,
      keyHeight,
      measurementSelect,
      error
    } = this.state;
    if (error) {
      return <tex>{error}</tex>;
    }
    return (
      <div>
        <Trans>Elizabeth Bay</Trans>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { loading, loaded, error, data } = selectOverviewReducers(state);

  return {
    data,
    loading,
    loaded,
    error // TODO: Implement props hook with state
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchOverviewData
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
