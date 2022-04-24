import React from 'react';
import { Container, Header, Content, Button, Icon, Left, Text, Body, Title, Right, Textarea, Form, Toast } from 'native-base';
import Colors from '../../common/Colors';

export default class SuggestionScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

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
                        <Title style={{color: Colors.whiteText}}>Suggestion</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => {
                            Toast.show({
                                type: 'success',
                                text: 'Send success! Thanks for your support.',
                                position: 'bottom'
                            })
                        }}>
                            <Text>Send</Text>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <Form>
                        <Textarea
                            style={{backgroundColor: Colors.darkBackground2, color: Colors.whiteText}}
                            rowSpan={5}
                            placeholder="send your suggestion or requirement to us here..."
                        />
                    </Form>
                </Content>
            </Container>
        );
    }
}
