import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize } from '@material-ui/core/styles/colorManipulator';

let disabledOptions = [];


const styles = theme => ({
    // root: {
    //     flexGrow: 1,
    //     height: 250,
    // },
    input: {
        display: 'flex',
        padding: 0,
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden',
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    chipFocused: {
        backgroundColor: emphasize(
            theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
            0.08,
        ),
    },
    noOptionsMessage: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    singleValue: {
        fontSize: 16,
    },
    placeholder: {
        position: 'absolute',
        left: 2,
        fontSize: 16,
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
});

function NoOptionsMessage(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.noOptionsMessage}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function inputComponent({ inputRef, ...props }) {
    return <div ref={inputRef} {...props} />;
}

function Control(props) {
    return (
        <TextField
            fullWidth
            InputProps={{
                inputComponent,
                inputProps: {
                    className: props.selectProps.classes.input,
                    inputRef: props.innerRef,
                    children: props.children,
                    ...props.innerProps,
                },
            }}
            {...props.selectProps.textFieldProps}
        />
    );
}

function Option(props) {
    return (
        <MenuItem
            disabled={disabledOptions.length > 0 ? disabledOptions.find(id => { return ((id === this.props.option.value) ? true : false) }) : false}
            buttonRef={props.innerRef}
            selected={props.isFocused}
            component="div"
            style={{
                fontWeight: props.isSelected ? 500 : 400,
            }}
            {...props.innerProps}
        >
            {props.children}
        </MenuItem>
    );
}

function Placeholder(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.placeholder}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function SingleValue(props) {
    return (
        <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
            {props.children}
        </Typography>
    );
}

function ValueContainer(props) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props) {
    return (
        <Chip
            tabIndex={-1}
            label={props.children}
            className={classNames(props.selectProps.classes.chip, {
                [props.selectProps.classes.chipFocused]: props.isFocused,
            })}
            onDelete={props.removeProps.onClick}
            deleteIcon={<CancelIcon {...props.removeProps} />}
        />
    );
}

function Menu(props) {
    return (
        <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
            {props.children}
        </Paper>
    );
}

const components = {
    Control,
    Menu,
    MultiValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
};

class IntegrationReactSelect extends React.Component {
    state = {
        single: null,
        multi: [],
    };

    handleChange = name => value => {
        this.setState({
            [name]: value,
        }, () => {
            this.props.type === 'single' ? (
                this.props.onChange(value ? value.value : "")
            ) : (
                    this.props.onChange(value ? value.map((vl, i) => vl.value ? vl.value : vl) : [])
                )
        });
    };
    componentDidMount() {
        if (this.props.type === 'single') {
            disabledOptions = this.props.dv ? this.props.dv : [];
            this.setState({
                single: this.props.single
            })
        } else {
            disabledOptions = this.props.dv ? this.props.dv : [];
            this.setState({
                multi: this.props.single
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.single !== this.props.single) {
            if (this.props.type === 'single') {
                this.setState({
                    single: nextProps.single
                })
            }
            else {
                this.setState({
                    multi: nextProps.single
                })
            }
        }
    }

    filterMultiValue = () => {
        var fil = [];

        this.state.multi.forEach(ml => {
            this.props.items.forEach(itm => {
                if (itm.id == ml) {
                    fil.push({
                        value: String(itm.id),
                        label: itm.name
                    })
                }
            })
        })
        return fil;
    }
    render() {
        const { classes, theme } = this.props;

        const selectStyles = {
            input: base => ({
                ...base,
                color: theme.palette.text.primary,
                '& input': {
                    font: 'inherit',
                },
            }),
        };

        return (
            <div className={classes.root}>
                <NoSsr>
                    {this.props.type === 'single' ?
                        <Select
                            classes={classes}
                            styles={selectStyles}
                            textFieldProps={{
                                label: this.props.label,
                                InputLabelProps: {
                                    shrink: true,
                                },
                            }}
                            options={this.props.items ? this.props.items.map(suggestion => ({
                                value: suggestion.id,
                                label: suggestion.name
                            })) : ""}
                            components={components}
                            value={this.state.single ? {
                                value: this.state.single,
                                label: this.props.items && this.props.items.filter((lab) => {
                                    return lab.id == this.state.single
                                }).map(fil => fil.name)
                            } : null}
                            onChange={this.handleChange('single')}
                            placeholder={this.props.placeholder}
                            isClearable
                        /> :
                        <Select
                            classes={classes}
                            styles={selectStyles}
                            textFieldProps={{
                                label: this.props.label,
                                InputLabelProps: {
                                    shrink: true,
                                },
                            }}
                            options={this.props.items ? this.props.items.map(suggestion => ({
                                value: String(suggestion.id),
                                label: suggestion.name
                            })) : []}
                            components={components}
                            value={this.filterMultiValue()}
                            onChange={this.handleChange('multi')}
                            placeholder={this.props.placeholder}
                            isMulti
                        />
                    }
                </NoSsr>
            </div>
        );
    }
}

IntegrationReactSelect.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(IntegrationReactSelect);
