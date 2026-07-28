import React from 'react';
import SchemeCard from './SchemeCard';

const ResultsContainer = ({ schemes, currentLanguage, onDownload, onPrint }) => {
  const content = {
    te: { title: "మీకు సరిపోయే యోజనలు" },
    en: { title: "Schemes Suitable For You" }
  };

  const filteredSchemes = schemes.filter(s => s.matchScore > 30);

  if (filteredSchemes.length === 0) {
    return (
      <div className="results-container">
        <h2>{content[currentLanguage].title}</h2>
        <p style={{ textAlign: 'center', color: '#666' }}>
          {currentLanguage === 'te' 
            ? 'మీకు సరిపోయే యోజనలు ఏవీ కనుగొనబడలేదు. దయచేసి మళ్లీ ప్రయత్నించండి.'
            : 'No schemes found matching your criteria. Please try again.'}
        </p>
      </div>
    );
  }

  return (
    <div className="results-container" id="resultsContainer">
      <h2>{content[currentLanguage].title}</h2>
      <div className="schemes-list" id="schemesList">
        {filteredSchemes.map((scheme, idx) => (
          <SchemeCard key={idx} scheme={scheme} currentLanguage={currentLanguage} />
        ))}
      </div>
      <div className="actions">
        <button className="btn-action" onClick={onDownload}>
          <i className="fas fa-download"></i>
          {currentLanguage === 'te' ? 'సమాచారం డౌన్లోడ్ చేయండి' : 'Download Information'}
        </button>
        <button className="btn-action" onClick={onPrint}>
          <i className="fas fa-print"></i>
          {currentLanguage === 'te' ? 'ప్రింట్ చేయండి' : 'Print'}
        </button>
      </div>
    </div>
  );
};

export default ResultsContainer;