import React from 'react';
import { Container, Header, Content, Button, Icon, Left, Text, Body, Title, Right, ListItem, Radio } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import Colors from '../../common/Colors';

const list = [
    {
        title: 'Small',
        value: 'small',
    },
    {
        title: 'Normal',
        value: 'normal',
    },
    {
        title: 'Large',
        value: 'large',
    },
];

export default class FontSizeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedLanguage: 'normal'
        };
    }

    render() {
        return (
            <Container style={{backgroundColor: Colors.darkBackground}}>
                <Header transparent style={{backgroundColor: Colors.darkBackground}}>
                    <Left>
                        <Button transparent onPress={() => {
                            this.props.navigation.goBack()
                        }}>
                            <Icon name='arrow-back' style={{color: Colors.whiteText}} />
                            <Text style={{color: Colors.whiteText}}>Back</Text>
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{color: Colors.whiteText}}>Font Size</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content>
                    {
                        list.map((item, i) => (
                            <ListItem
                                key={i}
                                onPress={() => {
                                    this.setState({
                                        selectedLanguage: item.value
                                    });
                                    AsyncStorage.setItem('fontSize', item.value);
                                }}
                            >
                                <Left>
                                    <Text style={{color: Colors.whiteText}}>{item.title}</Text>
                                </Left>
                                <Right>
                                    <Radio
                                        selected={item.value == this.state.selectedLanguage}
                                        selectedColor={Colors.whiteText}
                                    />
                                </Right>
                            </ListItem>
                        ))
                    }

                </Content>
            </Container>
        );
    }
}
