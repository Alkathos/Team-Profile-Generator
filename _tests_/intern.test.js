const Intern = require("../lib/intern")

describe("Intern", () => {
    it("Can create new intern", () => {
        const intern = new Intern();
        expect(typeof(intern)).toBe("object");
    });

    it("can return school", () => {
        const school = 'University of Miami';
        const intern = new Intern ("Hara", 123, "email@email.com", school);

        expect(intern.getSchool()).toBe(school);
    })

    it("Returns Intern", ()=> {
        const role = 'Intern';
        const intern = new Intern ("Hara", 123, "email@email.com")

        expect(intern.getRole()).toBe(role)
    })
})