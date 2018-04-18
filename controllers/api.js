
const sleep = require('sleep');

const Chain3 = require('chain3');

const chain3 = new Chain3();

chain3.setProvider(new chain3.providers.HttpProvider('http://127.0.0.1:8545'));

const APIError = require('../rest').APIError;

module.exports = {
    'GET /api/block/:hash_or_height': async (ctx, next) => {
        var data = chain3.mc.getBlock(ctx.params.hash_or_height);
		if (!data) {
            throw new APIError('invalid_data', 'not found');
		}
        console.log(`got ${data} ...`);
        ctx.rest(data);
    },
    'GET /api/tx/:hash': async (ctx, next) => {
        var data = chain3.mc.getTransaction(ctx.params.hash);
		if (!data) {
            throw new APIError('invalid_data', 'not found');
		}
        console.log(`got data ${data} ...`);
        ctx.rest(data);
    },
    'GET /api/address/:address': async (ctx, next) => {
        var data = chain3.mc.getBalance(ctx.params.address);
		if (!data) {
            throw new APIError('invalid_data', 'not found');
		}
        console.log(`got data ${data} ...`);
        ctx.rest(data);
    },
    'GET /api/search/:hash': async (ctx, next) => {
        var data = chain3.mc.getBlock(ctx.params.hash);
		sleep.sleep(2)
		if (!data) {
			console.log("try tx")
        	data = chain3.mc.getTransaction(ctx.params.hash);
			sleep.sleep(2)
			if (!data) {
				console.log("try wallet")
        		data = chain3.mc.getBalance(ctx.params.hash);
				sleep.sleep(2)
				if (!data) {
            		throw new APIError('invalid_data', 'not found');
				} else {
        			ctx.rest(data);
				}
			} else {
        		ctx.rest(data);
			}
		} else {
        	ctx.rest(data);
		}
    }
}
