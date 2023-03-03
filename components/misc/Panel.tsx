import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';

const Panel = ({ header, children, eventKey, onClick = () => {} }) => {
  return (
    <Accordion.Item
      as={Card}
      className="panel__header outline-0"
      eventKey={eventKey}
      onClick={onClick}
    >
      <Accordion.Header className="p-0 outline-0" as={Card.Header}>
        <span className="flex py-3 px-5 outline-0 hover:underline">{header}</span>
      </Accordion.Header>
      <Accordion.Body as={Card.Body}>{children}</Accordion.Body>
    </Accordion.Item>
  );
};

export default Panel;
