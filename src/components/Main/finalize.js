import React, { useState } from 'react';
import { Container, Segment, Item, Message, Divider, Image } from 'semantic-ui-react';
import thank from '../../images/thank.gif';  // Import your PNG logo

import msLogo from '../../images/mastercardscholarslogo.png'
const Finalize = () => {
  const [error, setError] = useState(null);

  return (
    <Container>
      <Segment>
        <Item.Group divided>
          <Item>
            {/* Use the imported PNG image */}
            <Item.Image src={msLogo} />
            <Item.Content>
              <Item.Header>
                <h1>MasterCard Foundation Scholars Examination</h1>
              </Item.Header>
              {error && (
                <Message error onDismiss={() => setError(null)}>
                  <Message.Header>Error!</Message.Header>
                  {error.message}
                </Message>
              )}
              <Divider />
              <Item.Meta>
                {/* Use the GIF instead of an image and set the width and height */}
                <Image src={thank} style={{ width: '250px', height: '250px',
               margin: 'auto', // Center-align the image horizontally
               display: 'block', // Ensure the margin works as expected
            }} />
              </Item.Meta>
              <Divider />
              <Item.Extra>
                {/* Additional content goes here */}
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <br />
    </Container>
  );
};

export default Finalize;
