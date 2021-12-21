import newConsole from './classes/singletons/NewConsole';
import { Answers } from 'prompts';
import { User } from './classes/User';
import { stat } from 'fs';
import { Statistic } from './classes/Statistic';
import { statisticDao } from './dao/statisticDao';

namespace Project {
  export class Main {
    constructor() { }
    private playedQuizzes: number = 0;
    private loggedIn: boolean = false;
    private loggedInName: string = "";
    //------------------------------ Things to show in Terminal
    // Options to show in Terminal
    public async showOptionsLogin(): Promise<void> {
      let answer: Answers<string> = await newConsole.showOptions(
        [
          "Register",
          "Login",
          "Play",
          "Create Quiz",
          "Statistic",
        ],
        "Which option do you want to choose?"
      );
      this.handleAnswerLogin(answer.value);
    }

    // Answers which appears after choosing an option
    public async handleAnswerLogin(_answer: number): Promise<void> {
      switch (_answer) {
        case 1:
          await this.handleUser("Register");
          await this.showOptionsLogin();
          break;

        case 2:
          await this.handleUser("Login");
          break;

        case 3:
          await this.handleUser("Play");
          break;

        case 4:
          if (this.loggedIn) {
            await this.handleUser("CreateQuiz");
          } else {
            newConsole.printLine("You have to log in to create a quiz!\n");
            this.showOptionsLogin();
          }
          break;

        case 5:
          if (this.loggedIn) {
            await this.handleUser("Statistic");
          } else {
            newConsole.printLine("You have to log in to create a quiz!\n");
            this.showOptionsLogin();
          }
          break;

        default:
          newConsole.printLine("Option not available!");
      }
    }

    public async handleUser(_task: string): Promise<void> {
      let userName: Answers<string>;
      let password: Answers<string>;
      let success: boolean = false;
      switch (_task) {
        case "Register":
          //register code
          userName = await newConsole.askForAnAnswers("gib dein UserNamen ein", 'text');
          password = await newConsole.askForAnAnswers("gib dein Passwort ein", 'password');
          let nameValid: boolean = await User.user.checkUsernameFree(userName.value);
          if (nameValid) {
            success = User.user.register(userName.value, password.value)
            newConsole.printLine("Success: " + success + "\n");
            break;
          }else{
            newConsole.printLine("Success: " + success + "Name already used.\n");
          }
          break;

        case "Login":
          //login code
          userName = await newConsole.askForAnAnswers("gib dein UserNamen ein", 'text');
          password = await newConsole.askForAnAnswers("gib dein Passwort ein", 'password');
          success = await User.user.login(userName.value, password.value)
          if (success) {
            this.loggedIn = true;
            this.loggedInName = userName.value;
            newConsole.printLine("Success: " + success + "\n");
            this.showOptionsLogin();
          } else {
            newConsole.printLine("Success: " + success + "\nUsername or password is wrong! \n");
            this.showOptionsLogin();
          }
          break;

        case "Play":
          //play code
          let stats: number[] = await User.user.showQuizzes();
          this.playedQuizzes++;
          if (this.loggedIn) {
            let statistic: statisticDao = new statisticDao(this.playedQuizzes, stats[1], stats[0], this.loggedInName);
            Statistic.saveStatistic(statistic);
            Statistic.getStatistic(this.loggedInName);
          } else {
            newConsole.printLine("Log in to save statistics!");
          }
          await this.showOptionsLogin();
          break;

        case "CreateQuiz":
          //create quiz code
          success = await User.user.createQuiz();
          if (success)
            newConsole.printLine("Success: " + success + "Quiz was successfully created\n");
          else
            newConsole.printLine("Success: " + success + "\n Error");
          this.showOptionsLogin();
          break;

        case "Statistic":
          //show stats
          Statistic.getStatistic(this.loggedInName);
          this.showOptionsLogin();
          break;

        default:
          newConsole.printLine("Error");
      }
    }

    /*------------------------------Main function*/
    public async start(): Promise<void> {
      this.showOptionsLogin();
    }
  }
  let main: Main = new Main();
  main.start();
}