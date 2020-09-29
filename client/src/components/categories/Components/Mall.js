import React, { Component } from "react";
import * as Styles from "../styles";
import Breakpoints from "../../../constants/Breakpoints";
import { baseUrl } from "../../../constants/urls";

const JumbotronMalls = (props) => {
  const Image = `${baseUrl}banners/1597053752.Video.png`;
  const Indoor = `${baseUrl}banners/1597053760.indoor.jpg`;
  const IndoorMob = `${baseUrl}banners/1597053691.indoorMob.jpg `;
  const Outdoor = `${baseUrl}banners/1597053852.outdoor.jpg`;
  const OutdoorMob = `${baseUrl}banners/1597053740.outdoorMob.jpg`;
  const GardeningNeeds = `${baseUrl}banners/1597053713.needs.jpg  `;
  const GardeningNeedsMob = `${baseUrl}banners/1597053409.gardenMob.jpg`;
  const Accessories = `${baseUrl}banners/1597053388.accessories.jpg`;
  const mobAccessories = `${baseUrl}banners/1597053701.mobAccessories.jpg`;

  const handleImage = (name) => {
    if (name == "Indoor Plants") {
      return props.width > Breakpoints.SM_MAX ? Indoor : IndoorMob;
    } else if (name == "Outdoor Plants") {
      return props.width > Breakpoints.SM_MAX ? Outdoor : OutdoorMob;
    } else if (name == "Accessories") {
      return props.width > Breakpoints.SM_MAX ? Accessories : mobAccessories;
    } else if (name == "Gardening Needs") {
      return props.width > Breakpoints.SM_MAX
        ? GardeningNeeds
        : GardeningNeedsMob;
    } else {
      return Image;
    }
  };

  return (
    <Styles.Jumbotron className="jumbotron jumbotron-fluid bg-dark">
      <div class="jumbotron-background">
        <img src={handleImage(props.imageName.props.id)} />
      </div>
    </Styles.Jumbotron>
  );
};
export default JumbotronMalls;
