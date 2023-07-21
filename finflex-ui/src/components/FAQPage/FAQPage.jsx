
import FAQDropdown from '../FAQDropdown/FAQDropdown';

const FAQPage = () => {
  return (
    <div className='every'>
       <FAQDropdown
        question="How do I add my expenses to the application?"
        answer="To add expenses, simply navigate to the 'Dashboard' section in the app, fill in the details such as date, amount, and description, and click the 'add' button. Save the entry to record your expense."
      />
    
      <FAQDropdown
        question="Can I monitor my budget using FinFlex?"
        answer="Absolutely! The app provides a budget tracking feature. Input your income and set budget limits for different categories. The app will automatically update your spending and show you how well you're sticking to your budget."
      />
      <FAQDropdown
        question="Can I link my bank accounts to the application?"
        answer="Currently, the application does not support direct bank account linking. However, you can manually import transactions or enter your expenses to keep your financial records up-to-date."
      />
      <FAQDropdown
        question="Is there a way to categorize my expenses?"
        answer="Absolutely! The app allows you to categorize your expenses, making it easier to understand your spending patterns and identify areas where you can save."
      />
      <FAQDropdown
        question="What are some tips that can help me accurately track my spending habits?"
        answer="Start by inputting all your expenses accurately to get a clear picture of your financial situation, use the budget monitoring feature regularly to track your spending and identify areas where you can cut back, set realistic financial goals, such as saving a certain amount each month or paying off a debt by a specific date, and take advantage of FinFlex's categorization feature to understand how much you spend on different aspects of your life, such as groceries, entertainment, or transportation"
      />
      
    </div>
  );
};

export default FAQPage;
