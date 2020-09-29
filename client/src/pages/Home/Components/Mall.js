import React, { Component } from "react";
import * as Styles from "../styles";
import { t } from "@lingui/macro";
import { I18n } from "@lingui/react";
import { ReactComponent as Image } from "../../../assets/images/Video.png";
import { Button } from "@material-ui/core";
import { baseUrl } from "../../../constants/urls";
export const JumbotronMalls = () => {
  const Banner = `${baseUrl}/banners/1597053752.Video.png`
  return (
  <I18n>
    {({ i18n }) => (
      <Styles.Jumbotron className="jumbotron jumbotron-fluid bg-dark">
        <div class="jumbotron-background">
          <img src={Banner} />
        </div>
        <div class="container text-white">
          <h1 class="display-4">  {i18n._(t`Choose your favorite plants and get them delivered to your doorstep`)}</h1>
          <p>
            {i18n._(t`Great companions for your home. They both enliven your space and rid
            it of toxin.`)}
          </p>
          <hr class="my-4" />
        </div>
      </Styles.Jumbotron>
    )}
  </I18n>
  );
};
