import prompts, { Answers, PromptType } from 'prompts';
import { Question } from './Question';
import newConsole from '../classes/singletons/NewConsole';
import { ChoiceQuestion } from './ChoiceQuestion';
import { NumberQuestion } from './NumberQuestion';
import { TextQuestion } from './TextQuestion';
import FileHandler from './singletons/FileHandler';

interface IQuiz {
    title: string;
    Question: Question[];
    public: boolean;
}

export class Quiz {
    constructor() {}
    public iQuiz: IQuiz = { title: "", Question: [], public: false }
    public async newQuiz(): Promise<void> {
        let answer = await newConsole.askForAnAnswers("Enter the Quiz title:", 'text');
        this.iQuiz.title = answer.value;
        let amountQuestions: number = 0;
        let finish: Answers<string>;

        for (amountQuestions = 0; amountQuestions < 10; amountQuestions++) {
            if (amountQuestions >= 4) {
                finish = await newConsole.askForAnAnswers("Another Question?", 'confirm');
                console.log(finish);
                if (!finish.value) {
                    amountQuestions = 10;
                    break;
                }
            }
            await this.showQuestionTypes();
        }
        let isPublic = await newConsole.askForAnAnswers("Do you want to be your quiz public?", 'confirm');
        this.iQuiz.public = isPublic.value;
        FileHandler.writeJsonFile("./files/Quiz.json", this.iQuiz)
    }

    // Options to show in Terminal
    public async showQuestionTypes(): Promise<void> {
        let answer: Answers<string> = await newConsole.showOptions(
            [
                "Number Question",
                "Choice Question",
                "Text Question",
            ],
            "Choose a Question Type for your next question?"
        );
        await this.handleAnswerLogin(answer.value);
    }

    // Answers which appears after choosing an option
    public async handleAnswerLogin(_answer: number): Promise<void> {
        switch (_answer) {
            case 1:
                await this.handleUser("Number");
                break;

            case 2:
                await this.handleUser("Choice");
                break;

            case 3:
                await this.handleUser("Text");
                break;

            default:
                newConsole.printLine("Option not available!");
        }
    }

    public async handleUser(_type: string): Promise<void> {
        switch (_type) {
            case "Number":
                let quesNumber: NumberQuestion = new NumberQuestion()
                await quesNumber.setQuestion();
                await quesNumber.setAnswers();
                this.iQuiz.Question.push(quesNumber)
                break;

            case "Choice":
                let quesChoice: ChoiceQuestion = new ChoiceQuestion()
                await quesChoice.setQuestion();
                await quesChoice.setAnswers();
                this.iQuiz.Question.push(quesChoice)
                break;

            case "Text":
                let quesText: TextQuestion = new TextQuestion()
                await quesText.setQuestion();
                await quesText.setAnswers();
                this.iQuiz.Question.push(quesText)
                break;

            default:
                newConsole.printLine("Option not available!");
        }
    }

}