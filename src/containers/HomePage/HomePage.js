import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import Specialty from "./Section/Specialty";
import Hospital from "./Section/Hospital";
import Doctor from "./Section/Doctor";
import Handbook from "./Section/Handbook";
import About from "./Section/About";
import HomeFooter from "./HomeFooter";

import "./HomePage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HomePage extends Component {
  // handleAfterChange = (index, dontAnimate) => {
  //   console.log("check current slide", index);
  // };

  render() {
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 1,
      // slickGoTo: this.handleAfterChange,
    };

    return (
      <div>
        <HomeHeader isShowBanner={true} />
        <Specialty settings={settings} />
        <Hospital settings={settings} />
        <Doctor settings={settings} />
        <Handbook settings={settings} />
        <About />
        <HomeFooter />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
