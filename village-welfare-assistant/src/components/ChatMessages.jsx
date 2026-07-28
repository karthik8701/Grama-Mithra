import React, { useRef, useEffect } from 'react';

const ChatMessages = ({ messages, currentLanguage, currentStep, questions }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-messages" id="chatMessages">
      {messages.map((msg, idx) => (
        <div key={idx} className={`message ${msg.type}-message`}>
          <div className="message-content">
            {msg.text}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;