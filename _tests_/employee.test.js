const Employee = require("../lib/employee");

describe("Employee", () => {
    it("Can create new employee", () => {
        const employee = new Employee();
        expect(typeof(employee)).toBe("object");
    });

    it("Can set name in argument", () => {
        const name = "Hara";
        const employee = new Employee(name);
        expect(employee.name).toBe(name);
    });

    it("Can set email in argument", () => {
        const email = "email@email.com";
        const employee = new Employee("Some", 1, email);
        expect(employee.email).toBe(email);
    });

    describe("getName", () => {
        it("Can get name with function", () => {
            const name = "Hara";
            const employee = new Employee(name);
            expect(employee.getName()).toBe(name);
        });
    });
        
    describe("getId", () => {
        it("Can get ID", () => {
            const id = 123456;
            const employee = new Employee("Some", id);
            expect(employee.getId()).toBe(id);
        });
    });
        
    describe("getEmail", () => {
        it("Can get email", () => {
            const email = "email@email.com";
            const employee = new Employee("Some", 1, email);
            expect(employee.getEmail()).toBe(email);
        });
    });
        
    describe("getRole", () => {
        it("getRole() should return \"Employee\"", () => {
            const test = "Employee";
            const employee = new Employee("Hara", 1, "email@email.com");
            expect(employee.getRole()).toBe(test);
        });
    });
    
});