import {$log as $gLog, Logger} from '../index';
import * as Chai from 'chai';
import * as Stream from "stream";
import {Writable} from "stream";

var expect = Chai.expect;
var util = require('util');

class IOStream extends Writable implements Writable{
    current = '';

    _write(chunk: any, encoding: string, callback: Function): void{
        this.current += chunk.toString('utf8');
    }

    read(){
        return this.current;
    }
}

describe('Logger', () => {

    let $log, ioStream;


    beforeEach(() => {
        try{
            ioStream = new IOStream();

            ioStream.on('error', function(error){
                console.error(error, error.stack);
            });

        }catch(er){
            console.error('Unable to instanciate stdout stream ', er);
        }
    });

    afterEach(() => {
        ioStream.end();
    });

    describe('debug()', () => {

        it('should print a debug log', () => {

            $log = new Logger(ioStream, ioStream, true);

            $log.debug('ézeffà^');

            expect(ioStream.read()).to.be.a('string');
            expect(ioStream.read()).to.contain('[DEBUG] ézeffà^');

        });

        it('should convert object to JSON', () => {


            $log = new Logger(ioStream, ioStream, true);

            $log.debug({test:'test'});

            expect(ioStream.read()).to.be.a('string');
            expect(ioStream.read()).to.contain('[DEBUG] {"test":"test"}');


        });

        it('should use util.format() to print messages', () => {


            $log = new Logger(ioStream, ioStream, true);

            $log.debug('util.format(%j) => %s', {test:'test'}, '4');

            expect(ioStream.read()).to.be.a('string');
            expect(ioStream.read()).to.contain('[DEBUG] util.format({"test":"test"}) => 4');

        });

        it('should print nothing when log is disabled', () => {
            $log = new Logger(ioStream, ioStream, true);

            $log.stop();

            $log.debug('util.format(%j) => %s', {test:'test'}, '4');

            expect(ioStream.read()).to.be.a('string');
            expect(ioStream.read()).to.equal('');

        });

    });

    describe('info()', () => {

        it('should print a info log', () => {

            $log = new Logger(ioStream, ioStream, true);

            $log.info('ézeffà^');

            expect(ioStream.read()).to.be.a('string');
            expect(ioStream.read()).to.contain('[INFO ] ézeffà^');

        });

        it('should convert object to JSON', () => {


            $log = new Logger(ioStream, ioStream, true);

            $log.info({test:'test'});

            expect(ioStream.read()).to.be.a('string');
            expect(ioStream.read()).to.contain('[INFO ] {"test":"test"}');


        });

        it('should use util.format() to print messages', () => {


            $log = new Logger(ioStream, ioStream, true);

            $log.info('util.format(%j) => %s', {test:'test'}, '4');

            expect(ioStream.read()).to.be.a('string');
            expect(ioStream.read()).to.contain('[INFO ] util.format({"test":"test"}) => 4');

        });

        it('should print nothing when log is disabled', () => {
            $log = new Logger(ioStream, ioStream, true);

            $log.stop();

            $log.info('util.format(%j) => %s', {test:'test'}, '4');

            expect(ioStream.read()).to.be.a('string');
            expect(ioStream.read()).to.equal('');

        });
    });


    describe('error()', () => {

        it('should print a error log', () => {

            $log = new Logger(ioStream, ioStream, true);

            $log.error('ézeffà^');

            expect(ioStream.read()).to.be.a('string');
            expect(ioStream.read()).to.contain('[ERROR] ézeffà^');

        });

        it('should convert object to JSON', () => {


            $log = new Logger(ioStream, ioStream, true);

            $log.error({test:'test'});

            expect(ioStream.read()).to.be.a('string');
            expect(ioStream.read()).to.contain('[ERROR] {"test":"test"}');


        });

        it('should use util.format() to print messages', () => {


            $log = new Logger(ioStream, ioStream, true);

            $log.error('util.format(%j) => %s', {test:'test'}, '4');

            expect(ioStream.read()).to.be.a('string');
            expect(ioStream.read()).to.contain('[ERROR] util.format({"test":"test"}) => 4');

        });


        it('should print error', () => {

            $log = new Logger(ioStream, ioStream, true);

            $log.error(new EvalError('Test'));

            expect(ioStream.read()).to.be.a('string');
            expect(ioStream.read()).to.contain('[ERROR] EvalError: Test');

        });

        it('should print nothing when log is disabled', () => {
            $log = new Logger(ioStream, ioStream, true);

            $log.stop();

            $log.error('util.format(%j) => %s', {test:'test'}, '4');

            expect(ioStream.read()).to.be.a('string');
            expect(ioStream.read()).to.equal('');

        });

    });

    describe('warn()', () => {

        it('should print a debug log', () => {

            $log = new Logger(ioStream, ioStream, true);

            $log.warn('ézeffà^');

            expect(ioStream.read()).to.be.a('string');
            expect(ioStream.read()).to.contain('[WARN ] ézeffà^');

        });

        it('should convert object to JSON', () => {


            $log = new Logger(ioStream, ioStream, true);

            $log.warn({test:'test'});

            expect(ioStream.read()).to.be.a('string');
            expect(ioStream.read()).to.contain('[WARN ] {"test":"test"}');


        });

        it('should use util.format() to print messages', () => {


            $log = new Logger(ioStream, ioStream, true);

            $log.warn('util.format(%j) => %s', {test:'test'}, '4');

            expect(ioStream.read()).to.be.a('string');
            expect(ioStream.read()).to.contain('[WARN ] util.format({"test":"test"}) => 4');

        });

        it('should print nothing when log is disabled', () => {
            $log = new Logger(ioStream, ioStream, true);

            $log.stop();

            $log.warn('util.format(%j) => %s', {test:'test'}, '4');

            expect(ioStream.read()).to.be.a('string');
            expect(ioStream.read()).to.equal('');

        });

    });


    describe('withTrace()', () => {
        it('should print message with stackTrace', () => {

            $log = new Logger(ioStream, ioStream, true);
            //$log.debug('test');
            $log.withTrace();

            expect(ioStream.read()).to.be.a('string');
            expect(ioStream.read()).to.contain('at Context');

        });

        it('should print nothing when log is disabled', () => {
            $log = new Logger(ioStream, ioStream, true);
            //$log.debug('test');
            $log.stop();
            $log.withTrace();

            expect(ioStream.read()).to.be.a('string');
            expect(ioStream.read()).to.equal('');

        });

    });


    describe('withLine()', () => {
        it('should print message with line', () => {

            $log = new Logger(ioStream, ioStream, true);
            //$log.debug('test');
            $log.withLine();

            expect(ioStream.read()).to.be.a('string');
            expect(ioStream.read()).to.contain('at');

        });

        it('should print nothing when log is disabled', () => {
            $log = new Logger(ioStream, ioStream, true);
            //$log.debug('test');
            $log.stop();
            $log.withLine();

            expect(ioStream.read()).to.be.a('string');
            expect(ioStream.read()).to.equal('');


            $log.start();

        });

    });


    describe('trace()', function() {

        it('should print a stacktrace with a custom message', () => {

            $log = new Logger(ioStream, ioStream, true);

            $log.trace('test');

            expect(ioStream.read()).to.be.a('string');
            expect(ioStream.read()).to.contain('[TRACE] test');
            expect(ioStream.read()).to.contain('at Context');

        });

        it('should print a stacktrace with a custom message', () => {

            $log = new Logger(ioStream, ioStream, true);

            $log.trace('test', 'test');

            expect(ioStream.read()).to.be.a('string');
            expect(ioStream.read()).to.contain('[TRACE] test test');
            expect(ioStream.read()).to.contain('at Context');

        });

        it('should print nothing when log is disabled', () => {
            $log = new Logger(ioStream, ioStream, true);

            $log.stop();

            $log.trace('util.format(%j) => %s', {test:'test'}, '4');

            expect(ioStream.read()).to.be.a('string');
            expect(ioStream.read()).to.equal('');

        });

    });


    describe('new Construtor options', function() {
        it('should create new logger with options', function() {

            $log = new Logger({
                noColors: false,
                stdout: ioStream,
                stderr: ioStream,
                printDate: true,
                repporting: {
                    debug: false,
                    warn: false,
                    info: false,
                    error: false,
                    trace: true
                }
            });

            $log.trace('test');

        });

        it('should create new logger with options (not)', () => {
            $log = new Logger({
                noColors: false,
                stdout: ioStream,
                stderr: ioStream,
                printDate: true,
                repporting: {
                    debug: false,
                    warn: false,
                    info: false,
                    error: false
                }
            });

            $log.setRepporting({trace: false});

            $log.trace('test');

            expect(ioStream.read()).to.be.a('string');
            expect(ioStream.read()).to.not.contain('[TRACE] test');
            expect(ioStream.read()).to.not.contain('at Context');

            $log.debug('test').withTrace();
            $log.info('test').withLine();
            $log.warn('test');
            $log.error('test');

        });
    });

    describe('Example rendering', () => {

        it('show', () => {

            $gLog
                .info('info().withTrace()').withTrace()
                .debug('debug().withLine()').withLine();

            $gLog
                .warn('warn()')
                .error('error()')
                .trace('trace()');

            $gLog.setPrintDate(true);

            $gLog
                .info('info().withTrace()').withTrace()
                .debug('debug().withLine()').withLine();

            $gLog
                .warn('warn()')
                .error('error()')
                .trace('trace()');
        });
    })

});