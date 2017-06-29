import React from 'react';
import {
  shallow,
  mount
} from 'enzyme';

import ReviewItem from '../ReviewItem';

// function setup() {
//   const props = {
//     handleSubmit: jest.fn(),
//     review: {
//       user: fromJS({
//         username: 'name',
//         userId: '098243kljl',
//         role: 'user',
//       }),
//       contuctList: fromJS([{
//         brockerName: 'brocker1',
//         brockerId: 'brocker1',
//         role: 'brocker'
//       }, ]),
//       activeContuct: 0
//     },
//     isEditMode: false
//   }
//   const renderedComponent = shallow(<ReviewItem {...props}/>);
//   return {
//     props,
//     renderedComponent,
//   }
// }

describe('<ReviewItem />', () => {
  it('should render self', () => {
    expect(1).toBe(1);
  });

  // it('should call inputChanage', () => {
  //   const {
  //     renderedComponent
  //   } = setup();
  //   const input = renderedComponent.find('TextValidator');
  //   input.simulate('change', {
  //     target: {
  //       value: ''
  //     }
  //   });
  //   expect(renderedComponent.state().message.length).toBe(0);
  //   input.simulate('change', {
  //     target: {
  //       value: 'hello'
  //     }
  //   });
  //   expect(renderedComponent.state().message.length).toBe(5);

  // });

  // it('should call handleSubmit', () => {
  //   const {
  //     renderedComponent,
  //     props
  //   } = setup();
  //   const input = renderedComponent.find('TextValidator');
  //   const form = renderedComponent.find('ValidatorForm');
  //   input.simulate('change', {
  //     target: {
  //       value: ''
  //     }
  //   });
  //   form.simulate('submit');
  //   expect(props.handleSubmit.mock.calls.length).toBe(0);
  //   input.simulate('change', {
  //     target: {
  //       value: 'Hello'
  //     }
  //   });
  //   form.simulate('submit');
  //   expect(props.handleSubmit.mock.calls.length).toBe(1);
  // });
});