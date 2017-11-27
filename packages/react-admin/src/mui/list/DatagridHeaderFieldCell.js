import React from 'react';
import PropTypes from 'prop-types';
import defaultsDeep from 'lodash.defaultsdeep';
import shouldUpdate from 'recompose/shouldUpdate';
import compose from 'recompose/compose';

import FieldTitle from '../../util/FieldTitle';
import DatagridHeaderSortableCell from './DatagridHeaderSortableCell';
import DatagridHeaderUnsortableCell from './DatagridHeaderUnsortableCell';

export const DatagridHeaderFieldCell = ({
    field,
    defaultStyle,
    currentSort,
    updateSort,
    resource,
    isSorting,
}) => {
    const style = defaultsDeep(
        {},
        field.props.headerStyle,
        field.type.defaultProps ? field.type.defaultProps.headerStyle : {},
        defaultStyle
    );

    if (field.props.sortable !== false && field.props.source) {
        return (
            <DatagridHeaderSortableCell
                field={field}
                style={style}
                isSorting={isSorting}
                currentSort={currentSort}
                updateSort={updateSort}
            >
                <FieldTitle
                    label={field.props.label}
                    source={field.props.source}
                    resource={resource}
                />
            </DatagridHeaderSortableCell>
        );
    } else {
        return (
            <DatagridHeaderUnsortableCell style={style}>
                <FieldTitle
                    label={field.props.label}
                    source={field.props.source}
                    resource={resource}
                />
            </DatagridHeaderUnsortableCell>
        );
    }
};

DatagridHeaderFieldCell.propTypes = {
    field: PropTypes.element,
    defaultStyle: PropTypes.shape({
        th: PropTypes.object,
        'th:first-child': PropTypes.object,
        sortButton: PropTypes.object,
        nonSortableLabel: PropTypes.object,
    }),
    currentSort: PropTypes.shape({
        sort: PropTypes.string,
        order: PropTypes.string,
    }),
    isSorting: PropTypes.bool,
    sortable: PropTypes.bool,
    resource: PropTypes.string,
    updateSort: PropTypes.func,
};

const enhance = compose(
    shouldUpdate(
        (props, nextProps) =>
            props.isSorting !== nextProps.isSorting ||
            (nextProps.isSorting &&
                props.currentSort.order !== nextProps.currentSort.order)
    )
);

export default enhance(DatagridHeaderFieldCell);
