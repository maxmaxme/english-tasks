import React, { useEffect, useState } from 'react';
import { InputQuestion } from '../../../shared/types/game';
import { shuffle } from '../../../helpers/array';
import styles from './styles.css';
import { Button, Div, FormItem, FormLayout, Input, PanelSpinner, Progress, Title } from '@vkontakte/vkui';
import { FormItemProps } from '@vkontakte/vkui/src/components/FormItem/FormItem';
import { GameFinish } from '../GameFinish';

type Props = {
  questions: InputQuestion[],
  limit?: number
}

export const shuffleQuestions = (questions: InputQuestion[], limit: number) =>
  Promise.resolve(shuffle([...questions]).slice(0, limit));

export const GameInput = ({ questions: originalQuestions, limit = 10 }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState<InputQuestion[]>([]);
  const [value, setValue] = useState('');
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [step, setStep] = useState<'question' | 'answer'>('question');
  const [questionIndex, setQuestionIndex] = useState(0);

  const question: InputQuestion | undefined = questions[questionIndex];
  const isCorrect = question?.answers.includes(value.trim());

  const initGame = () => {
    setIsLoading(true);
    shuffleQuestions(originalQuestions, limit)
      .then((questions) => {
        setQuestions(questions);
        setValue('');
        setCorrectAnswersCount(0);
        setStep('question');
        setQuestionIndex(0);
        setIsLoading(false);
      });
  };
  useEffect(initGame, [originalQuestions]);

  const checkAnswer = (e: any) => {
    e.preventDefault();
    if (isCorrect) {
      setCorrectAnswersCount((value) => value + 1);
    }
    setStep('answer');
  };

  const nextQuestion = () => {
    setStep('question');
    setQuestionIndex(questionIndex + 1);
    setValue('');
  };

  if (isLoading) {
    return <PanelSpinner />;
  }

  if (!question) {
    return <GameFinish
      correctCount={correctAnswersCount}
      totalCount={questions.length}
      againButtonOnClick={initGame} />;
  }

  const getInputStatus = (): FormItemProps['status'] => {
    if (step === 'answer' && value.length) {
      return isCorrect ? 'valid' : 'error';
    }
    return 'default';
  };

  let hint = null;
  if (question.hint) {
    hint = ` (${question.hint})`;
  }

  return (<>
    <Progress value={questionIndex/questions.length * 100} />
    <Div>
      <Title level="1" weight="regular" className={styles.question}>{question.question}{hint}</Title>
    </Div>
    {(step === 'answer' && !isCorrect) && <Div>{question.answers.join(' / ')}</Div>}

    <FormLayout onSubmit={checkAnswer}>
      <FormItem status={getInputStatus()}>
        <Input
          disabled={step !== 'question'}
          type="text"
          value={value}
          onChange={({ target: { value } }) => setValue(value)}
        />
      </FormItem>
    </FormLayout>

    <Div>
      {step === 'question' && (
        <Button
          size="l"
          mode="secondary"
          stretched
          onClick={checkAnswer}>{!value.length ? 'Не знаю' : 'Проверить'}</Button>
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
