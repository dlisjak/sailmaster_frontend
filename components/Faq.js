import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Panel from "components/misc/Panel";

const Faq = ({ items, selected }) => {
  return (
    <div>
      <Accordion defaultActiveKey={selected}>
        {items.map((item, index) => (
          <Panel key={index} header={item.title} eventKey={index + 1}>
            <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
          </Panel>
        ))}
      </Accordion>
    </div>
  );
};

export default Faq;
