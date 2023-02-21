import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';

const Panel = ({ header, children, eventKey, onClick = () => {} }) => {
  return (
    <Accordion.Item as={Card} className="panel__header" eventKey={eventKey} onClick={onClick}>
      <Accordion.Header as={Card.Header}>{header}</Accordion.Header>
      <Accordion.Body as={Card.Body}>{children}</Accordion.Body>
    </Accordion.Item>
  );
};

export default Panel;
