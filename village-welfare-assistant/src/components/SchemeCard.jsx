import React from 'react';

const SchemeCard = ({ scheme, currentLanguage }) => {
  const getMatchText = (score) => {
    if (currentLanguage === 'te') {
      return score >= 80 ? 'అత్యంత సరిపోతుంది' : score >= 60 ? 'బాగా సరిపోతుంది' : 'సరిపోతుంది';
    }
    return score >= 80 ? 'Highly Suitable' : score >= 60 ? 'Well Suitable' : 'Suitable';
  };

  const handleMoreInfo = () => {
    alert(currentLanguage === 'te' 
      ? `మరింత సమాచారం కోసం గ్రామ సచివాలయాన్ని సంప్రదించండి:\n\n${scheme.name_te}\n${scheme.description_te}`
      : `Contact Gram Sachivalayam for more information:\n\n${scheme.name_en}\n${scheme.description_en}`
    );
  };

  const handleOfficialSite = () => {
    window.open('https://www.india.gov.in/', '_blank');
  };

  return (
    <div className="scheme-card">
      <div className="scheme-header">
        <div className="scheme-title">
          {currentLanguage === 'te' ? scheme.name_te : scheme.name_en}
        </div>
        <div className="scheme-match">
          <span>{getMatchText(scheme.matchScore)}</span>
          <div className="match-score">{Math.round(scheme.matchScore)}%</div>
        </div>
      </div>
      <div className="scheme-description">
        {currentLanguage === 'te' ? scheme.description_te : scheme.description_en}
      </div>
      <div className="scheme-details">
        <div className="detail-item">
          <div className="detail-label">
            {currentLanguage === 'te' ? 'ప్రయోజనాలు' : 'Benefits'}
          </div>
          <div className="detail-value">
            {currentLanguage === 'te' ? scheme.benefits_te : scheme.benefits_en}
          </div>
        </div>
        <div className="detail-item">
          <div className="detail-label">
            {currentLanguage === 'te' ? 'దరఖాస్తు విధానం' : 'Application Process'}
          </div>
          <div className="detail-value">
            {currentLanguage === 'te' ? scheme.application_te : scheme.application_en}
          </div>
        </div>
      </div>
      <div className="scheme-actions">
        <button className="btn-scheme btn-apply" onClick={handleOfficialSite}>
          <i className="fas fa-external-link-alt"></i>
          {currentLanguage === 'te' ? 'అధికారిక వెబ్సైట్' : 'Official Website'}
        </button>
        <button className="btn-scheme btn-info" onClick={handleMoreInfo}>
          <i className="fas fa-info-circle"></i>
          {currentLanguage === 'te' ? 'మరింత సమాచారం' : 'More Information'}
        </button>
      </div>
    </div>
  );
};

export default SchemeCard;