export class statisticDao{
    public playedQuizes: number;
    public correctAnswers: number;
    public answeredQuestions: number;
    public user: string;

    constructor(_playedQuizes: number, _correctAnswers: number, _answeredQuestions: number, _user:string){
        this.playedQuizes = _playedQuizes;
        this.correctAnswers = _correctAnswers;
        this.answeredQuestions = _answeredQuestions;
        this.user = _user;
    }
}