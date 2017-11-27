import assert from 'assert';
import React from 'react';
import { shallow } from 'enzyme';

import { DatagridHeaderFieldCell } from './DatagridHeaderFieldCell';

describe('<DatagridHeaderFieldCell />', () => {
    describe('sorting on a column', () => {
        const Field = () => <div />;
        Field.defaultProps = {
            type: 'foo',
            updateSort: () => true,
        };

        it('should be enabled when field has a source', () => {
            const wrapper = shallow(
                <DatagridHeaderFieldCell
                    currentSort={{}}
                    field={<Field source="title" />}
                    updateSort={() => true}
                />
            );
            assert.equal(
                wrapper.find(
                    'shouldUpdate(withStyles(DatagridHeaderSortableCell))'
                ).length,
                1
            );
        });

        it('should be disabled when field has no source', () => {
            const wrapper = shallow(
                <DatagridHeaderFieldCell
                    currentSort={{}}
                    field={<Field />}
                    updateSort={() => true}
                />
            );
            assert.equal(
                wrapper.find('withStyles(DatagridHeaderUnsortableCell)').length,
                1
            );
        });

        it('should be disabled when sortable prop is explicitly set to false', () => {
            const wrapper = shallow(
                <DatagridHeaderFieldCell
                    currentSort={{}}
                    field={<Field source="title" sortable={false} />}
                    updateSort={() => true}
                />
            );

            assert.equal(
                wrapper.find('withStyles(DatagridHeaderUnsortableCell)').length,
                1
            );
        });
    });
});
