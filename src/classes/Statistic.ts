import { statisticDao } from "../dao/statisticDao";
import FileHandler from "./singletons/FileHandler";
import NewConsole from "./singletons/NewConsole";

export class Statistic{
    constructor(){}

    public static async saveStatistic(_statistic: statisticDao){
        let oldData: statisticDao[] = FileHandler.readJsonFile("./files/Statistic.json")
        for (let i: number = 0; i < oldData.length; i++) {
            if (oldData[i].user == _statistic.user) {
                oldData[i] = new statisticDao(_statistic.playedQuizes, _statistic.correctAnswers, _statistic.answeredQuestions, _statistic.user);
                FileHandler.overwriteJsonFile("./files/Statistic.json", oldData);
                return;
            }
        }
        oldData.push(new statisticDao(_statistic.playedQuizes, _statistic.correctAnswers, _statistic.answeredQuestions, _statistic.user));
        FileHandler.overwriteJsonFile("./files/Statistic.json", oldData);
    }

    public static async getStatistic(_user: string) {
        let oldData: statisticDao[] = FileHandler.readJsonFile("./files/Statistic.json")
        for (let i: number = 0; i < oldData.length; i++) {
            if (oldData[i].user == _user) {
                NewConsole.printLine("Quizzes played: " +oldData[i].playedQuizes + "\nQuestions answered: " + oldData[i].answeredQuestions + "\nCorrect answers: " + oldData[i].correctAnswers + "\nUser: " + oldData[i].user + "\n");
            }
        }
    }

}