import React from 'react';
import { ListItem } from 'react-native-elements';
import { Container, Header, Content, Body, Title } from 'native-base';
import Colors from '../../common/Colors';
import {View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const list = [
    {
        title: 'Language',
        icon: 'language',
        page: 'Language',
        value: 'English'
    },
    {
        title: 'Font Size',
        icon: 'settings',
        page: 'FontSize',
        value: 'Normal'
    },
    // {
    //     title: 'Signals',
    //     icon: 'apps'
    // },
    {
        title: 'Suggestion/Requirement',
        icon: 'create',
        page: 'Suggestion'
    },
    // {
    //     title: 'Watch List',
    //     icon: 'list',
    //     page: 'WatchList'
    // },
    // {
    //     title: 'Alerts',
    //     icon: 'alarm'
    // }
    {
        title: 'Clear cache',
        icon: 'brush',
        action: 'clear_cache'
    }
];

export default class SettingsScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {

        return (
            <Container style={{backgroundColor: Colors.darkBackground}}>
                <Header transparent>
                    <Body>
                        <Title style={{color: Colors.whiteText}}>Settings</Title>
                    </Body>
                </Header>
                <Content>
                    <View style={{flex: 1, backgroundColor: Colors.darkBackground}}>
                        {
                            list.map((item, i) => (
                                <ListItem
                                    key={i}
                                    title={item.title}
                                    leftIcon={{ name: item.icon, color: Colors.whiteText }}
                                    bottomDivider
                                    chevron
                                    onPress={() => {
                                        if (item.page) {
                                            this.props.navigation.navigate(item.page);
                                        } else {
                                            if (item.action == 'clear_cache') {
                                                AsyncStorage.clear();
                                            }
                                        }
                                    }}
                                    containerStyle={{backgroundColor:Colors.darkBackground}}
                                    titleStyle={{color:Colors.whiteText}}
                                    rightTitle={item.value}
                                    rightTitleStyle={{color:Colors.hintText}}
                                />
                            ))
                        }
                    </View>
                </Content>
            </Container>
        );
    }
}
