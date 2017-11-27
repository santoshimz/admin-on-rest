import assert from 'assert';
import React from 'react';
import { shallow } from 'enzyme';

import { DatagridHeaderCell } from './DatagridHeaderCell';

describe('<DatagridHeaderCell />', () => {
    it('should render as a mui <TableCell /> component', () => {
        const wrapper = shallow(<DatagridHeaderCell />);
        const col = wrapper.find('withStyles(TableCell)');
        assert.equal(col.length, 1);
    });
    it('should use regular col style by default', () => {
        const wrapper = shallow(
            <DatagridHeaderCell style={{ color: 'blue' }} />
        );
        const col = wrapper.find('withStyles(TableCell)');
        assert.deepEqual(col.at(0).prop('style'), { color: 'blue' });
    });
});
