import React from "react";
import { useState } from "react";
// buttonların clicklenip clinklenmediği state'e.

// eğer button clicklenmişse ve resulta basılmışsa doğru butonları yeşil yap. eğer isClicked ile doğru seçenek farklı ise isClicked kırmızı olsun

const Trivia = (props) => {
  const renderAnswers = () => {
    return props.answers.map((item, answerIndex) => (
      <button className={`answer--${answerIndex + 1} answer ${"placeholder"}`}>
        <div dangerouslySetInnerHTML={{ __html: item }} />
      </button>
    ));
  };
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className="trivias">
      <div className="question">
        <div dangerouslySetInnerHTML={{ __html: props.question }} />
      </div>
      <div className="answers">{renderAnswers()}</div>
    </div>
  );
};

export default Trivia;