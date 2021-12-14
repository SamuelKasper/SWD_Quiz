import prompts, { Answers, PromptType } from 'prompts';
import newConsole from './singletons/NewConsole';
import { Question } from './Question'

export class ChoiceQuestion extends Question {
    protected questionText: string = "";
    public answers: Array<string> = [];
    protected correctAnswer: string = "";
    protected type: prompts.PromptType = 'text'

    constructor() {super();}

    public async setAnswers(): Promise<void> {
        await super.setAnswers();
        this.answers.push(this.correctAnswer);

        let nextAnswer: boolean= true;
        while(nextAnswer == true){
            let falseAnswer: Answers<string>= await newConsole.askForAnAnswers("Gib eine falsche Antwort ein:", this.type);
            this.answers.push(falseAnswer.value);
            if(this.answers.length>=4){
                nextAnswer = false;
                break;
            }
            let antoherAnswer: Answers<string>= await newConsole.askForAnAnswers("Willst du noch eine Antwort eingeben?:", 'confirm');
            nextAnswer=antoherAnswer.value;
        }
    }

    public clone(): ChoiceQuestion {
        let clonedQuestion: ChoiceQuestion = new ChoiceQuestion();
        return clonedQuestion;
    }
}