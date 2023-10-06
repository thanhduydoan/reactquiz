import { createContext, useEffect, useContext, useReducer } from "react";
const BASE_URL = 'http://localhost:8080'

const QuizzContext = createContext()
const SECS_PER_QUESTION = 30;
const initialState = {
    questions: [],
    status: 'loading',
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
    secondRemaining: null,
}

function reducer(state, action) {
    switch (action.type) {
        case 'dataReceived': return { ...state, questions: action.payload, status: "ready" }
        case 'dataFailed': return { ...state, status: "error" }
        case 'start': return { ...state, status: "active", secondRemaining: state.questions.length * SECS_PER_QUESTION }
        case 'newAnswer':
            const question = state.questions.at(state.index)
            return { ...state, answer: action.payload, points: action.payload === question.correctOption ? state.points + question.points : state.points }
        case 'nextQuestion': return { ...state, index: state.index + 1, answer: null }
        case 'finish': return {
            ...state, status: 'finished', highscore: state.points > state.highscore ? state.points : state.highscore
        }
        case 'restart': return { ...initialState, questions: state.questions, status: "ready" }
        case 'tick': return { ...state, secondRemaining: state.secondRemaining - 1, status: state.secondRemaining === 0 ? 'finished' : state.status }
        default: throw new Error(`Invalid action ${action.type}`)
    }
}
// function QuizzProvider({ children }) {
//     const [{ questions, status, index, answer, points, highscore, secondRemaining }, dispatch] = useReducer(reducer, initialState)
//     const numQuestions = questions.length;
//     const maxPossiablepoints = questions.reduce((prev, cur) => prev + cur.points, 0)
//     useEffect(() => {
//         fetch(BASE_URL).then(res => res.json())
//             .then(data => dispatch({ type: 'dataReceived', payload: data }))
//             .catch(err => dispatch({ type: 'dataFailed' }))
//     }, []);
//     return (<QuizzProvider.Provider value={{ questions, status, index, answer, points, highscore, secondRemaining, numQuestions, maxPossiablepoints, dispatch }}>
//         {children}
//     </QuizzProvider.Provider>
//     )
// }

function QuizzProvider({ children }) {
    const [{ questions, status, index, answer, points, highscore, secondRemaining }, dispatch] = useReducer(reducer, initialState);
    const numQuestions = questions.length;
    const maxPossiblePoints = questions.reduce((prev, cur) => prev + cur.points, 0);

    useEffect(() => {
        fetch(`${BASE_URL}/questions`)
            .then(res => res.json())
            .then(data => dispatch({ type: 'dataReceived', payload: data }))
            .catch(err => dispatch({ type: 'dataFailed' }));
    }, []);

    return (
        <QuizzContext.Provider value={{ questions, status, index, answer, points, highscore, secondRemaining, numQuestions, maxPossiblePoints, dispatch }}>
            {children}
        </QuizzContext.Provider>
    );
}

function useQuizz() {
    const context = useContext(QuizzContext)
    if (context === undefined) throw new Error("QuizzContext was used outside the QuizzProvider")
    return context
}

export { QuizzProvider, useQuizz } 