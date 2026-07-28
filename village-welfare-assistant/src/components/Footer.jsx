import React from 'react';

const Footer = ({ currentLanguage }) => {
  const content = {
    te: {
      info: "ఈ సేవ ఉచితం. అధికారిక సమాచారం కోసం దయచేసి సంబంధిత కార్యాలయాలను సంప్రదించండి.",
      qr: "క్యూ ఆర్ కోడ్"
    },
    en: {
      info: "This service is free. Please contact relevant offices for official information.",
      qr: "QR Code"
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-info">
          <p>
            <i className="fas fa-info-circle"></i>
            {content[currentLanguage].info}
          </p>
        </div>
        <div className="qr-code">
          <div className="qr-placeholder">
            <i className="fas fa-qrcode"></i>
            <span>{content[currentLanguage].qr}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;