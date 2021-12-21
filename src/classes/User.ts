import FileHandler from '../classes/singletons/FileHandler';
import { Quiz } from './Quiz';
import { userDao } from '../dao/userDao';
import NewConsole from './singletons/NewConsole';

export class User {
    public static user: User = new User();

    //register
    public register(_userName: string, _passwort: string): boolean {
        let regexName: RegExp = /^[a-z]{1,10}$/;
        let nameIsValid: boolean = regexName.test(_userName);
        if (nameIsValid) {
            let userObject: userDao = { username: _userName, password: _passwort };
            FileHandler.writeJsonFile("./files/User.json", userObject)
            return true;
        }else{
            NewConsole.printLine("username invalid. Only 10 characters allowed");
            return false;
        }
    }

    //login
    public async login(_userName: string, _passwort: string): Promise<boolean> {
        let allUser: userDao[] = await FileHandler.readJsonFile("./files/User.json");
        for (let i: number = 0; i < allUser.length; i++) {
            if (allUser[i].username == _userName && allUser[i].password == _passwort) {
                return true
            }
        }
        return false;
    }

    //check username
    public async checkUsernameFree(_name: string): Promise<boolean> {
        let allUser: userDao[] = await FileHandler.readJsonFile("./files/User.json");
        for (let i: number = 0; i < allUser.length; i++) {
            if (allUser[i].username == _name) {
                return false
            }
        }
        return true;
    }

    //create quiz
    public async createQuiz(): Promise<boolean> {
        let quiz: Quiz = new Quiz();
        await quiz.newQuiz();
        return true;
    }

    //show quizzes
    public async showQuizzes() {
        let quiz: Quiz = new Quiz();
        let stats: number[] = await quiz.showQuizzes();
        return stats;
    }
}

