import assert from 'assert';
import React from 'react';
import { shallow } from 'enzyme';

import DatagridFieldCell from './DatagridFieldCell';

describe('<DatagridFieldCell />', () => {
    const Field = () => <div />;
    Field.defaultProps = {
        type: 'foo',
    };
    it('should render as a roa <DatagridCell /> component', () => {
        const wrapper = shallow(<DatagridFieldCell field={<Field />} />);
        const col = wrapper.find('DatagridCell');
        assert.equal(col.length, 1);
    });
    it('should use regular col style by default', () => {
        const wrapper = shallow(
            <DatagridFieldCell
                field={<Field />}
                defaultStyle={{ color: 'blue' }}
            />
        );
        const col = wrapper.find('DatagridCell');
        assert.deepEqual(col.at(0).prop('style'), { color: 'blue' });
    });
    it('should use field style to override default style', () => {
        const wrapper = shallow(
            <DatagridFieldCell field={<Field style={{ color: 'red' }} />} />
        );
        const col = wrapper.find('DatagridCell');
        assert.deepEqual(col.at(0).prop('style'), { color: 'red' });
    });
});
