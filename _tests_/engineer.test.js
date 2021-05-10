const Engineer = require("../lib/engineer")

describe("Engineer", () => {
    it("Can create new engineer", () => {
        const engineer = new Engineer();
        expect(typeof(engineer)).toBe("object");
    });

    it("can return github username", () => {
        const gitHub = 'haracyd';
        const engineer = new Engineer("Hara", 123, "email@email.com", gitHub);

        expect(engineer.getGithub()).toBe(gitHub);
    })

    it("Returns Engineer", ()=> {
        const employee = new Engineer ("Hara", 123, "email@email.com")
        const role = "Engineer";      

        expect(employee.getRole()).toBe(role);
    })
})