// Questions.jsx
import React from 'react';
import { useSelector } from 'react-redux';

const Questions = ({ onChecked }) => {
    const { queue, trace } = useSelector(state => state.questions);

    const currentQuestion = queue[trace];

    if (!currentQuestion) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{currentQuestion.question}</h2>
            {currentQuestion.options.map((option, index) => (
                <div key={index}>
                    <input 
                        type="radio" 
                        name="option" 
                        value={option} 
                        onChange={() => onChecked(option)} 
                    />
                    {option}
                </div>
            ))}
        </div>
    );
};

export default Questions;
