import React from 'react';
import PropTypes from 'prop-types';

import SelectItem from './SelectItem';

const SimpleListSelectItem = ({ record, resource, selection, selectMode }) => {
    const checked = selection.indexOf(record.id) !== -1;
    return (
        <SelectItem
            resource={resource}
            selectMode={selectMode}
            toggleIds={record.id}
            checked={checked}
        />
    );
};

SimpleListSelectItem.propTypes = {
    record: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    resource: PropTypes.string,
    selection: PropTypes.array,
    selectMode: PropTypes.oneOf(['single', 'page', 'bulk']).isRequired,
};

export default SimpleListSelectItem;
