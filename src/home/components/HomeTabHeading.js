import React, { Component } from "react";
import {Text} from 'react-native';
import Colors from '../../common/Colors';
import {Badge} from 'react-native-elements';
import {TabHeading} from "native-base";

export default class HomeTabHeading extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <TabHeading style={{backgroundColor: Colors.darkBackground}}>
                <Text style={{color:Colors.whiteText}}>{this.props.name}</Text>
                <Text style={{color:Colors.whiteText, fontSize: 10}}>({this.props.num})</Text>
                <Badge status="error" badgeStyle={{borderWidth:0, marginTop: -10, marginLeft: 5}} />
            </TabHeading>
        );
    }
}
