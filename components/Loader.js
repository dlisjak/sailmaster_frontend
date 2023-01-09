import React from "react";
import { Row, Col } from "react-bootstrap";

const Loader = () => (
  <div key="loader" id="loader">
    <div className="row">
      <Col xs={12}>
        <div id="loader">
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </Col>
    </div>
  </div>
);

export default Loader;
