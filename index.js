'use strict';

/**
Create a mock class

Static methods:
instance(i)      - class instance orderred by creation
instance.count() - number of instances created
first()          - first instance
mostRecent()     - last instance

@param name [string] class identifier
@param members [object] prototype properties
@param staticMembers [object] static properties
@param realClass [function] template
@return [function] result mock
*/
function create(name, members, staticMembers, realClass) {
    if (typeof name !== 'string' && typeof name !== 'undefined') {
        realClass = staticMembers;
        staticMembers = members;
        members = name;
        name = undefined;
    }
    if (typeof members === 'function' && typeof staticMembers === 'undefined' && typeof realClass === 'undefined') {
        realClass = members;
        members = null;
    }
    if (typeof staticMembers === 'function' && typeof realClass === 'undefined') {
        realClass = staticMembers;
        staticMembers = null;
    }

    var methods = {
        first: function() { return this.calls.first().object; },
        mostRecent: function () { return this.calls.mostRecent().object; }
    };

    var C = jasmine.createSpy(name, methods);

    Object.defineProperty(C, "instance", {
        get: function () {
            var f = function (i) { return this.calls.all()[i].object; }.bind(this);
            f.count = function () { return this.calls.count(); }.bind(this);
            return f;
        }
    });

    if (members) {
        shallowCopyIfNotExist(C.prototype, members)
    }

    if (staticMembers) {
        shallowCopyIfNotExist(C, staticMembers);
    }

    if (realClass) {
        if (realClass.prototype) {
            shallowCopyIfNotExist(C.prototype, realClass.prototype, { 'function': noop });
            shallowCopyIfNotExist(C, realClass, { 'function': noop });
        }
        else {
            shallowCopyIfNotExist(C.prototype, realClass, { 'function': noop });
        }
    }

    return C;
}

var IGNORE = {
    "length": true,
    "name": true,
    "arguments": true,
    "caller": true,
    "prototype": true,
    "constructor": true
};


function shallowCopyIfNotExist(target, source, replace) {
    Object.getOwnPropertyNames(source).forEach(function (prop) {
        if (IGNORE[prop]) {
            return;
        }

        var e = Object.getOwnPropertyDescriptor(target, prop);
        if (e) {
            return;
        }

        var r;
        if (replace) {
            r = Object.getOwnPropertyDescriptor(replace, prop);
        }

        if (typeof r !== 'undefined') {
            Object.defineProperty(target, prop, r);
        }
        else {
            var d = Object.getOwnPropertyDescriptor(source, prop);
            if (replace && typeof d.value === 'function') {
                target[prop] = noop;
            }
            else {
                if (replace && typeof d.get === 'function') {
                    d.get = noop;
                }
                if (replace && typeof d.set === 'function') {
                    d.set = noop;
                }
                Object.defineProperty(target, prop, d);
            }
        }
    });
}

function noop() { }

exports.create = create;
