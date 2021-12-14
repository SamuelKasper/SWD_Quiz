import readline from 'readline';
import prompts, { Answers, PromptType } from 'prompts';

class newConsole {
    /**-----------------------------Singleton */
    //declare an instance of newConsole
    private static instance: newConsole;

    constructor() { }

    public static getInstance(): newConsole {
        // Create a new instance of newConsole if it doesn't exist yet
        if (!newConsole.instance)
            newConsole.instance = new newConsole();
        // Return the intance of newConsole
        return newConsole.instance;
    }

    /**-------------------------------Terminal Output */
    public consoleLine: readline.ReadLine = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    public printLine(line: string): void {
        this.consoleLine.write(line);
    }

    /**-----------------------------Terminal */
    // Function for showing the given parameters in Terminal
    public showOptions(_option: string[], _question: string): Promise<Answers<string>> {
        let choices: any[] = []

        for (let i: number = 1; i <= _option.length; i++) {
            choices.push({ title: _option[i - 1], value: i })
        }
        return prompts({
            type: 'select',
            name: 'value',
            message: _question,
            choices: choices,
            initial: 1
        })
    }

    // Function for setting questions or answers
    public askForAnAnswers(_question: string, _type: PromptType): Promise<Answers<string>> {
        return prompts({
            type: _type,
            name: 'value',
            message: _question,
            initial: 1
        })
    }
}
// Export the instance of newConsole, so you can use it in other classes
export default newConsole.getInstance();