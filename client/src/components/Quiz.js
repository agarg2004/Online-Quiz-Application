import React, { useState } from 'react';
import Questions from './Questions';

import { moveNextQuestion, movePrevQuestion } from '../hooks/FetchQuestion'; // Correct import names
import { PushAnswer } from '../hooks/setResult';

/** redux store import */
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function Quiz() {
    const [check, setChecked] = useState(undefined);

    const result = useSelector(state => state.result.result);
    const { queue, trace } = useSelector(state => state.questions);
    const dispatch = useDispatch();

    /** next button event handler */
    function onNext() {
        if (trace < queue.length) {
            /** increase the trace value by one using moveNextQuestion */
            dispatch(moveNextQuestion());

            /** insert a new result in the array. */
            if (result.length <= trace) {
                dispatch(PushAnswer(check));
            }
        }

        /** reset the value of the checked variable */
        setChecked(undefined);
    }

    /** Prev button event handler */
    function onPrev() {
        if (trace > 0) {
            /** decrease the trace value by one using movePrevQuestion */
            dispatch(movePrevQuestion());
        }
    }

    function onChecked(check) {
        setChecked(check);
    }

    /** finished exam after the last question */
    if (result.length && result.length >= queue.length) {
        return <Navigate to={'/result'} replace={true} />;
    }

    return (
        <div className='container'>
            <h1 className='title text-light'>Quiz Application</h1>

            {/* display questions */}
            <Questions onChecked={onChecked} />

            <div className='grid'>
                {trace > 0 ? <button className='btn prev' onClick={onPrev}>Prev</button> : <div></div>}
                <button className='btn next' onClick={onNext}>Next</button>
            </div>
        </div>
    );
}
