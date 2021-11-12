import React, { useMemo, useState } from 'react';
import { QuizQuestion } from '../../../types/game';
import { compareArrays, shuffle } from '../../../helpers/array';
import styles from './styles.css';
import { Button, Div, Group, Progress, SimpleCell, Title } from '@vkontakte/vkui';
import cn from 'classnames';
import { ListMarker } from '../../ListMarker';

type Props = {
  questions: QuizQuestion[],
  limit?: number
}

export const shuffleQuestions = (questions: QuizQuestion[], limit: number) => shuffle([...questions])
  .slice(0, limit)
  .map((question) => {
    question.answers = shuffle(question.answers);
    return question;
  });

export const GameQuiz = (props: Props) => {
  const questions = useMemo(() => shuffleQuestions(props.questions, 5), [props.questions]);

  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [step, setStep] = useState<'question' | 'answer'>('question');
  const [questionIndex, setQuestionIndex] = useState(0);
  const question: QuizQuestion | undefined = questions[questionIndex];
  const isMultiAnswer = question?.answers.filter((answer) => answer.correct).length > 1;

  const onAnswerClick = (index: number) => {
    if (step !== 'question') {
      return undefined;
    }
    return () => {
      if (selectedAnswers.includes(index)) {
        setSelectedAnswers((state) => state.filter((n) => n != index));
      } else {
        if (!isMultiAnswer) {
          setSelectedAnswers([index]);
        } else {
          setSelectedAnswers((state) => [...state, index]);
        }
      }
    };
  };

  const checkAnswer = () => {
    const correctAnswersIndexes: number[] = [];
    question.answers.forEach((answer, index) => {
      if (answer.correct) {
        correctAnswersIndexes.push(index);
      }
    });
    if (compareArrays(correctAnswersIndexes, selectedAnswers)) {
      setCorrectAnswersCount((value) => value + 1);
    }
    setStep('answer');
  };

  const nextQuestion = () => {
    setStep('question');
    setQuestionIndex(questionIndex + 1);
    setSelectedAnswers([]);
  };

  if (!question) {
    return (<>
      <div>Done</div>
      <div>Correct {correctAnswersCount}/{questions.length} answers</div>
    </>
    );
  }

  return (<>
    <Progress value={questionIndex/questions.length * 100} />
    <Div>
      <Title level="1" weight="regular" className={styles.question}>{question.question}</Title>

      <Group className={styles.answerButtons}>
        {question.answers.map((answer, i) => (
          <div className={cn(styles.answerButtonContainer, {
            [styles['answerButtonContainer--correct']]: step === 'answer' && answer.correct,
            [styles['answerButtonContainer--incorrect']]: step === 'answer' && !answer.correct && selectedAnswers.includes(i),
            [styles['answerButtonContainer--selected']]: step === 'answer' && selectedAnswers.includes(i),
          })} key={i}>
            <SimpleCell
              before={<ListMarker selected={selectedAnswers.includes(i)}>{i + 1}</ListMarker>}
              disabled={step !== 'question'}
              onClick={onAnswerClick(i)}
            >
              {answer.text}
            </SimpleCell>
          </div>
        ))}
      </Group>
      {step === 'question' && selectedAnswers.length > 0 && (
        <Button
          size="l"
          mode="secondary"
          stretched
          onClick={checkAnswer}>Проверить</Button>
      )}

      {step === 'answer' && (
        <Button
          size="l"
          mode="secondary"
          stretched
          onClick={nextQuestion}>{questionIndex >= questions.length - 1 ? 'Закончить' : 'Дальше'}</Button>
      )}
    </Div>
  </>
  );
};
