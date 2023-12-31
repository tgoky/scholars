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
} from 'semantic-ui-react';

// import mindImg from '../../images/mind.svg';
import msLogo from '../../images/mastercardscholarslogo.png'

import {
  CATEGORIES,
  NUM_OF_QUESTIONS,
  DIFFICULTY,
  QUESTIONS_TYPE,
  COUNTDOWN_TIME,
} from '../../constants';
import { shuffle } from '../../utils';
import Finalize from './finalize';

import Offline from '../Offline';

const Constraints = ({ startQuiz }) => {
  const [category, setCategory] = useState('0');
  const [numOfQuestions, setNumOfQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState('easy');
  const [questionsType, setQuestionsType] = useState('0');
  const [showMainContent, setShowMainContent] = useState(false);
  const [countdownTime, setCountdownTime] = useState({
    hours: 0,
    minutes: 120,
    seconds: 0,
  });
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [offline, setOffline] = useState(false);

  const handleTimeChange = (e, { name, value }) => {
    setCountdownTime({ ...countdownTime, [name]: value });
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

  const loadMain = () => {
    setShowMainContent(true);
  };


  const fetchData = () => {
    setProcessing(true);

    if (error) setError(null);

    const API = `https://opentdb.com/api.php?amount=${numOfQuestions}&category=${category}&difficulty=${difficulty}&type=${questionsType}`;

    fetch(API)
      .then(respone => respone.json())
      .then(data =>
        setTimeout(() => {
          const { response_code, results } = data;

          if (response_code === 1) {
            const message = (
              <p>
                The API doesn't have enough questions for your query. (Ex.
                Asking for 50 Questions in a Category that only has 20.)
                <br />
                <br />
                Please change the <strong>No. of Questions</strong>,{' '}
                <strong>Difficulty Level</strong>, or{' '}
                <strong>Type of Questions</strong>.
              </p>
            );

            setProcessing(false);
            setError({ message });

            return;
          }

          results.forEach(element => {
            element.options = shuffle([
              element.correct_answer,
              ...element.incorrect_answers,
            ]);
          });

          setProcessing(false);
          startQuiz(
            results,
            countdownTime.hours + countdownTime.minutes + countdownTime.seconds
          );
        }, 1000)
      )
      .catch(error =>
        setTimeout(() => {
          if (!navigator.onLine) {
            setOffline(true);
          } else {
            setProcessing(false);
            setError(error);
          }
        }, 1000)
      );
  };

  if (offline) return <Offline />;

  return (
    <Container>
          {showMainContent ? (
        <Finalize />
      ) : (
      <Segment>
        <Item.Group divided>
          <Item>
            <Item.Image src={msLogo} />
            <Item.Content>
              <Item.Header>
                <h1>Rules and Guidelines</h1>
              </Item.Header>
              {error && (
                <Message error onDismiss={() => setError(null)}>
                  <Message.Header>Error!</Message.Header>
                  {error.message}
                </Message>
              )}
              <Divider />
              <Item.Meta>
                <h1>Congratulations on successfully registering for the 2024 Mastercard Scholars Examination</h1>
               
                <br />
                <p style={{fontWeight: 'bold'}}>The Timestamp for the Mastercard Scholars Examination is for a duration of 30 Minutes & 25 Seconds</p>
               
                <p style={{fontWeight: 'bold'}}>Each Candidate should complete the scholars examination within that timeframe</p>
               
                <br />
                <p style={{fontWeight: 'bold'}}> Once the Examination starts, you can toggle between questions </p>
                
                <br />
                <p style={{fontWeight: 'bold'}}>Dont Refresh the Page After Examination starts. </p>
                <p style={{fontWeight: 'bold'}}>Dont shut down Computers or turn off Network once Examination Starts</p>
                <p style={{fontWeight: 'bold'}}> Your MSCI Code is used to verify candidate authentication</p>
               
              </Item.Meta>
              <Divider />
              <Item.Extra>
                <Button
                  primary
                  size="big"
                  icon="play"
                  labelPosition="left"
                  content={processing ? 'Processing...' : 'Start Examination'}
                  onClick={loadMain}
                  style={{ backgroundColor: 'red'}}
                  disabled={!allFieldsSelected || processing}
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

Constraints.propTypes = {
  startQuiz: PropTypes.func.isRequired,
};

export default Constraints;
