import React from 'react';
import PropTypes from 'prop-types';
import { TableCell } from 'material-ui/Table';

export const DatagridHeaderCell = ({ style, children }) => {
    return <TableCell style={style}>{children}</TableCell>;
};

DatagridHeaderCell.propTypes = {
    style: PropTypes.shape({
        th: PropTypes.object,
        'th:first-child': PropTypes.object,
    }),
};
export default DatagridHeaderCell;
