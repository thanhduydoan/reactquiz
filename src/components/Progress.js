import { useQuizz } from "../contexts/QuizContext"
function Progress() {
    const { index, numQuestions, points, maxPossiablepoints, answer } = useQuizz()
    return (
        <header className="progress">
            <progress max={numQuestions} value={index + Number(answer !== null)} />
            <p>Question <strong>{index + 1}</strong> / {numQuestions}</p>
            <p><strong>{points}</strong> / {maxPossiablepoints}</p>
        </header>
    )
}

export default Progress
