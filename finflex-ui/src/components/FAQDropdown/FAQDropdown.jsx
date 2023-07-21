import { useState } from 'react';
import './FAQDropdown.css';

const FAQDropdown = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="faq-dropdown">
      <div className={`faq-dropdown-header ${isOpen ? 'open' : ''}`} onClick={toggleDropdown}>
        <span>{question}</span>
        <span className={`faq-dropdown-icon ${isOpen ? 'open' : ''}`}>▼</span>
      </div>
      {isOpen && <div className="faq-dropdown-content">{answer}</div>}
    </div>
  );
};

export default FAQDropdown;
