# ts-log-debug 

[![Build Status](https://travis-ci.org/Romakita/ts-log-debug.svg?branch=master)](https://travis-ci.org/Romakita/ts-log-debug)
[![Coverage Status](https://coveralls.io/repos/github/Romakita/ts-log-debug/badge.svg?branch=master)](https://coveralls.io/github/Romakita/ts-log-debug?branch=master)
[![TypeScript](https://badges.frapsoft.com/typescript/love/typescript.svg?v=100)](https://github.com/ellerbrock/typescript-badges/) 
[![TypeScript](https://badges.frapsoft.com/typescript/version/typescript-v18.svg?v=100)](https://github.com/ellerbrock/typescript-badges/)

> Provide logger written in TypeScript for TypeScript or JavaScript.

## Features

 * Prints info, debug, warn or error message with colorization.
 * Prints stack trace with Logger.trace() or Logger.withTrace().
 * Change stdout & stderr WritableStream.

## Installation
```bash
$ npm install -g typings typescript
$ npm install ts-log-debug
```

## API
### Class: Logger

The Logger class can be used to create a simple logger with configurable output streams and can be accessed using either `import * as $log from 'ts-log-debug'` or `var $log = require('debug-log')`.

###### In TypeScript
``` typescript
import {$log} from "ts-log-debug";

$log.debug('Test').
```

### new Logger(stdout[, stderr [, noColors]])
### new Logger(options)
**stdout**: `NodeJS.WritableStream`
**stderr**: `NodeJS.WritableStream`
**noColors**: `boolean`
**options**: `ILoggerOptions`

Creates a new `Logger` by passing one or two writable stream instances. `stdout` is a writable stream to print log or info output. `stderr` is used for warning or error output. If `stderr` isn't passed, the warning and error output will be sent to the stdout`.

``` typescript
import * as Fs from "fs";
import {Logger} from "ts-log-debug";

const output = Fs.createWriteStream('./stdout.log');
const errorOutput = Fs.createWriteStream('./stderr.log');

// custom simple logger
const $log = new Logger(output, errorOutput);

// use it like console
let count = 5;
$log.debug('count: %d', count);
// in stdout.log: count 5
```

The `$log` is a special `Logger` whose output is sent to `process.stdout` and `process.stderr`. It is equivalent to call :

```typescript
new Logger(process.stdout, process.stderr);
```

##### ILoggerOptions

* printDate : Print a date before log your message. (Date format : YYYY-MM-DD HH:MM:SS)
* noColors : Enable colors
* stdout : `NodeJS.WritableStream`
* stderr : `NodeJS.WritableStream`
* repporting : Object to enable or disable message printing for each output type (info, debug, trace, warn, error). By default all outputs are set to true. 

``` typescript
import {Logger} from 'ts-log-debug';
let $log = new Logger({
    printDate: true,
    repporting: {
        debug: false,
        trace: false,
        warn: false
    }
});

// OR

if(env == 'test'){
    $log.setSettings({
        printDate: false,
        repporting: {
            debug: true,
            error: true,
            warn: true
        }
    });
}

```

#### Logger.debug(...args)
**args**: `any[]`

Prints to stdout with newline. Multiple arguments can be passed, with the first used as the primary message and all additional used as substitution values similar to printf() (the arguments are all passed to [util.format()](https://nodejs.org/api/util.html#util_util_format_format)). 

``` typescript
import {$log} from 'ts-log-debug';
   
$log.debug('test');                        //[DEBUG] test
$log.debug({test:'test'});                 //[DEBUG] {'test':'test}
$log.debug('Format %j', {test:'test'});    //[DEBUG] Format {'test':'test}
   
//With stacktrace
$log.debug('test').withTrace();            //[DEBUG] test
                                           //        at Context.<anonymous> (/directory/file.ts:80:10)
                                           //        at ...
//With line only
$log.debug('test').withLine();             //[DEBUG] test
                                           //        at (/directory/file.ts:80:10)
```   

If formatting elements (e.g. %j) are not found in the first string then [util.inspect()](https://nodejs.org/api/util.html#util_util_inspect_inspect) is called on each argument and the resulting string values are concatenated. See [util.format()](https://nodejs.org/api/util.html#util_util_format_format) for more information. 

#### Logger.info(...args)
**args**: `any[]`
The Logger.info() function is an alias for Logger.debug(). 


#### Logger.trace(...args)
**args**: `any[]`

Prints to stderr the string '[TRACE]', followed by the [util.format()](https://nodejs.org/api/util.html#util_util_format_format) formatted message and stack trace to the current position in the code.

``` typescript
$log.trace('Show me');
  //[TRACE] Show me
  //    at Context.<anonymous> (/projects/ts-log-debug/test/spec/log.spec.ts:251:45)
  //    at callFn (/projects/ts-log-debug/node_modules/mocha/lib/runnable.js:315:21)
  //    at Test.Runnable.run (/projects/ts-log-debug/node_modules/mocha/lib/runnable.js:308:7)
  //    at Runner.runTest (/projects/ts-log-debug/node_modules/mocha/lib/runner.js:422:10)
  //    at /projects/ts-log-debug/node_modules/mocha/lib/runner.js:533:12
  //    at next (/projects/ts-log-debug/node_modules/mocha/lib/runner.js:342:14)
  //    at /projects/ts-log-debug/node_modules/mocha/lib/runner.js:352:7
  //    at next (/projects/ts-log-debug/node_modules/mocha/lib/runner.js:284:14)
  //    at Immediate._onImmediate (/projects/ts-log-debug/node_modules/mocha/lib/runner.js:320:5)
  //    at processImmediate [as _immediateCallback] (timers.js:383:17)
```


#### Logger.error(...args)
**args**: `any[]`

Prints to stderr with newline. Multiple arguments can be passed, with the first used as the primary message and all additional used as substitution values similar to printf() (the arguments are all passed to [util.format()](https://nodejs.org/api/util.html#util_util_format_format)). 

``` typescript
import {$log} from 'ts-log-debug';
   
$log.error('test');                        //[ERROR] test
$log.error({test:'test'});                 //[ERROR] {'test':'test}
$log.error('Format %j', {test:'test'});    //[ERROR] Format {'test':'test}
   
//With stacktrace
$log.error('test').withTrace();            //[ERROR] test
                                           //        at Context.<anonymous> (/directory/file.ts:80:10)
                                           //        at ...
//With line only
$log.error('test').withLine();             //[ERROR] test
                                           //        at (/directory/file.ts:80:10)
```   

If formatting elements (e.g. %j) are not found in the first string then [util.inspect()](https://nodejs.org/api/util.html#util_util_inspect_inspect) is called on each argument and the resulting string values are concatenated. See [util.format()](https://nodejs.org/api/util.html#util_util_format_format) for more information. 

#### Logger.warn(...args)
**args**: `any[]`
The Logger.warn() function is an alias for Logger.error(). 

## Test

```bash 
$ npm install -g mocha
$ npm test
```

## License

The MIT License (MIT)

Copyright (c) 2016 Romain Lenzotti

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[travis]: https://travis-ci.org/