import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import List, {
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
} from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import linkToRecord from '../../util/linkToRecord';
import SimpleListSelectItem from './SimpleListSelectItem';

const tertiaryStyle = { float: 'right', opacity: 0.541176 };
const styles = {
    link: {
        textDecoration: 'none',
        color: 'inherit',
    },
};
const LinkOrNot = withStyles(styles)(
    ({ classes, linkType, basePath, id, children }) =>
        linkType === 'edit' || linkType === true ? (
            <Link to={linkToRecord(basePath, id)} className={classes.link}>
                {children}
            </Link>
        ) : linkType === 'show' ? (
            <Link
                to={`${linkToRecord(basePath, id)}/show`}
                className={classes.link}
            >
                {children}
            </Link>
        ) : (
            <span>{children}</span>
        )
);

class SimpleList extends React.Component {
    state = { selecting: false };
    activateSelecting = selecting => {
        this.setState({
            selecting,
        });
    };
    render() {
        const {
            ids,
            data,
            basePath,
            primaryText,
            secondaryText,
            resource,
            selectable,
            selectItemLocation,
            selectMode,
            selection,
            tertiaryText,
            leftAvatar,
            leftIcon,
            rightAvatar,
            rightIcon,
            linkType,
        } = this.props;
        return (
            <List>
                {ids.map(id => (
                    <LinkOrNot
                        linkType={linkType}
                        basePath={basePath}
                        id={id}
                        key={id}
                    >
                        <ListItem button>
                            {leftIcon && (
                                <ListItemIcon>
                                    {leftIcon(data[id], id)}
                                </ListItemIcon>
                            )}
                            {leftAvatar && (
                                <ListItemAvatar>
                                    <Avatar>{leftAvatar(data[id], id)}</Avatar>
                                </ListItemAvatar>
                            )}
                            {selectable &&
                                selectItemLocation === 'primary' && (
                                    <SimpleListSelectItem
                                        selectMode={selectMode}
                                        selection={selection}
                                        record={data[id]}
                                        resource={resource}
                                    />
                                )}
                            <ListItemText
                                primary={
                                    <div>
                                        {primaryText(data[id], id)}
                                        {tertiaryText && (
                                            <span style={tertiaryStyle}>
                                                {tertiaryText(data[id], id)}
                                            </span>
                                        )}
                                    </div>
                                }
                                secondary={
                                    secondaryText && secondaryText(data[id], id)
                                }
                            />
                            {(rightAvatar || rightIcon) && (
                                <ListItemSecondaryAction>
                                    {rightAvatar && (
                                        <Avatar>
                                            {rightAvatar(data[id], id)}
                                        </Avatar>
                                    )}
                                    {rightIcon && (
                                        <ListItemIcon>
                                            {rightIcon(data[id], id)}
                                        </ListItemIcon>
                                    )}
                                    {selectable &&
                                        selectItemLocation === 'secondary' && (
                                            <SimpleListSelectItem
                                                selectMode={selectMode}
                                                selection={selection}
                                                record={data[id]}
                                                resource={resource}
                                            />
                                        )}
                                </ListItemSecondaryAction>
                            )}
                        </ListItem>
                    </LinkOrNot>
                ))}
            </List>
        );
    }
}

SimpleList.propTypes = {
    ids: PropTypes.array,
    data: PropTypes.object,
    resource: PropTypes.string,
    selectable: PropTypes.bool,
    selection: PropTypes.array,
    selectItemLocation: PropTypes.oneOf(['primary', 'secondary']),
    selectMode: PropTypes.oneOf(['single', 'page', 'bulk']),
    basePath: PropTypes.string,
    primaryText: PropTypes.func,
    secondaryText: PropTypes.func,
    tertiaryText: PropTypes.func,
    leftAvatar: PropTypes.func,
    leftIcon: PropTypes.func,
    rightAvatar: PropTypes.func,
    rightIcon: PropTypes.func,
    linkType: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
        .isRequired,
};

SimpleList.defaultProps = {
    linkType: 'edit',
    selectItemLocation: 'primary',
};

export default SimpleList;
