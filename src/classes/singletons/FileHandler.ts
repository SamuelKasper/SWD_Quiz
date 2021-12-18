import { readFileSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";

export class FileHandler {
  private static instance : FileHandler = new FileHandler();

  //if trying to create another instance of filehandler
  private constructor() {
    if(FileHandler.instance) 
      throw new Error("Instead of using new FileHandler(), please use FileHandler.getInstance() for Singleton!")
    FileHandler.instance = this;
  }

  //need for singleton
  public static getInstance() : FileHandler {
    return FileHandler.instance;
  }

  //read file
  public readJsonFile(_pathToFile: string) : any {
    let jsonRaw : Buffer = readFileSync(_pathToFile);
    let json : any = JSON.parse(jsonRaw.toString());
    return json;
  }

  //write file
  public writeJsonFile(_pathToFile : string, _dataToFile: any) : void {
    let file: any[] = this.readJsonFile(_pathToFile)
    file.push(_dataToFile)
    writeFileSync(_pathToFile, JSON.stringify(file));
  }

  //overwrite file
  public overwriteJsonFile(_pathToFile : string, _dataToFile: any) : void {
    writeFileSync(_pathToFile, JSON.stringify(_dataToFile));
  }

}

export default FileHandler.getInstance();