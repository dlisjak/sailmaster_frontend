import Accordion from 'react-bootstrap/Accordion';

import Panel from '../components/misc/Panel';

const Faq = ({ items }) => {
  return (
    <div>
      <Accordion>
        {items.map((item, index) => (
          <Panel key={index} header={item.title} eventKey={index + 1}>
            <div dangerouslySetInnerHTML={{ __html: item.content }} />
          </Panel>
        ))}
      </Accordion>
    </div>
  );
};

export default Faq;
