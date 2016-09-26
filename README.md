# jasmine-class-mock

Create a mock class for the Jasmine framework, optionally with a stub methods that exist on a real class.

## Usage
```
var classMock = require('jasmine-class-mock');
```

### Empty class
```
var MyClass = classMock.create("MyClass");
var myInstance = new MyClass();
expect(MyClass.instance.count()).toBe(1);
```

### Adding mehods and other properties
```
var MyClass = classMock.create("MyClass", { spyFunc: jasmine.createSpy("spyFunc") });
var myInstance = new MyClass();
myInstance.spyFunc();
expect(myInstance.spyFunc).toHaveBeenCalled();
expect(MyClass.mostRecent().spyFunc).toHaveBeenCalled();
```

### Adding static methods
```
var MyClass = classMock.create("MyClass", {}, { spyStaticFunc: jasmine.createSpy("spyStaticFunc") });
MyClass.spyStaticFunc();
expect(MyClass.spyStaticFunc).toHaveBeenCalled();
```

### Mocking from an existing template
```
var MyDate = classMock.create("MyDate", { toLocaleDateString: function () { return "hahaha"; }, Date);
var d = new MyDate();
expect(d.toLocaleDateString()).toBe("hahaha");  // calls stub
expect(d.toLocaleTimeString()).toBeUndefined(); // template methods are replaced by noop
```

## API

### `create(name, members, staticMembers, realClass)`

__name__: `String`

(optional) label representing the constructor calls in log messages.

__members__: `object`

(optional) member functions and attributes of the returned class instance. At least an empty object must be present if staticMembers exist.

__staticMembers__: `object`

(optional) static functions and attribute of the returned class itself.

__realClass__: `function`

(optional) template to create the returned class from. Functions are replaced by empty functions returning no value, unless overwitten by `members` or `staticMembers`.

#### Return value

A Jasmine spy that acts as a class constructor. Extra properties:

__first__: `object`

The first instance of the class created by a new operator.

__mostRecent__: `object`

The last instance of the class created by a new operator.

__instance(i)__: `object`

`i`th instance of the class created by a new operator.

__instance.count()__: `int`

Total number of instances created.
