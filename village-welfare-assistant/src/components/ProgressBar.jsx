import React from 'react';

const ProgressBar = ({ currentStep, totalQuestions, currentLanguage }) => {
  const progress = (currentStep / totalQuestions) * 100;
  
  const content = {
    te: { text: `ప్రశ్న ${currentStep} / ${totalQuestions}` },
    en: { text: `Question ${currentStep} / ${totalQuestions}` }
  };

  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="progress-text">
        {content[currentLanguage].text}
      </div>
    </div>
  );
};

export default ProgressBar;