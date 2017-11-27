import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles } from 'material-ui/styles';

import DatagridHeaderCell from './DatagridHeaderCell';

const styles = {
    nonSortableLabel: {
        position: 'relative',
        paddingLeft: 16,
        paddingRight: 16,
        verticalAlign: 'middle',
        letterSpacing: 0,
        textTransform: 'uppercase',
        fontWeight: 500,
        fontSize: 14,
    },
};

export const DatagridHeaderUnsortableCell = ({
    classes = {}, // From withStyle
    style,
    children,
}) => {
    return (
        <DatagridHeaderCell style={style}>
            <span className={classes.nonSortableLabel}>{children}</span>
        </DatagridHeaderCell>
    );
};

DatagridHeaderUnsortableCell.propTypes = {
    classes: PropTypes.object,
    style: PropTypes.shape({
        th: PropTypes.object,
        'th:first-child': PropTypes.object,
        nonSortableLabel: PropTypes.object,
    }),
};

const enhance = compose(withStyles(styles));

export default enhance(DatagridHeaderUnsortableCell);
