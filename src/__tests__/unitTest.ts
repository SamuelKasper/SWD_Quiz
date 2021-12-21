import { User } from "../classes/User"

describe("test", () =>{
    test("check if username is valid", async () =>{
        expect(await User.user.checkUsernameFree("Paul") == true ).toBeTruthy();
    });
    test("check if username is not valid", async () =>{
        expect(await User.user.checkUsernameFree("Paul") == false ).toBeFalsy();
    });
});