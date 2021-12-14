import prompts, { Answers, PromptType } from 'prompts';
import { Question } from './Question';

export class TextQuestion extends Question {
    protected questionText: string = "";
    protected correctAnswer: string = "";
    protected type: prompts.PromptType = 'text'
    constructor(
    ) {
        super();
    }

    public clone(): TextQuestion {
        let clonedQuestion: TextQuestion = new TextQuestion(

        );
        return clonedQuestion;
    }
}