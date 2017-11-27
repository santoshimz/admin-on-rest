import React from 'react';
import PropTypes from 'prop-types';
import { TableCell } from 'material-ui/Table';

const DatagridCell = ({ className, children, style, ...rest }) => {
    return (
        <TableCell className={className} style={style} {...rest}>
            {children}
        </TableCell>
    );
};

DatagridCell.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
};

export default DatagridCell;
