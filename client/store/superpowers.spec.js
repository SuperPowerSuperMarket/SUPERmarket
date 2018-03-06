import { expect } from 'chai';
import { createStore } from 'redux';

// You will write these functions
import { getSuperpowers, editSuperpower, deleteSuperpower } from './superpowers';
import store from './index';

const dummySuperpower =
{
  name: 'Cat-like Reflexes',
  price: 750,
  description: 'Like the eye of the tiger',
  imageUrl:
    'http://www.survivorband.com/wp-content/uploads/2016/04/final_11.-Best-of.jpg',
  stock: 100,
  tags: ['animal', 'speed']
}

describe('Action creators', () => {

  describe('getSuperpowers', () => {

    it('returns properly formatted action', () => {

      expect(getSuperpowers(dummySuperpower)).to.be.deep.equal({
        type: 'GET_SUPERPOWERS',
        superpowers: dummySuperpower
      });
    });
  });

})
