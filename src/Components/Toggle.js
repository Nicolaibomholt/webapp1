import React, { useState } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import SpecificRadar from './SpecificRadar';

const Toggle = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Button color="secondary" onClick={toggle} style={{ marginBottom: '1rem' }}>Se mere</Button>
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
            <div className="container">
                <SpecificRadar location={props.location}></SpecificRadar>
            </div>
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
}

export default Toggle;