import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Segment,
  Item,
  Dropdown,
  Divider,
  Button,
  Message,
  TextArea,
  Checkbox
} from 'semantic-ui-react';

import mindImg from '../../images/mind.svg';
import msLogo from '../../images/mastercardscholarslogo.png'
import Main from '../Main';
import {
  GRADE_LEVEL,
  NUM_OF_QUESTIONS,
  NATIONALITY,
  GENDER,
  PROFICIENCY
} from '../../constants';
import { shuffle } from '../../utils';

import Offline from '../Offline';

const Validation = ({ startQuiz }) => {
  const [category, setCategory] = useState('0');
  const [numOfQuestions, setNumOfQuestions] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [questionsType, setQuestionsType] = useState('0');
  const [countdownTime, setCountdownTime] = useState({
    hours: 0,
    minutes: 120,
    seconds: 0,
  });
  const [numOfGrades, setNumOfGrades] = useState('')
  const [ nationality, setNationality] = useState('')
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [offline, setOffline] = useState(false);
  const [showMainContent, setShowMainContent] = useState(false);
  const [genderDisplay, setGenderDisplay] = useState('');
  const [ proficiencyDisplay, setProficiencyDisplay ] = useState('');

  const handleTimeChange = (e, { name, value }) => {
    setCountdownTime({ ...countdownTime, [name]: value });
  };

  const loadMain = () => {
    setShowMainContent(true);
  };

  let allFieldsSelected = false;
  if (
    category &&
    numOfQuestions &&
    difficulty &&
    questionsType &&
    (countdownTime.hours || countdownTime.minutes || countdownTime.seconds)
  ) {
    allFieldsSelected = true;
  }

  // const fetchData = () => {
  //   setProcessing(true);

  //   if (error) setError(null);

  //   fetch(API)
  //     .then(respone => respone.json())
  //     .then(data =>
  //       setTimeout(() => {
  //         const { response_code, results } = data;

  //         if (response_code === 1) {
  //           const message = (
  //             <p>
  //               The API doesn't have enough questions for your query. (Ex.
  //               Asking for 50 Questions in a Category that only has 20.)
  //               <br />
  //               <br />
  //               Please change the <strong>No. of Questions</strong>,{' '}
  //               <strong>Difficulty Level</strong>, or{' '}
  //               <strong>Type of Questions</strong>.
  //             </p>
  //           );

  //           setProcessing(false);
  //           setError({ message });

  //           return;
  //         }

  //         results.forEach(element => {
  //           element.options = shuffle([
  //             element.correct_answer,
  //             ...element.incorrect_answers,
  //           ]);
  //         });

  //         setProcessing(false);
  //         startQuiz(
  //           results,
  //           countdownTime.hours + countdownTime.minutes + countdownTime.seconds
  //         );
  //       }, 1000)
  //     )
  //     .catch(error =>
  //       setTimeout(() => {
  //         if (!navigator.onLine) {
  //           setOffline(true);
  //         } else {
  //           setProcessing(false);
  //           setError(error);
  //         }
  //       }, 1000)
  //     );
  // };

  if (offline) return <Offline />;

  return (
    <Container>
      {showMainContent ? (
        <Main />
      ) : (
        <Segment>
          <Item.Group divided>
            <Item>
              <Item.Image src={msLogo} />
              <Item.Content>
                <Item.Header>
                  <h1>MasterCard Scholarships Registration</h1>
                </Item.Header>
                {error && (
                  <Message error onDismiss={() => setError(null)}>
                    <Message.Header>Error!</Message.Header>
                    {error.message}
                  </Message>
                )}
                <Divider />
                <Item.Meta>
                  <p>What are your Career Aspirations?</p>
                  <TextArea
                    style={{ width: '700px', height: '50px' }}
                  />
                  <br />
                  <p>What are some challenges you currently face as an individual</p>
                  <TextArea
                    style={{ width: '700px', height: '50px' }}
                  />
                  <br />
                  <p>What tools or resources are needed for you to foster your development</p>
                  <TextArea
                    style={{ width: '700px', height: '50px' }}
                  />
                  <br />
                  <p>English Proficiency Level</p>
                  <Dropdown
                    fluid
                    selection
                    name="numOfQ"
                    placeholder="Proficiency Level"
                    header="Select Proficiency Level"
                    options={PROFICIENCY}
                    value={proficiencyDisplay}
                    onChange={(e, { value }) => setProficiencyDisplay(value)}
                    disabled={processing}
                  />
                  <br />
                  <p>Current School Examination Partnerships</p>
                  <Checkbox
                  label="TOEFL"
                  name="TOEFL"
                  />
                   <Checkbox
                  label="TOEFL"
                  name="TOEFL"
                  />

                  <br />
                  <p>Nationality</p>
                  <Dropdown
                    fluid
                    selection
                    name="numOfQ"
                    placeholder="Select Nationality"
                    header="Select Nationality"
                    options={NATIONALITY}
                    value={nationality}
                    onChange={(e, { value }) => setNationality(value)}
                    disabled={processing}
                  />
                  <br />
                </Item.Meta>
                <Divider />
                <Item.Extra>
                  <Button
                    primary
                    size="big"
                    icon="play"
                    labelPosition="left"
                    style={{ backgroundColor: 'orange'}}
                    content={'Submit'}
                    onClick={loadMain}
                  />
                </Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      )}
      <br />
    </Container>
  );
  
};

Validation.propTypes = {
  startQuiz: PropTypes.func.isRequired,
};

export default Validation;
