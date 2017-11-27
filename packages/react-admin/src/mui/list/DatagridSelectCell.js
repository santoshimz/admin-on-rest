import React from 'react';
import PropTypes from 'prop-types';
import defaultsDeep from 'lodash.defaultsdeep';
import DatagridCell from './DatagridCell';

import SelectItem from './SelectItem';

const DataGridSelectCell = ({
    record,
    resource,
    selection,
    selectMode,
    style,
    defaultStyle,
    ...rest
}) => {
    const computedStyle = defaultsDeep({}, style, defaultStyle);
    const checked = selection.indexOf(record.id) !== -1;
    return (
        <DatagridCell className="column-select" style={computedStyle} {...rest}>
            <SelectItem
                resource={resource}
                selectMode={selectMode}
                toggleIds={record.id}
                checked={checked}
            />
        </DatagridCell>
    );
};

DataGridSelectCell.propTypes = {
    record: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    resource: PropTypes.string,
    style: PropTypes.object,
    defaultStyle: PropTypes.shape({
        td: PropTypes.object,
        'td:first-child': PropTypes.object,
    }),
    selection: PropTypes.array,
    selectMode: PropTypes.oneOf(['single', 'page', 'bulk']).isRequired,
};

export default DataGridSelectCell;
