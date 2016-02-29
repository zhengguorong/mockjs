var request = require('supertest');

describe('Get /Index', function() {
	it('should return a list',function(done){
		request('http://localhost:3000')
		.get('/')
		.expect(200);
	})
});