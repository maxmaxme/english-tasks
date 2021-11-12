import React, { useMemo, useState } from 'react';
import { InputQuestion } from '../../../types/game';
import { shuffle } from '../../../helpers/array';
import styles from './styles.css';
import { Button, Div, FormItem, FormLayout, Input, Progress, Title } from '@vkontakte/vkui';
import { FormItemProps } from '@vkontakte/vkui/src/components/FormItem/FormItem';

type Props = {
  questions: InputQuestion[],
  limit?: number
}

export const shuffleQuestions = (questions: InputQuestion[], limit: number) => shuffle([...questions])
  .slice(0, limit);

export const GameInput = (props: Props) => {
  const questions = useMemo(() => shuffleQuestions(props.questions, 10), [props.questions]);

  const [value, setValue] = useState('');
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [step, setStep] = useState<'question' | 'answer'>('question');
  const [questionIndex, setQuestionIndex] = useState(0);
  const question: InputQuestion | undefined = questions[questionIndex];
  const isCorrect = question?.answer === value;

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

  if (!question) {
    return (<>
      <div>Done</div>
      <div>Correct {correctAnswersCount}/{questions.length} answers</div>
    </>
    );
  }

  const getInputStatus = (): FormItemProps['status'] => {
    if (step === 'answer' && value.length) {
      return isCorrect ? 'valid' : 'error';
    }
    return 'default';
  };

  return (<>
    <Progress value={questionIndex/questions.length * 100} />
    <Div>
      <Title level="1" weight="regular" className={styles.question}>{question.question} ({question.hint})</Title>
    </Div>
    {(step === 'answer' && !isCorrect) && <Div>{question.answer}</Div>}

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
