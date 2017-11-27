import React from 'react';
import PropTypes from 'prop-types';
import defaultsDeep from 'lodash.defaultsdeep';
import DatagridCell from './DatagridCell';

const DatagridFieldCell = ({
    className,
    field,
    record,
    basePath,
    resource,
    style,
    defaultStyle,
    ...rest
}) => {
    const computedStyle = defaultsDeep(
        {},
        style,
        field.props.style,
        field.type.defaultProps ? field.type.defaultProps.style : {},
        defaultStyle
    );
    return (
        <DatagridCell className={className} style={computedStyle} {...rest}>
            {React.cloneElement(field, { record, basePath, resource })}
        </DatagridCell>
    );
};

DatagridFieldCell.propTypes = {
    className: PropTypes.string,
    field: PropTypes.element,
    record: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    basePath: PropTypes.string,
    resource: PropTypes.string,
    style: PropTypes.object,
    defaultStyle: PropTypes.shape({
        td: PropTypes.object,
        'td:first-child': PropTypes.object,
    }),
};

export default DatagridFieldCell;
