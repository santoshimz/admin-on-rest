import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import shouldUpdate from 'recompose/shouldUpdate';
import compose from 'recompose/compose';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import ContentSort from 'material-ui-icons/Sort';

import DatagridHeaderCell from './DatagridHeaderCell';

const styles = {
    sortButton: {
        minWidth: 40,
    },
    sortIcon: {
        transition: 'transform .25s cubic-bezier(0.0, 0, 0.2, 1)',
        marginLeft: '0.5em',
    },
    sortIconReversed: {
        transform: 'rotate(180deg)',
    },
};

export const DatagridHeaderSortableCell = ({
    classes = {}, // From withStyle
    field,
    style,
    children,
    currentSort,
    updateSort,
}) => {
    return (
        <DatagridHeaderCell style={style}>
            <Button
                onClick={updateSort}
                data-sort={field.props.source}
                className={classes.sortButton}
            >
                {children}

                {field.props.source === currentSort.field && (
                    <ContentSort
                        className={classNames(
                            classes.sortIcon,
                            currentSort.order === 'ASC'
                                ? classes.sortIconReversed
                                : ''
                        )}
                    />
                )}
            </Button>
        </DatagridHeaderCell>
    );
};

DatagridHeaderSortableCell.propTypes = {
    classes: PropTypes.object,
    field: PropTypes.element,
    style: PropTypes.shape({
        th: PropTypes.object,
        'th:first-child': PropTypes.object,
        sortButton: PropTypes.object,
    }),
    currentSort: PropTypes.shape({
        sort: PropTypes.string,
        order: PropTypes.string,
    }),
    isSorting: PropTypes.bool,
    resource: PropTypes.string,
    updateSort: PropTypes.func.isRequired,
};

const enhance = compose(
    shouldUpdate(
        (props, nextProps) =>
            props.isSorting !== nextProps.isSorting ||
            (nextProps.isSorting &&
                props.currentSort.order !== nextProps.currentSort.order)
    ),
    withStyles(styles)
);

export default enhance(DatagridHeaderSortableCell);
