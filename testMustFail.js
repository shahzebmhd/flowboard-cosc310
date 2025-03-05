import {describe, it} from '@jest/globals';

describe('this test must fail', () => {
    it('this test must fail', async () => {
        expect(2).toEqual(3);
    })
});

