import { useQuizz } from "../contexts/QuizContext";

function NextButton() {
    const { dispatch, answer, index, numQuestions } = useQuizz()
    if (answer === null) return null;
    if (index < numQuestions - 1) return (
        <div>
            <button className="btn btn-ui" onClick={() => dispatch({ type: 'nextQuestion' })}>Next</button>
        </div>
    )
    if (index === numQuestions - 1) return (
        <div>
            <button className="btn btn-ui" onClick={() => dispatch({ type: 'finish' })}>Next</button>
        </div>
    )
}

export default NextButton
