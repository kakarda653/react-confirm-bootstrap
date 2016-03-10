var React = require('react');
import { Button } from 'react-bootstrap';
var Modal = require('Modal').Modal;
var ModalHeader = require('Modal').ModalHeader;
var ModalContent = require('Modal').ModalContent;
var ModalFooter = require('Modal').ModalFooter;


var Confirm = React.createClass({
    contextTypes: {
        theme: React.PropTypes.object.isRequired,
    },

    propTypes: {
        bsStyle: React.PropTypes.string,
        buttonText: React.PropTypes.string,
        confirmText: React.PropTypes.string,
        message: React.PropTypes.any.isRequired,
        onConfirm: React.PropTypes.func.isRequired,
        title: React.PropTypes.string.isRequired,
        visible: React.PropTypes.bool,
    },

    getDefaultProps() {
        return {
            bsStyle: 'default'
        };
    },

    getInitialState() {
        if (!this.props.visible) {
            return {
                isOpened: false,
            };
        } else {
            return {
                isOpened: true,
            };
        }
    },

    onButtonClick() {
        this.setState({
            isOpened: true,
        });
    },

    onClose() {
        this.setState({
            isOpened: false,
        });
    },

    onConfim() {
        this.setState({
            isOpened: false,
        });
        this.props.onConfirm();
    },

    render() {
        var content;
        if (this.props.children) {
            content = React.cloneElement(React.Children.only(this.props.children), {
                onClick: this.onButtonClick,
            });
        } else {
            content = <Button bsStyle={this.props.bsStyle} onClick={this.onButtonClick}>{this.props.buttonText}</Button>;
        }


        return (
            <span style={this.props.style}>
                {content}
                <Modal isOpened={this.state.isOpened} onClose={this.onClose}>
                    <ModalHeader title={this.props.title} />
                    <ModalContent>
                        {this.props.message}
                    </ModalContent>
                    <ModalFooter>
                        <Button bsStyle="default" onClick={this.onClose}>Cancel</Button>
                        {this.props.confirmText ? (
                            <Button bsStyle="danger" onClick={this.onConfim}>{this.props.confirmText}</Button>
                        ) : null}
                    </ModalFooter>
                </Modal>
            </span>
        );
    },
});

module.exports = Confirm;