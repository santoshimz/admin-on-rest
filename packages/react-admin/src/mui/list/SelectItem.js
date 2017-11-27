import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';

import { changeListSelection } from '../../actions/listActions';

const SelectItem = ({ toggle, resource, selectMode, toggleIds, checked }) => {
    const toggleHandler = (e, checked) =>
        toggle(resource, {
            id: toggleIds,
            selectMode,
            selected: checked,
        });
    return (
        <Checkbox color="primary" onChange={toggleHandler} checked={checked} />
    );
};

SelectItem.propTypes = {
    toggle: PropTypes.func.isRequired,
    toggleIds: PropTypes.any.isRequired,
    resource: PropTypes.string,
    checked: PropTypes.bool.isRequired,
    selectMode: PropTypes.oneOf(['single', 'page', 'bulk']).isRequired,
};

const enhance = compose(
    connect(null, {
        toggle: changeListSelection,
    })
);

export default enhance(SelectItem);
