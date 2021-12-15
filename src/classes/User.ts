import FileHandler from '../classes/singletons/FileHandler';
import newConsole from '../classes/singletons/NewConsole';
import { NumberQuestion } from '../classes/NumberQuestion';
import { ChoiceQuestion } from '../classes/ChoiceQuestion';
import { Question } from './Question';
import { Answers } from 'prompts';
import { TextQuestion } from './TextQuestion';
import { Quiz } from './Quiz';

interface IUser {
    username: string;
    passwort: string;
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
        let quiz: Quiz = new Quiz();
        quiz.newQuiz();
    }
}

