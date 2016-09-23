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
