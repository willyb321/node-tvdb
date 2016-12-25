'use strict';

let TVDB = require('..');
let API_KEY = process.env.TVDB_KEY;

let chai           = require('chai');
let chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
let expect = chai.expect;

describe("#getSeriesByZap2ItId", function () {

    it(`should return a series with zap2it id 'EP00018693'`, () => {
        const tvdb = new TVDB(API_KEY)

        return tvdb.getSeriesByZap2ItId('EP00018693').then(function(response) {
            expect(response).to.have.length(1);
            expect(response[0]).to.have.property('id', 71663);
            expect(response[0]).to.have.property('seriesName', 'The Simpsons');
        });
    });

    describe('returns the correct record for other languages', () => {

        it('if given in constructor', () => {
            const tvdb = new TVDB(API_KEY, 'de')

            return tvdb.getSeriesByZap2ItId('EP00018693').then(response => {
                expect(response).to.have.length(1);
                expect(response[0]).to.have.property('id', 71663);
                expect(response[0]).to.have.property('seriesName', 'Die Simpsons');
            });
        });

        it('if given in function call', () => {
            const tvdb = new TVDB(API_KEY, 'en')

            return tvdb.getSeriesByZap2ItId('EP00018693', { lang: 'de' }).then(response => {
                expect(response).to.have.length(1);
                expect(response[0]).to.have.property('id', 71663);
                expect(response[0]).to.have.property('seriesName', 'Die Simpsons');
            });
        });

    });

    it("should return an error for a series search with an invalid id", () => {
        const tvdb = new TVDB(API_KEY);

        return expect(tvdb.getSeriesByZap2ItId('')).to.be.rejected;
    });

});
