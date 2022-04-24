import React, { Component } from "react";
import {Button, Text, View} from 'react-native';
import {ListItem, Overlay} from 'react-native-elements';
import {Icon, Input, Item, Label} from 'native-base';
import Colors from '../../common/Colors';

export default class EmailOverlay extends Component {


    render() {
        let emailHistoryList = [
            {
                title: 'email1@address.com',
            },
            {
                title: 'email2@address.com',
            },
            {
                title: 'email3@address.com',
            }
        ].map((item, i) => (
            <ListItem
                key={i}
                title={item.title}
                bottomDivider
                onPress={() => {

                }}
            />
        ));
        return <Overlay
                isVisible={this.props.isVisible}
                onBackdropPress={this.props.onBackdropPress}
                height="auto"
            >
                <View style={{flexDirection: 'column', justifyContent: 'space-around'}}>
                    <Item stackedLabel>
                        <Label>Input Email Address</Label>
                        <Item>
                            <Icon type="FontAwesome" name="envelope" />
                            <Input placeholder="email@address.com" onChangeText={this.props.onChangeText} />
                        </Item>
                    </Item>
                    <View>
                        <Text style={{color: '#555', fontSize: 15, marginTop: 20}}>Suggested</Text>
                    </View>
                    {emailHistoryList}
                    <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 10}}>
                        <Button title="Escalate" color="red" onPress={this.props.onEscalateButtonPress}/>
                    </View>
                </View>
            </Overlay>;

    }
}
