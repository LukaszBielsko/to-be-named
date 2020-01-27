import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import ItemComponent from '../components/Item';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const fakeItem = {
  _id: 'abc',
  title: 'product',
  place: 'china',
  description: 'great product',
  largeImage: 'large.jpg',
};

describe('<Item />', () => {
  it('renders and matches the snapshot', () => {
    const wrapper = shallow(<ItemComponent {...fakeItem} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  // let wrapper;
  // beforeEach(() => {
  //   wrapper = shallow(<ItemComponent {...fakeItem} />);
  // });
  // it('renders component properly', () => {
  //   expect(wrapper.length).toBe(1);
  // });
  // it('displays proper place', () => {
  //   const place = wrapper.find('.item-place');
  //   expect(place.text()).toBe('china');
  // });
  // it('displays proper description', () => {
  //   const description = wrapper.find('.item-description');
  //   expect(description.text()).toBe('great product');
  // });
  // it('proper img src is passed', () => {
  //   const img = wrapper.find('img');
  //   expect(img.prop('src')).toEqual('large.jpg');
  // });
  // it('proper id is passed', () => {
  //   /* TODO check for id */
  // });
});
