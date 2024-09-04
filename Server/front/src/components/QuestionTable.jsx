const QuestionTable = ({ questions, answers, feedback, onHighlight }) => {
    const scrollToQuestion = (questionId) => {
        const element = document.getElementById(`question-${questionId}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            onHighlight(questionId);
        }
    };

    return (
        <div className="question-table-container">
            {questions.map((question, index) => { // Используем index для перечисления
                const answer = answers[question.id];
                const status = feedback[question.id];

                let boxClass = 'question-box';
                if (answer) {
                    boxClass += ' yellow';
                }
                if (status) {
                    boxClass += status.startsWith('Correct') ? ' green' : ' red';
                }

                return (
                    <div 
                        key={question.id} 
                        className={boxClass} 
                        onClick={() => scrollToQuestion(question.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        {index + 1} {/* Отображаем порядковый номер вопроса, начиная с 1 */}
                    </div>
                );
            })}
        </div>
    );
};

export default QuestionTable;
