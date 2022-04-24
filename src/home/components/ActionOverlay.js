import React, { Component } from "react";
import {View} from 'react-native';
import {Overlay, ListItem} from 'react-native-elements';
import {ActionSheet, Toast, Button, Text} from 'native-base';
import {apiBaseUrl} from '../../../app';
import EscalationOverlay from './EscalationOverlay';

export default class ActionOverlay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            escalationOverlayVisible: false,
        };
    }


    render() {
        let monitorButtton = <Button block info style={{marginTop: 15}} onPress={this.props.onMonitorButtonPress}>
            <Text>Monitor</Text>
        </Button>;
        let ignoreButton = <Button block dark  style={{marginTop: 15}}  onPress={this.props.onIgnoreButtonPress}>
            <Text>Ignore</Text>
        </Button>;
        let resolveButton = <Button block success  style={{marginTop: 15}}  onPress={this.props.onResolveButtonPress}>
            <Text>Resolve</Text>
        </Button>;
        let escalateButton = <Button block danger style={{marginTop: 15}} onPress={() => {
            this.props.onBackdropPress();
            this.setState({
                escalationOverlayVisible: true,
            });
        }}>
            <Text>Escalate</Text>
        </Button>;
        let buttons = null;
        if (this.props.category == 'Ongoing') {
            buttons = <View style={{paddingBottom: 15}}>
                {resolveButton}
            </View>;
        } else {
            buttons = <View style={{paddingBottom: 15}}>
                {escalateButton}
                {monitorButtton}
                {ignoreButton}
            </View>;
        }
        return <View>
                <Overlay
                    isVisible={this.props.isVisible}
                    onBackdropPress={this.props.onBackdropPress}
                    height="auto"
                >
                    {buttons}
                </Overlay>
                <EscalationOverlay
                    isVisible={this.state.escalationOverlayVisible}
                    selectedHighlight={this.props.selectedHighlight}
                    selectedEventType={this.props.selectedEventType}
                    onBackdropPress={() => {
                        this.setState({ escalationOverlayVisible: false });
                    }}
                />
            </View>;
    }
}
