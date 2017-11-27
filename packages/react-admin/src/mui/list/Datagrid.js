import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'material-ui/styles';
import Table, { TableHead, TableRow } from 'material-ui/Table';
import DatagridBody from './DatagridBody';
import DatagridHeaderSelectCell from './DatagridHeaderSelectCell';
import DatagridHeaderFieldCell from './DatagridHeaderFieldCell';

const defaultStyles = {
    table: {
        tableLayout: 'auto',
    },
    tbody: {
        height: 'inherit',
    },
    header: {
        th: {
            padding: 0,
        },
        'th:first-child': {
            padding: '0 0 0 12px',
        },
        select: {
            padding: 0,
        },
    },
    cell: {
        td: {
            padding: '0 12px',
            whiteSpace: 'normal',
        },
        'td:first-child': {
            padding: '0 12px 0 16px',
            whiteSpace: 'normal',
        },
    },
};

/**
 * The Datagrid component renders a list of records as a table.
 * It is usually used as a child of the <List> and <ReferenceManyField> components.
 *
 * Props:
 *  - styles
 *  - rowStyle
 *  - options (passed as props to <Table>)
 *  - headerOptions (passed as props to mui <TableHead>)
 *  - bodyOptions (passed as props to mui <TableBody>)
 *  - rowOptions (passed as props to mui <TableRow>)
 *
 * @example Display all posts as a datagrid
 * const postRowStyle = (record, index) => ({
 *     backgroundColor: record.nb_views >= 500 ? '#efe' : 'white',
 * });
 * export const PostList = (props) => (
 *     <List {...props}>
 *         <Datagrid rowStyle={postRowStyle}>
 *             <TextField source="id" />
 *             <TextField source="title" />
 *             <TextField source="body" />
 *             <EditButton />
 *         </Datagrid>
 *     </List>
 * );
 *
 * @example Display all the comments of the current post as a datagrid
 * <ReferenceManyField reference="comments" target="post_id">
 *     <Datagrid>
 *         <TextField source="id" />
 *         <TextField source="body" />
 *         <DateField source="created_at" />
 *         <EditButton />
 *     </Datagrid>
 * </ReferenceManyField>
 */
class Datagrid extends Component {
    updateSort = event => {
        event.stopPropagation();
        this.props.setSort(event.currentTarget.dataset.sort);
    };

    render() {
        const {
            resource,
            children,
            selectable,
            selectMode = 'bulk',
            ids,
            selection,
            isLoading,
            data,
            currentSort,
            basePath,
            styles = defaultStyles,
            theme,
            rowStyle,
            options,
            headerOptions,
            bodyOptions,
            rowOptions,
        } = this.props;
        return (
            <Table
                style={options && options.fixedHeader ? null : styles.table}
                {...options}
            >
                <TableHead {...headerOptions}>
                    <TableRow style={theme.tableRow}>
                        {selectable && (
                            <DatagridHeaderSelectCell
                                ids={ids}
                                selection={selection}
                                selectMode={selectMode}
                                defaultStyle={styles.header.select}
                                resource={resource}
                            />
                        )}
                        {React.Children.map(
                            children,
                            (field, index) =>
                                field ? (
                                    <DatagridHeaderFieldCell
                                        key={field.props.source || index}
                                        field={field}
                                        defaultStyle={
                                            index === 0 && !selectable
                                                ? styles.header[
                                                      'th:first-child'
                                                  ]
                                                : styles.header.th
                                        }
                                        currentSort={currentSort}
                                        isSorting={
                                            field.props.source ===
                                            currentSort.field
                                        }
                                        updateSort={this.updateSort}
                                        resource={resource}
                                    />
                                ) : null
                        )}
                    </TableRow>
                </TableHead>
                <DatagridBody
                    resource={resource}
                    ids={ids}
                    data={data}
                    basePath={basePath}
                    styles={styles}
                    rowStyle={rowStyle}
                    isLoading={isLoading}
                    options={bodyOptions}
                    rowOptions={rowOptions}
                    selectable={selectable}
                    selection={selection}
                    selectMode={selectMode}
                >
                    {children}
                </DatagridBody>
            </Table>
        );
    }
}
Datagrid.propTypes = {
    basePath: PropTypes.string,
    bodyOptions: PropTypes.object,
    currentSort: PropTypes.shape({
        sort: PropTypes.string,
        order: PropTypes.string,
    }),
    selectable: PropTypes.bool,
    selectMode: PropTypes.oneOf(['single', 'page', 'bulk']),
    selectAction: PropTypes.shape({
        type: PropTypes.oneOf(['delete', 'custom']),
        label: PropTypes.string,
    }),
    data: PropTypes.object.isRequired,
    headerOptions: PropTypes.object,
    ids: PropTypes.arrayOf(PropTypes.any).isRequired,
    selection: PropTypes.arrayOf(PropTypes.any).isRequired,
    isLoading: PropTypes.bool,
    theme: PropTypes.object,
    options: PropTypes.object,
    resource: PropTypes.string,
    rowOptions: PropTypes.object,
    rowStyle: PropTypes.func,
    setSort: PropTypes.func,
    styles: PropTypes.object,
};

Datagrid.defaultProps = {
    data: {},
    ids: [],
    selection: [],
};

export default withTheme()(Datagrid);
