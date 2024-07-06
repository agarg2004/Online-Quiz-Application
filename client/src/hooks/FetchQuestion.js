import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getServerData } from "../helper/helper";
import * as Action from '../redux/question_reducer';

export const useFetchQuestion = () => {
    const dispatch = useDispatch();   
    const [getData, setGetData] = useState({ isLoading: true, apiData: [], serverError: null });

    useEffect(() => {
        const fetchData = async () => {
            setGetData(prev => ({ ...prev, isLoading: true }));

            try {
                const [{ questions, answers }] = await getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions`, (data) => data);
                
                if (questions.length > 0) {
                    setGetData(prev => ({ ...prev, isLoading: false, apiData: questions }));
                    dispatch(Action.startExamAction({ question: questions, answers }));
                } else {
                    throw new Error("No Questions Available");
                }
            } catch (error) {
                setGetData(prev => ({ ...prev, isLoading: false, serverError: error.message || "An error occurred" }));
            }
        };

        fetchData();
    }, [dispatch]);

    return [getData, setGetData];
};


/** MoveAction Dispatch function */
export const moveNextQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.moveNextAction()); /** increase trace by 1 */
    } catch (error) {
        console.error("Failed to move to the next question:", error);
    }
}

/** PrevAction Dispatch function */
export const movePrevQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.movePrevAction()); /** decrease trace by 1 */
    } catch (error) {
        console.error("Failed to move to the previous question:", error);
    }
}
