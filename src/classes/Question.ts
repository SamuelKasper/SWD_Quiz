import prompts, { Answers, PromptType } from 'prompts';
import newConsole from './singletons/NewConsole';

export abstract class Question {
  protected abstract questionText: string;
  protected abstract correctAnswer: string | number;
  protected abstract type: prompts.PromptType;

  constructor() {}
  
  public async setQuestion(): Promise<void> {
    let questionText: Answers<string> = await newConsole.askForAnAnswers("Gib eine Frage ein:", 'text');
    this.questionText = questionText.value;
  }

  public async setAnswers(): Promise<void> {
    let correct: Answers<string> = await newConsole.askForAnAnswers("Gib die korrekte Antwort ein:", this.type);
    this.correctAnswer = correct.value;
  }
}