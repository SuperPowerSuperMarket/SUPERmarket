// /* global describe beforeEach it */

// import {expect} from 'chai'
// import React from 'react'
// import enzyme, {shallow} from 'enzyme'
// import Adapter from 'enzyme-adapter-react-16'

// import {UserHome} from './user-home'
// import DreamList from './dreams'

// const adapter = new Adapter()
// enzyme.configure({adapter})

// describe('UserHome', () => {
//   let userHome
//   let didLogOut = false

//   beforeEach(() => {
//     userHome = shallow(<UserHome
//       email={'cody@email.com'}
//       logout={() => didLogOut = true}
//       />)
//   })

//   it('renders the email in an h3', () => {
//     expect(userHome.find('h3').text()).to.be.equal('Welcome, cody@email.com')
//   })

//   it("renders a list of the user's dreams", () => {
//     expect(userHome.find(DreamList)).to.have.length(1)
//   })

//   it('Logs out when you click the link', () => {
//     expect(didLogOut).to.eql(false)
//     userHome.find('a').simulate('click')
//     expect(didLogOut).to.eql(true)
//   })

//   it("attaches the user's dreams to the list", () => {
//     const list = userHome.find(DreamList)
//     const dreams = list.props().dreams
//     expect(dreams).to.eql([
//       'Naked at school again',
//       "I can't drive my car"
//     ])
//   })


// })
