import React, { Component } from "react";
import {View} from 'react-native';
import {Overlay, ListItem} from 'react-native-elements';
import EmailOverlay from './EmailOverlay';
import {Toast} from "native-base";
import {apiBaseUrl} from '../../../app';

export default class EscalationOverlay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emailOverlayVisible: false,
            emailAddress: ''
        };
    }

    sendEmail() {
        if (this.state.emailAddress != '') {
            let url = `${apiBaseUrl}/api/email/send?email=${this.state.emailAddress}&highlight=${this.props.selectedHighlight}&eventType=${this.props.selectedEventType}`;
            fetch(url)
                .then(response => response.json())
                .then(responseData => {
                    if (responseData.code == 200) {
                        Toast.show({
                            text: "Email sent successfully.",
                            duration: 1000,
                            type: "success"
                        });
                    }
                });
        }
    }

    render() {
        let escalationList = [
            {
                title: 'Select Escalation'
            },
            {
                icon: 'mail',
                title: 'Send Email',
            },
            {
                icon: 'cloud',
                title: 'Delegate task(salesforce)',
            },
            {
                icon: 'date-range',
                title: 'Schedule meeting(iCall)',
            },
            {
                icon: 'call',
                title: 'Call',
            },
            {
                icon: 'comment',
                title: 'Send text message',

            }
        ].map((item, i, arr) => {
                return <ListItem
                    key={i}
                    title={item.title}
                    leftIcon={item.icon ? {name: item.icon} : null}
                    bottomDivider={i != arr.length - 1}
                    onPress={item.icon ? () => {
                        this.props.onBackdropPress();
                        if (item.icon == 'mail') {
                            this.setState({ emailOverlayVisible: true });
                        } else {
                            Toast.show({
                                text: "Done",
                                duration: 1000,
                                type: "success"
                            });
                        }
                    } : null}
                />
        });
        return <View>
                <Overlay
                    isVisible={this.props.isVisible}
                    onBackdropPress={this.props.onBackdropPress}
                    height="auto"
                >
                    <View>{escalationList}</View>
                </Overlay>
                <EmailOverlay
                    isVisible={this.state.emailOverlayVisible}
                    onBackdropPress={() => this.setState({ emailOverlayVisible: false })}
                    onEscalateButtonPress={() => {
                        this.setState({ emailOverlayVisible: false });
                        this.sendEmail();
                    }}
                    onChangeText={(text) => {
                        this.setState({
                            emailAddress: text
                        });
                    }}
                />
            </View>;
    }
}
