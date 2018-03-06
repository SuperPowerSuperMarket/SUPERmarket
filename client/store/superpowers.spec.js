import { expect } from 'chai';
import { createStore } from 'redux';

// You will write these functions
import { getSuperpowers, editSuperpower, deleteSuperpower } from '../src/store/action-creators';
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
        dummySuperpower
      });
    });
  });

  describe('editSuperpower', () => {

    it('returns properly formatted action', () => {

      expect(editSuperpower(dummySuperpower)).to.be.deep.equal({
        type: 'EDIT_SUPERPOWER',
        dummySuperpower
      });

    });

  });

}); // end Action creators

describe('Reducer', () => {

  it('returns the initial state by default', () => {

    // In addition to dogs and cats, we need two more fields
    expect(store.getState().petToPreview).to.be.an('object');
    expect(store.getState().petToAdopt).to.be.an('object');
  });

  describe('reduces on PREVIEW_PET action', () => {

    it('sets the action\'s pet as the petToPreview on state (without mutating the previous state)', () => {

      const prevState = store.getState();

      const pet = getRandomPet(DOGS);
      const action = { type: 'PREVIEW_PET', pet: pet };
      store.dispatch(action);

      const newState = store.getState();

      // ensures the state is updated properly - deep equality compares the values of two objects' key-value pairs
      expect(store.getState().petToPreview).to.be.deep.equal(pet);
      // ensures we didn't mutate anything - regular equality compares the location of the object in memory
      expect(newState.petToPreview).to.not.be.equal(prevState.petToPreview);

    });

  });

  describe('reduces on ADOPT_PET action', () => {

    it('sets the action\'s pet as the petToAdopt on state (without mutating the previous state)', () => {

      const prevState = store.getState();

      const pet = getRandomPet(DOGS);
      const action = { type: 'ADOPT_PET', pet: pet };
      store.dispatch(action);

      const newState = store.getState();

      expect(newState.petToAdopt).to.be.deep.equal(pet);
      expect(newState.petToAdopt).to.not.be.equal(prevState.petToAdopt);

    });

  });

  describe('reduces on ADD_NEW_DOG action', () => {

    it('adds the new dog to the dogs array (without mutating the previous state)', () => {

      const prevState = store.getState();

      const pet = getRandomPet(DOGS);
      const action = { type: 'ADD_NEW_DOG', dog: pet };
      store.dispatch(action);

      const newState = store.getState();

      expect(newState.dogs.length).to.be.equal(prevState.dogs.length + 1);
      expect(newState.dogs[newState.dogs.length - 1]).to.be.deep.equal(pet);
      expect(newState.dogs).to.not.be.equal(prevState.dogs);

    });

  });

  describe('reduces on ADD_NEW_CAT action', () => {

    it('adds the new cat to the cats array (without mutating the previous state)', () => {

      const prevState = store.getState();

      const pet = getRandomPet(CATS);
      const action = { type: 'ADD_NEW_CAT', cat: pet };
      store.dispatch(action);

      const newState = store.getState();

      expect(newState.cats.length).to.be.equal(prevState.cats.length + 1);
      expect(newState.cats[newState.cats.length - 1]).to.be.deep.equal(pet);
      expect(newState.cats).to.not.be.equal(prevState.cats);

    });

  });

  describe('handles unrecognized actions', () => {

    it('returns the previous state', () => {

      const prevState = store.getState();

      const action = { type: 'NOT_A_THING' };
      store.dispatch(action);

      const newState = store.getState();

      // these should be the same object in memory AND have equivalent key-value pairs
      expect(prevState).to.be.an('object');
      expect(newState).to.be.an('object');
      expect(newState).to.be.equal(prevState);
      expect(newState).to.be.deep.equal(prevState);
    });

  });

}); // end Reducer
