import React, { useState } from "react";
import { Button, Icon, Loader } from "semantic-ui-react";
import { connect } from "react-redux";
import SlideShowComponent from "../../common/SlideShowComponent/SlideShowComponent";

const HomePage = ({ history, auth }) => {
  // if (!auth) {
  //   history.push("/login");
  // }

  return (
    <div>
      <SlideShowComponent />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    async: state.async
  };
};
export default connect(mapStateToProps, null)(HomePage);
