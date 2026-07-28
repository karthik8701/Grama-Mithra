import React from 'react';

const WelcomeScreen = ({ onStart, currentLanguage }) => {
  const content = {
    te: {
      title: "గ్రామ మిత్ర",
      subtitle: "Grama Mithra",
      welcome: "స్వాగతం!",
      description1: "ప్రభుత్వ సంక్షేమ యోజనల గురించి సరైన సమాచారం",
      description2: "మీరు ఎలాంటి వ్యక్తిగత సమాచారాన్ని షేర్ చేయనవసరం లేదు",
      description3: "కొన్ని సులభమైన ప్రశ్నలకు సమాధానం ఇవ్వండి",
      description4: "మీకు సరిపడే యోజనలను తెలుసుకోండి",
      startBtn: "ప్రారంభించండి",
      info1: "✅ ఉచిత సేవ",
      info2: "✅ గోప్యతా రక్షణ",
      info3: "✅ తెలుగు & ఇంగ్లీష్",
      info4: "✅ 24x7 అందుబాటులో"
    },
    en: {
      title: "Grama Mithra",
      subtitle: "Village Welfare Assistant",
      welcome: "Welcome!",
      description1: "Get accurate information about government welfare schemes",
      description2: "No need to share personal identification details",
      description3: "Answer a few simple questions",
      description4: "Discover schemes suitable for you",
      startBtn: "Start Now",
      info1: "✅ Free Service",
      info2: "✅ Privacy Protected",
      info3: "✅ Telugu & English",
      info4: "✅ Available 24x7"
    }
  };

  const c = content[currentLanguage];

  return (
    <div className="welcome-screen">
      <div className="welcome-card">
        <div className="welcome-icon">
          <i className="fas fa-hands-helping"></i>
        </div>
        <h1>{c.title}</h1>
        <p className="welcome-subtitle">{c.subtitle}</p>
        
        <div className="welcome-description">
          <p><i className="fas fa-info-circle"></i> {c.description1}</p>
          <p><i className="fas fa-shield-alt"></i> {c.description2}</p>
          <p><i className="fas fa-question-circle"></i> {c.description3}</p>
          <p><i className="fas fa-trophy"></i> {c.description4}</p>
        </div>

        <div className="welcome-features">
          <p>{c.info1}</p>
          <p>{c.info2}</p>
          <p>{c.info3}</p>
          <p>{c.info4}</p>
        </div>

        <button className="start-btn" onClick={onStart}>
          <i className="fas fa-arrow-right"></i>
          {c.startBtn}
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;