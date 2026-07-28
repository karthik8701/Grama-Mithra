import React, { useState } from 'react';

const ChatInput = ({ 
  onTextSubmit, 
  quickOptions, 
  onOptionSelect, 
  currentLanguage,
  currentStep,
  totalQuestions
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onTextSubmit(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const content = {
    te: {
      placeholder: "మీ సమాధానం టైప్ చేయండి...",
      send: "పంపండి",
      hint: "మీ జవాబు టైప్ చేయండి లేదా పైన ఎంపికలను నొక్కండి"
    },
    en: {
      placeholder: "Type your answer...",
      send: "Send",
      hint: "Type your answer or tap options above"
    }
  };

  const c = content[currentLanguage];

  return (
    <div className="input-area">
      {quickOptions.length > 0 && currentStep < totalQuestions && (
        <div className="quick-options" id="quickOptions">
          {quickOptions.map((option, idx) => (
            <button
              key={idx}
              className="option-btn"
              onClick={() => onOptionSelect(option.id)}
            >
              {currentLanguage === 'te' ? option.text_te : option.text_en}
            </button>
          ))}
        </div>
      )}
      
      <div className="input-group">
        <div className="input-wrapper">
          <input
            type="text"
            id="userInput"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={c.placeholder}
            disabled={currentStep >= totalQuestions}
          />
          <button className="send-btn" onClick={handleSubmit}>
            <i className="fas fa-paper-plane"></i>
            {c.send}
          </button>
        </div>
        <div className="input-hint">
          {c.hint}
        </div>
      </div>
    </div>
  );
};

export default ChatInput;