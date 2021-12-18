import prompts, { Answers, PromptType } from 'prompts';
import { Question } from './Question';
import newConsole from '../classes/singletons/NewConsole';
import { ChoiceQuestion } from './ChoiceQuestion';
import { NumberQuestion } from './NumberQuestion';
import { TextQuestion } from './TextQuestion';
import FileHandler from './singletons/FileHandler';
import { quizDao } from '../dao/quizDao';

export class Quiz {
    constructor() { }

    public iQuiz: quizDao = { title: "", question: [], isPublic: false }

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
        this.iQuiz.isPublic = isPublic.value;
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
                //await this.handleUser("Number");
                let quesNumber: NumberQuestion = new NumberQuestion()
                await quesNumber.setQuestion();
                await quesNumber.setAnswers();
                this.iQuiz.question.push(quesNumber)
                break;

            case 2:
                //await this.handleUser("Choice");
                let quesChoice: ChoiceQuestion = new ChoiceQuestion()
                await quesChoice.setQuestion();
                await quesChoice.setAnswers();
                this.iQuiz.question.push(quesChoice)
                break;

            case 3:
                //await this.handleUser("Text");
                let quesText: TextQuestion = new TextQuestion()
                await quesText.setQuestion();
                await quesText.setAnswers();
                this.iQuiz.question.push(quesText)
                break;

            default:
                newConsole.printLine("Option not available!");
        }
    }
   
    // Options to show in Terminal
    public async showQuizzes(): Promise<void> {
        let allQuizzes: quizDao[] = await FileHandler.readJsonFile("./files/Quiz.json");
        let quizNames: string[] = [];
        //save data from json in array
        for (let i: number = 0; i < allQuizzes.length; i++) {
            quizNames.push(allQuizzes[i].title);
        }
        //newConsole.printLine(quizNames[0]);
        //show the quiz names
        if (quizNames.length > 0) {
            if (quizNames.length == 1) {
                await this.playQuiz(allQuizzes[0]);
            } else {
                let answer: Answers<string> = await newConsole.showOptions(
                    quizNames,
                    "Choose a Quiz you want to play?"
                );
                await this.playQuiz(allQuizzes[answer.value]);
            }
        }
    }

    public async playQuiz(_quiz: quizDao) {
        let allQuizzes: quizDao[] = await FileHandler.readJsonFile("./files/Quiz.json");
        newConsole.printLine("Quiz Running");
        for (let i: number = 0; i < allQuizzes.length; i++) {
            newConsole.printLine(allQuizzes[i].title);
        }

    }

}