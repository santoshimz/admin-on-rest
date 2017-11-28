import React from 'react';
import PropTypes from 'prop-types';
import { CardActions } from 'material-ui/Card';
import { CreateButton, RefreshButton } from '../button';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import SelectActionButton from './SelectActionButton';
import SelectActionMenuItem from './SelectActionMenuItem';

const cardActionStyle = {
    zIndex: 2,
    display: 'flex',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
};

const DefaultSelectActionButton = props => (
    <SelectActionButton {...props}>
        <SelectActionMenuItem action="delete" label="ra.action.delete" />
    </SelectActionButton>
);

const Actions = ({
    resource,
    filters,
    displayedFilters,
    filterValues,
    hasCreate,
    selectable,
    selection,
    selectMode,
    selectActionButton = <DefaultSelectActionButton />,
    basePath,
    showFilter,
}) => {
    return (
        <CardActions style={cardActionStyle}>
            {filters &&
                React.cloneElement(filters, {
                    resource,
                    showFilter,
                    displayedFilters,
                    filterValues,
                    context: 'button',
                })}
            {selectable &&
                React.cloneElement(selectActionButton, {
                    resource,
                    selection,
                    selectMode,
                })}
            {hasCreate && <CreateButton basePath={basePath} />}
            <RefreshButton />
        </CardActions>
    );
};

Actions.propTypes = {
    basePath: PropTypes.string,
    displayedFilters: PropTypes.object,
    filters: PropTypes.element,
    filterValues: PropTypes.object,
    hasCreate: PropTypes.bool,
    selectable: PropTypes.bool,
    selection: PropTypes.array,
    selectMode: PropTypes.oneOf(['single', 'page', 'bulk']),
    selectActionButton: PropTypes.node,
    resource: PropTypes.string,
    showFilter: PropTypes.func,
    theme: PropTypes.object,
};

export default onlyUpdateForKeys([
    'resource',
    'filters',
    'displayedFilters',
    'filterValues',
])(Actions);
