import React from "react";
import Loader from "components/Loader";

const DisplayComponent = ({ source, render }) => {
  if (!source.isLoading && source.data === undefined) {
    return null;
  }
  if (source.isLoading) {
    return <Loader />;
  }
  return render(source.data);
};


export default DisplayComponent
