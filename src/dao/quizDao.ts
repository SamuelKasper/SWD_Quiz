import { Question } from "../classes/Question";

export class quizDao {
  public title: string = "";
  public question: Question[] = [];
  public isPublic: boolean = false;

  constructor(_title: string, _question: Question[], _isPublic: boolean) {
    this.title = _title;
    this.question = _question;
    this.isPublic = _isPublic;
  }
}
