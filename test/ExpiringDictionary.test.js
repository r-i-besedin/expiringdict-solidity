var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

describe('ExpiringDict', function() {
    before(async function() {
        this.ExpDict = await ethers.getContractFactory("ExpiringDictionary");
    });

    beforeEach(async function() {
        this.expdict = await this.ExpDict.deploy();
	await this.expdict.deployed();
    });

    it('can retrieve a stored value', async function(){
        await this.expdict.put('hello', 'world', 0);
	expect((await this.expdict.get('hello')).data.toString()).to.equal('world');
    });

    it('can store and retrieve multiple values', async function(){
        await this.expdict.put('hello', 'world', 0);
	await this.expdict.put('hello2', 'world2', 0);
        expect((await this.expdict.get('hello')).data.toString()).to.equal('world');
        expect((await this.expdict.get('hello2')).data.toString()).to.equal('world2');
    });

    it('entry ttl is based on entry type', async function(){
	var result = await this.expdict.put('hello', 'world', 0);
	var block1timestamp = (await ethers.provider.getBlock(result.blockNumber)).timestamp;
        result = await this.expdict.put('hello2', 'world2', 1);
	var block2timestamp = (await ethers.provider.getBlock(result.blockNumber)).timestamp;
        expect(Number((await this.expdict.get('hello')).validUntilTime)).to.be.equal(block1timestamp + 300);
        expect(Number((await this.expdict.get('hello2')).validUntilTime)).to.be.equal(block2timestamp + 31556952);
    });
    

    it('cant change entry value until its expired', async function(){
        await this.expdict.put('hello', 'world', 0);
	var self = this
	expect(self.expdict.put('hello', 'world2', 0)).to.be.rejected;
    });

    it('can change entry value after its expired', async function(){
	this.timeout(305 * 1000);
        await this.expdict.put('hello', 'world', 0);
	var self = this
	console.log('Waiting 5 minutes until entry value expired')
	await new Promise(resolve => setTimeout(resolve, 301 * 1000));
	//make new entry to update block time
        await self.expdict.put('hello2', 'www', 0);
        await self.expdict.put('hello', 'world2', 0);
        expect((await this.expdict.get('hello')).data.toString()).to.equal('world2');
    });
});
