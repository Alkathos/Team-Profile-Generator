const Manager = require("../lib/manager")

describe("Manager", () => {
    it("Can create new manager", () => {
        const manager = new Manager();
        expect(typeof(manager)).toBe("object");
    });

    it("can return office number", () => {
        const officeNum = '999-999-9999';
        const manager = new Manager("Hara", 123, "email@email", officeNum);

        expect(manager.getOfficeNum()).toBe(officeNum);
    });

    it("Returns Manager", ()=> {
        const role = 'Manager';
        const manager = new Manager ("Hara", 123, "email@email.com");

        expect(manager.getRole()).toBe(role);
    });
})