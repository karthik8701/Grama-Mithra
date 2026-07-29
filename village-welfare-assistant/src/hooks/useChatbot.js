import { useState, useEffect } from 'react';
import schemesData from '../data/schemes.json';
import questionsData from '../data/questions.json';

const useChatbot = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState({});
  const [currentLanguage, setCurrentLanguage] = useState('te');
  const [messages, setMessages] = useState([]);
  const [schemes, setSchemes] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [quickOptions, setQuickOptions] = useState([]);
  
  const questions = questionsData.questions;
  const totalQuestions = questions.length;

  // Initialize chatbot
  useEffect(() => {
    loadSchemes();
    addWelcomeMessage();
  }, );

  // Update quick options when question changes
  useEffect(() => {
    if (currentStep < totalQuestions) {
      const currentQ = questions[currentStep];
      setQuickOptions(currentQ.options);
    } else {
      setQuickOptions([]);
    }
  }, [currentStep, currentLanguage, questions, totalQuestions]);

  const loadSchemes = () => {
    setSchemes(schemesData.map(scheme => ({ ...scheme, matchScore: 0 })));
  };

  const addWelcomeMessage = () => {
    const welcomeMsg = {
      type: 'bot',
      text: currentLanguage === 'te' 
        ? 'స్వాగతం! మీకు సరిపడే ప్రభుత్వ యోజనలను కనుగొనడంలో నేను మీకు సహాయం చేస్తాను. కొన్ని సులభమైన ప్రశ్నలను అడుగుతాను.'
        : 'Welcome! I\'ll help you find suitable government schemes. I\'ll ask a few simple questions.'
    };
    setMessages([welcomeMsg]);
  };

  const addCompletionMessage = () => {
    const completionMsg = {
      type: 'bot',
      text: currentLanguage === 'te'
        ? 'ధన్యవాదాలు! మీకు సరిపోయే యోజనలను నేను కనుగొన్నాను. దిగువన మీరు మొత్తం వివరాలు చూడవచ్చు.'
        : 'Thank you! I have found suitable schemes for you. You can view all details below.'
    };
    setMessages(prev => [...prev, completionMsg]);
  };

  const handleOptionSelect = (optionId) => {
    const question = questions[currentStep];
    const selectedOption = question.options.find(opt => opt.id === optionId);
    
    // Add user message
    const userMessage = {
      type: 'user',
      text: currentLanguage === 'te' ? selectedOption.text_te : selectedOption.text_en
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Save user data
    setUserData(prev => ({ ...prev, [question.id]: optionId }));
    
    // Move to next step
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    
    // Ask next question after delay
    setTimeout(() => {
      if (nextStep < totalQuestions) {
        const nextQuestion = questions[nextStep];
        const questionText = currentLanguage === 'te' ? nextQuestion.question_te : nextQuestion.question_en;
        const botMessage = { type: 'bot', text: questionText };
        setMessages(prev => [...prev, botMessage]);
      } else {
        calculateSchemes();
        setShowResults(true);
        addCompletionMessage();
      }
    }, 500);
  };

  const handleTextInput = (text) => {
    const question = questions[currentStep];
    const normalizedText = text.toLowerCase();
    
    // Find matching option
    let matchedOption = null;
    for (const option of question.options) {
      const optionTextTe = option.text_te.toLowerCase();
      const optionTextEn = option.text_en.toLowerCase();
      
      if (normalizedText.includes(option.id) ||
          optionTextTe.includes(normalizedText) ||
          optionTextEn.includes(normalizedText) ||
          normalizedText.includes(optionTextTe) ||
          normalizedText.includes(optionTextEn)) {
        matchedOption = option;
        break;
      }
    }
    
    if (matchedOption) {
      // Add user message
      const userMessage = {
        type: 'user',
        text: text
      };
      setMessages(prev => [...prev, userMessage]);
      
      // Save user data
      setUserData(prev => ({ ...prev, [question.id]: matchedOption.id }));
      
      // Move to next step
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      
      setTimeout(() => {
        if (nextStep < totalQuestions) {
          const nextQuestion = questions[nextStep];
          const questionText = currentLanguage === 'te' ? nextQuestion.question_te : nextQuestion.question_en;
          const botMessage = { type: 'bot', text: questionText };
          setMessages(prev => [...prev, botMessage]);
        } else {
          calculateSchemes();
          setShowResults(true);
          addCompletionMessage();
        }
      }, 500);
    } else {
      // Show error message
      const errorMsg = {
        type: 'bot',
        text: currentLanguage === 'te'
          ? 'క్షమించండి, నేను మీ సమాధానం అర్థం చేసుకోలేకపోయాను. దయచేసి కింది ఎంపికల నుండి ఎంచుకోండి.'
          : 'Sorry, I didn\'t understand your answer. Please choose from the options below.'
      };
      setMessages(prev => [...prev, errorMsg]);
    }
  };

  const calculateSchemes = () => {
    const updatedSchemes = schemesData.map(scheme => {
      let score = 0;
      let totalEligibility = 0;
      
      Object.keys(scheme.eligibility).forEach(criteria => {
        if (userData[criteria]) {
          totalEligibility++;
          if (scheme.eligibility[criteria].includes(userData[criteria])) {
            score++;
          }
        }
      });
      
      const matchScore = totalEligibility > 0 ? (score / totalEligibility) * 100 : 0;
      return { ...scheme, matchScore };
    });
    
    updatedSchemes.sort((a, b) => b.matchScore - a.matchScore);
    setSchemes(updatedSchemes);
  };

  const resetConversation = () => {
    setCurrentStep(0);
    setUserData({});
    setShowResults(false);
    setMessages([]);
    addWelcomeMessage();
    setTimeout(() => {
      const firstQuestion = questions[0];
      const questionText = currentLanguage === 'te' ? firstQuestion.question_te : firstQuestion.question_en;
      const botMessage = { type: 'bot', text: questionText };
      setMessages(prev => [...prev, botMessage]);
    }, 100);
  };

  const updateLanguage = (lang) => {
    setCurrentLanguage(lang);
    // Update existing messages to new language (simplified - just reset)
    resetConversation();
  };

  const downloadResults = () => {
    const data = {
      userData: userData,
      recommendedSchemes: schemes.filter(s => s.matchScore > 30).map(s => ({
        name_te: s.name_te,
        name_en: s.name_en,
        matchScore: s.matchScore,
        benefits_te: s.benefits_te,
        benefits_en: s.benefits_en,
        application_te: s.application_te,
        application_en: s.application_en
      }))
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `welfare-schemes-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const printResults = () => {
    window.print();
  };

  // Auto-ask first question when component mounts
  useEffect(() => {
    if (messages.length === 1) {
      setTimeout(() => {
        const firstQuestion = questions[0];
        const questionText = currentLanguage === 'te' ? firstQuestion.question_te : firstQuestion.question_en;
        const botMessage = { type: 'bot', text: questionText };
        setMessages(prev => [...prev, botMessage]);
      }, 500);
    }
  }, [messages.length, currentLanguage, questions]);

  return {
    messages,
    currentStep,
    userData,
    currentLanguage,
    schemes,
    showResults,
    questions,
    quickOptions,
    totalQuestions,
    handleOptionSelect,
    handleTextInput,
    resetConversation,
    updateLanguage,
    downloadResults,
    printResults
  };
};

export default useChatbot;
