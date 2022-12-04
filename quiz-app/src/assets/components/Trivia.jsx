import { nanoid } from "nanoid";
import React from "react";
// buttonların clicklenip clinklenmediği state'e.

// eğer button clicklenmişse ve resulta basılmışsa doğru butonları yeşil yap. eğer isClicked ile doğru seçenek farklı ise isClicked kırmızı olsun

const Trivia = (props) => {
  const {
    question,
    selectedIndex,
    answers,
    answersArr,
    selectAnswer,
    isSelected,
    questionIndex,
  } = props;

  const renderAnswers = () => {
    console.log({ answers });
    return answers.map((item, answerIndex) => {
      const styles = { backgroundColor: item.isSelected && "#59E391" };

      return (
        <button
          value={item.value}
          style={styles}
          onClick={(e) =>
            selectAnswer(e.target.value, questionIndex, answerIndex)
          }
          key={Date.now()}
          className={`answer--${answerIndex + 1} answer ${"placeholder"}`}
        >
          <div
            className="answerButtons"
            dangerouslySetInnerHTML={{ __html: item.value }}
          />
        </button>
      );
    });
  };

  return (
    <div className="trivias">
      <div className="question">
        <div dangerouslySetInnerHTML={{ __html: question }} />
      </div>
      <div className="answers">{renderAnswers()}</div>
    </div>
  );
};

export default Trivia;
