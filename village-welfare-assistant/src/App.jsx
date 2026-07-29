import React, { useState } from 'react';
import Header from './components/Header';
import ChatMessages from './components/ChatMessages';
import ChatInput from './components/ChatInput';
import ProgressBar from './components/ProgressBar';
import ResultsContainer from './components/ResultsContainer';
import Footer from './components/Footer';
import WelcomeScreen from './components/WelcomeScreen';
import useChatbot from './hooks/useChatbot';
import './styles/App.css';

function App() {
  const [showChatbot, setShowChatbot] = useState(false);
  const {
    messages,
    currentStep,
    currentLanguage,
    schemes,
    showResults,
    questions,
    quickOptions,
    handleOptionSelect,
    handleTextInput,
    resetConversation,
    updateLanguage,
    downloadResults,
    printResults,
    totalQuestions
  } = useChatbot();

  const handleStart = () => {
    setShowChatbot(true);
  };

  return (
    <div className="container">
      {!showChatbot ? (
        <WelcomeScreen onStart={handleStart} currentLanguage={currentLanguage} />
      ) : (
        <>
          <Header 
            currentLanguage={currentLanguage}
            onLanguageChange={updateLanguage}
            onReset={resetConversation}
          />
          
          <div className="chat-container">
            <ChatMessages 
              messages={messages}
              currentLanguage={currentLanguage}
              currentStep={currentStep}
              questions={questions}
            />
            
            <ChatInput 
              onTextSubmit={handleTextInput}
              quickOptions={quickOptions}
              onOptionSelect={handleOptionSelect}
              currentLanguage={currentLanguage}
              currentStep={currentStep}
              totalQuestions={totalQuestions}
            />
          </div>

          <ProgressBar 
            currentStep={currentStep}
            totalQuestions={totalQuestions}
            currentLanguage={currentLanguage}
          />

          {showResults && (
            <ResultsContainer 
              schemes={schemes}
              currentLanguage={currentLanguage}
              onDownload={downloadResults}
              onPrint={printResults}
            />
          )}

          <Footer currentLanguage={currentLanguage} />
        </>
      )}
    </div>
  );
}

export default App;
