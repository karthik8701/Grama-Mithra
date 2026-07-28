import React from 'react';

const Header = ({ currentLanguage, onLanguageChange, onReset }) => {
  const content = {
    te: {
      reset: "మళ్లీ ప్రారంభించండి",
      welcome: "ప్రభుత్వ సంక్షేమ యోజనల గురించి మీకు సరైన సమాచారం. మీరు ఎలాంటి వ్యక్తిగత సమాచారాన్ని షేర్ చేయనవసరం లేదు."
    },
    en: {
      reset: "Start Over",
      welcome: "Get accurate information about government welfare schemes. No need to share personal identification details."
    }
  };

  const c = content[currentLanguage];

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <i className="fas fa-hands-helping"></i>
          <div>
            <h1>గ్రామ మిత్ర</h1>
            <div className="subtitle">Grama Mithra</div>
          </div>
        </div>
        <div className="language-switcher">
          <select 
            id="languageSelect" 
            value={currentLanguage}
            onChange={(e) => onLanguageChange(e.target.value)}
          >
            <option value="te">తెలుగు</option>
            <option value="en">English</option>
          </select>
          <button className="btn-reset" onClick={onReset}>
            <i className="fas fa-redo"></i>
            <span>{c.reset}</span>
          </button>
        </div>
      </div>
      <div className="welcome-message">
        <p>{c.welcome}</p>
      </div>
    </header>
  );
};

export default Header;