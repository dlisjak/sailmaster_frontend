import React from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";

//compatibility with Bootstrap 3 panel
const Panel = ({ header, children, eventKey, onClick }) => {
  return (
    <Card>
      <Accordion.Toggle as={Card.Header} className="panel__header" eventKey={eventKey} onClick={onClick}>
        {header}
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={eventKey}>
        <Card.Body>{children}</Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

export default Panel;
