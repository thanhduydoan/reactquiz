import { useQuizz } from "../contexts/QuizContext"

function Option({ question }) {
    const { dispatch, answer } = useQuizz()
    console.log(question)
    const hasAnswered = answer !== null
    return (
        <div>
            {question.options.map((option, index) =>
                <button className={`btn btn-option ${index === answer ? 'answer' : ''} ${hasAnswered ? index === question.correctOption ? 'correct' : 'wrong' : ''}`}
                    key={option}
                    disabled={hasAnswered}
                    onClick={() => dispatch({ type: 'newAnswer', payload: index })}
                >
                    {option}
                </button>)}
        </div>
    )
}

export default Option
