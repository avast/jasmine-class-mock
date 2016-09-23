describe("create", function () {
    var create = require('../index.js').create;

    it("creates empty mock", function () {
        var C = create();
        expect(C).not.toHaveBeenCalled();
    });

    it("returns created instances", function () {
        var C = create();
        var c0 = new C();
        var c1 = new C();
        var c2 = new C();

        expect(C.first()).toBe(c0);
        expect(C.mostRecent()).toBe(c2);
    });

    it("returns all created instances accessible", function () {
        var C = create();
        var c0 = new C();
        var c1 = new C();
        var c2 = new C();

        expect(C.instance.count()).toBe(3);
        expect(C.instance(1)).toBe(c1);
    });

    it("contains prototype properties", function () {
        var C = create({ foo: jasmine.createSpy("foo") });
        var c = new C();
        
        expect(c.foo).toBeDefined();

        c.foo();

        expect(c.foo).toHaveBeenCalled();
    });

    it("contains static properties", function () {
        var C = create({}, { soo: jasmine.createSpy("soo") });

        expect(C.soo).toBeDefined();

        C.soo();

        expect(C.soo).toHaveBeenCalled();
    });

    it("mocks real class properties", function () {
        var C = create(Date);
        var c = new C();

        expect(c.getDate).toBeDefined();
        expect(c.getDate()).toBeUndefined();
    });

    it("mocks real class static properties", function () {
        var C = create(Date);

        expect(C.now).toBeDefined();
        expect(C.now()).toBeUndefined();
    });

    it("doesn't overwrite members", function () {
        var C = create("MyDate", { getDate: function () { return true; } }, { now: function () { return 0; } }, Date);
        var c = new C();

        expect(c.getDate()).toBe(true);
        expect(C.now()).toBe(0);
    });
});
