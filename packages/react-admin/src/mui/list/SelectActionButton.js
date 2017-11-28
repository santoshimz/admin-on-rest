import React from 'react';
import PropTypes from 'prop-types';
import shouldUpdate from 'recompose/shouldUpdate';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import Badge from 'material-ui/Badge';
import Popover from 'material-ui/Popover';
import { MenuList } from 'material-ui/Menu';
import LaunchIcon from 'material-ui-icons/Launch';
import { withStyles } from 'material-ui/styles';
import translate from '../../i18n/translate';
import { executeListAction } from '../../actions/listActions';

const styles = theme => ({
    badge: {
        margin: `0 ${theme.spacing.unit * 2}px`,
    },
});

class SelectActionButton extends React.Component {
    state = {
        anchorEl: null,
        open: false,
    };

    handleClick = event => {
        this.setState({ open: true, anchorEl: event.currentTarget });
    };

    handleRequestClose = () => {
        this.setState({ open: false });
    };

    handleAction = (action, actionOptions) => {
        this.props.executeListAction(
            this.props.resource,
            action,
            actionOptions,
            this.props.selection
        );
        this.handleRequestClose();
    };

    render() {
        const {
            classes = {},
            label = 'ra.action.bulk_action',
            translate,
            resource,
            selection,
            selectionMode,
            children,
        } = this.props;
        return (
            <div>
                {selection &&
                selection.length > 1 &&
                selectionMode !== 'single' ? (
                    <Badge
                        className={classes.badge}
                        badgeContent={selection.length}
                        color="accent"
                    >
                        <Button color="primary" onClick={this.handleClick}>
                            <LaunchIcon />
                            &nbsp;
                            {label && translate(label)}
                        </Button>
                    </Badge>
                ) : (
                    <Button
                        color="primary"
                        disabled={!selection || selection.length === 0}
                        onClick={this.handleClick}
                    >
                        <LaunchIcon />
                        &nbsp;
                        {label && translate(label)}
                    </Button>
                )}
                <Popover
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    onRequestClose={this.handleRequestClose}
                >
                    <MenuList>
                        {React.Children.map(children, child =>
                            React.cloneElement(child, {
                                translate,
                                resource,
                                selection,
                                executeAction: this.handleAction,
                            })
                        )}
                    </MenuList>
                </Popover>
            </div>
        );
    }
}

SelectActionButton.propTypes = {
    resource: PropTypes.string,
    selection: PropTypes.array,
    executeListAction: PropTypes.func.isRequired,
    classes: PropTypes.object,
    label: PropTypes.string,
    translate: PropTypes.func.isRequired,
    selectionMode: PropTypes.oneOf(['single', 'page', 'bulk']),
};

const enhance = compose(
    shouldUpdate((props, nextProps) => props.selection !== nextProps.selection),
    connect(null, {
        executeListAction,
    }),
    withStyles(styles),
    translate
);

export default enhance(SelectActionButton);
