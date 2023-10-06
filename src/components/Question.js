import { useQuizz } from "../contexts/QuizContext"
import Option from "./Option"
export default function Question() {
    const { questions, index } = useQuizz()
    const question = questions.at(index)
    return <div>
        <h4>{questions.question}</h4>
        <div className="options">
            <Option question={question} />
        </div>
    </div>
}