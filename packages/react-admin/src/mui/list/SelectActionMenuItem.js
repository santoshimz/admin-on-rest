import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from 'material-ui/Menu';

class SelectActionMenuItem extends React.Component {
    handleClick = () => {
        const { executeAction, action, actionOptions } = this.props;

        executeAction(
            action,
            actionOptions && typeof actionOptions === 'function'
                ? actionOptions()
                : actionOptions
        );
    };

    render() {
        return (
            <MenuItem onClick={this.handleClick}>
                {this.props.translate(this.props.label)}
            </MenuItem>
        );
    }
}

SelectActionMenuItem.propTypes = {
    resource: PropTypes.string,
    selection: PropTypes.array,
    action: PropTypes.string.isRequired,
    actionOptions: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    executeAction: PropTypes.func,
    label: PropTypes.string.isRequired,
    translate: PropTypes.func,
};

export default SelectActionMenuItem;
