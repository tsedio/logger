import * as Chai from "chai";
import * as Sinon from "sinon";
import * as SinonChai from "sinon-chai";
import * as ChaiAsPromised from "chai-as-promised";

Chai.should();
Chai.use(SinonChai);
Chai.use(ChaiAsPromised);

const expect = Chai.expect;
const assert = Chai.assert;

const $logStub = {
    $log: {
        info: Sinon.stub(),
        debug: Sinon.stub(),
        error: Sinon.stub(),
        warn: Sinon.stub()
    }
};

export {
    expect,
    assert,
    Sinon,
    SinonChai,
    $logStub
};