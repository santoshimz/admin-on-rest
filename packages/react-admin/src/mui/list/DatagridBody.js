import React from 'react';
import PropTypes from 'prop-types';
import shouldUpdate from 'recompose/shouldUpdate';
import { TableBody, TableRow } from 'material-ui/Table';
import DatagridFieldCell from './DatagridFieldCell';
import DatagridSelectCell from './DatagridSelectCell';

const DatagridBody = ({
    resource,
    children,
    ids,
    isLoading,
    data,
    basePath,
    styles,
    rowStyle,
    options,
    rowOptions,
    selectable,
    selection,
    selectMode,
    ...rest
}) => (
    <TableBody className="datagrid-body" {...rest} {...options}>
        {ids.map((id, rowIndex) => (
            <TableRow
                style={rowStyle ? rowStyle(data[id], rowIndex) : styles.tr}
                key={id}
                {...rowOptions}
            >
                {selectable && (
                    <DatagridSelectCell
                        key={`${id}-select`}
                        record={data[id]}
                        selection={selection}
                        selectMode={selectMode}
                        resource={resource}
                        defaultStyle={styles.cell['td:first-child']}
                    />
                )}
                {React.Children.map(
                    children,
                    (field, index) =>
                        field ? (
                            <DatagridFieldCell
                                key={`${id}-${field.props.source || index}`}
                                className={`column-${field.props.source}`}
                                record={data[id]}
                                defaultStyle={
                                    index === 0 && !selectable
                                        ? styles.cell['td:first-child']
                                        : styles.cell.td
                                }
                                field={field}
                                basePath={basePath}
                                resource={resource}
                            />
                        ) : null
                )}
            </TableRow>
        ))}
    </TableBody>
);

DatagridBody.propTypes = {
    ids: PropTypes.arrayOf(PropTypes.any).isRequired,
    isLoading: PropTypes.bool,
    resource: PropTypes.string,
    data: PropTypes.object.isRequired,
    basePath: PropTypes.string,
    options: PropTypes.object,
    rowOptions: PropTypes.object,
    styles: PropTypes.object,
    rowStyle: PropTypes.func,
    selectable: PropTypes.bool,
    selection: PropTypes.array,
    selectMode: PropTypes.oneOf(['single', 'page', 'bulk']),
};

DatagridBody.defaultProps = {
    data: {},
    ids: [],
    selectMode: 'bulk',
};

const PureDatagridBody = shouldUpdate(
    (props, nextProps) => nextProps.isLoading === false
)(DatagridBody);

// trick material-ui Table into thinking this is one of the child type it supports
PureDatagridBody.muiName = 'TableBody';

export default PureDatagridBody;
