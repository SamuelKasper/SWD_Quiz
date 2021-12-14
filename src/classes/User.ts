import FileHandler from '../classes/singletons/FileHandler';
import newConsole from '../classes/singletons/NewConsole';
import { NumberQuestion } from '../classes/NumberQuestion';
import { ChoiceQuestion } from '../classes/ChoiceQuestion';
import { Question } from './Question';
import { Answers } from 'prompts';
import { TextQuestion } from './TextQuestion';

interface IUser {
    username: string;
    passwort: string;
}

interface IQuiz {
    title: string;
    question: Question[];
}

export class User {
    public static user: User = new User();

    //register
    public register(_userName: string, _passwort: string): boolean {
        let userObject: IUser = { username: _userName, passwort: _passwort };
        FileHandler.writeJsonFile("./files/User.json", userObject)
        return true;
    }

    //login
    public async login(_userName: string, _passwort: string): Promise<boolean> {
        let allUser: IUser[] = await FileHandler.readJsonFile("./files/User.json");
        for (let i: number = 0; i < allUser.length; i++) {
            if (allUser[i].username == _userName && allUser[i].passwort == _passwort) {
                return true
            }
        }
        return false;
    }

    //statistic

    //create quiz
    public async createQuiz() {
        let quiz: IQuiz = { title: "", question: [] }
        let answer = await newConsole.askForAnAnswers("Enter the Quiz title:", 'text');
        quiz.title = answer.value;
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
                break;

            case "Choice":
                let quesChoice: ChoiceQuestion = new ChoiceQuestion()
                await quesChoice.setQuestion();
                await quesChoice.setAnswers();
                break;

            case "Text":
                let quesText: TextQuestion = new TextQuestion()
                await quesText.setQuestion();
                await quesText.setAnswers();
                break;

            default:
                newConsole.printLine("Option not available!");
        }
    }
}

