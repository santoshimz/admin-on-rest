import React from 'react';
import PropTypes from 'prop-types';
import defaultsDeep from 'lodash.defaultsdeep';
import shouldUpdate from 'recompose/shouldUpdate';
import compose from 'recompose/compose';
import DatagridHeaderUnsortableCell from './DatagridHeaderUnsortableCell';
import SelectItem from './SelectItem';

export const DatagridHeaderSelectCell = ({
    defaultStyle,
    ids,
    selection,
    selectMode,
    resource,
}) => {
    const style = defaultsDeep({}, defaultStyle);
    const checked =
        ids.length > 0 && !ids.find(id => selection.indexOf(id) === -1);
    return (
        <DatagridHeaderUnsortableCell style={style}>
            {selectMode !== 'single' ? (
                <SelectItem
                    resource={resource}
                    checked={checked}
                    toggleIds={ids}
                    selectMode={selectMode}
                />
            ) : null}
        </DatagridHeaderUnsortableCell>
    );
};

DatagridHeaderSelectCell.propTypes = {
    defaultStyle: PropTypes.shape({
        th: PropTypes.object,
        'th:first-child': PropTypes.object,
        nonSortableLabel: PropTypes.object,
    }),
    ids: PropTypes.array,
    selection: PropTypes.array,
    selectMode: PropTypes.oneOf(['single', 'page', 'bulk']),
    resource: PropTypes.string,
};

const enhance = compose(
    shouldUpdate(
        (props, nextProps) =>
            (props.selection && props.selection !== nextProps.selection) ||
            (props.ids && props.ids !== nextProps.ids)
    )
);
export default enhance(DatagridHeaderSelectCell);
