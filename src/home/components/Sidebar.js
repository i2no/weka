import React, { Component } from 'react';
import { Container, Header, Content, DatePicker, Form,
    Icon, Body, Title, Item, ListItem, CheckBox, Text,
    Label, Button } from 'native-base';
import {Platform} from 'react-native';
import Colors from '../../common/Colors';
import {eventTypeCategorization} from '../../../app.json';
import EventTypeTree from './EventTypeTree';

export default class DatePickerExample extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(2019, 0, 1),
            endDate: new Date(),
        };
    }

    industryList()
    {
        return [
            {
                title: 'Finance & Insurance',
            },
            {
                title: 'Transportation',
            },
            {
                title: 'Technology',
            },
            {
                title: 'Industrial & Commodities',
            },
            {
                title: 'Food industry',
            },
            {
                title: 'Pharmaceutical & Healthcare',
            },
            {
                title: 'Consumer Goods',
            },
            {
                title: 'Media & Entertainment',
            },
            {
                title: 'Real Estate',
            },
            {
                title: 'Utilities',
            },
            {
                title: 'Conglomerates',
            },
        ].map((item, i) => (
            <ListItem key={i}>
                <CheckBox checked={true} color="black" />
                <Body>
                <Text>{item.title}</Text>
                </Body>
            </ListItem>
        ));
    }

    eventTypeList() {
        return eventTypeCategorization.map((item, i) => (
            <ListItem key={item.key}>
                <CheckBox checked={true} color="black" />
                <Body>
                <Text>{item.title}</Text>
                </Body>
            </ListItem>
        ));
    }

    formatDate(date) {
        if (typeof date == 'string') {
            return date;
        }
        let fmt = "yyyy-MM-dd";

        if (!date || date == null) return null;
        var o = {
            'M+': date.getMonth() + 1, // 月份
            'd+': date.getDate(), // 日
            'h+': date.getHours(), // 小时
            'm+': date.getMinutes(), // 分
            's+': date.getSeconds(), // 秒
            'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
            'S': date.getMilliseconds() // 毫秒
        }
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        for (var k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
        return fmt
    }


    render() {

        return (
            <Container style={{marginTop: Platform.OS == 'ios' ? 0 : 24}}>
                <Header style={{backgroundColor: Colors.white}}>
                    <Body>
                        <Title style={{color: Colors.black}}>Filters</Title>
                    </Body>
                </Header>
                <Content>
                    <Form>
                        <Item>
                            <Icon name="time"/>
                            <Label style={{color: Colors.greyTag}}>Date range</Label>
                            <Button light onPress={() => {
                                this.setState({
                                    startDate: new Date(),
                                    endDate: new Date(),
                                });
                                this.props.onStartDateChanged('');
                                this.props.onEndDateChanged('');
                            }}>
                                <Text>Reset</Text>
                            </Button>
                        </Item>
                        <Item>
                            <DatePicker
                                defaultDate={this.state.startDate}
                                maximumDate={new Date()}
                                locale={"en"}
                                modalTransparent={false}
                                animationType={"fade"}
                                androidMode={"default"}
                                placeHolderText=""
                                textStyle={{}}
                                placeHolderTextStyle={{ color: "#d3d3d3" }}
                                onDateChange={(chosenDate) => {
                                    console.log(chosenDate);
                                    this.setState({
                                        startDate: chosenDate
                                    });
                                    this.props.onStartDateChanged(this.formatDate(chosenDate));
                                }}
                                disabled={false}
                            />
                            <Label style={{color: Colors.hintText}}>~</Label>
                            <DatePicker
                                defaultDate={this.state.endDate}
                                maximumDate={new Date()}
                                locale={"en"}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"fade"}
                                androidMode={"default"}
                                placeHolderText=""
                                textStyle={{}}
                                placeHolderTextStyle={{ color: "#d3d3d3" }}
                                onDateChange={(chosenDate) => {
                                    this.setState({
                                        endDate: chosenDate
                                    });
                                    this.props.onEndDateChanged(this.formatDate(chosenDate));
                                }}
                                disabled={false}
                            />
                        </Item>
                    </Form>

                    <Form>
                        <Item style={{height: 43}}>
                            <Icon name="apps"/>
                            <Label style={{color: Colors.darkBackground}}>Event type</Label>
                        </Item>
                        {/*<EventTypeTree parentId={0} level={0} />*/}
                        {this.eventTypeList()}
                    </Form>

                    <Form>
                        <Item style={{height: 43}}>
                            <Icon name="list"/>
                            <Label style={{color: Colors.darkBackground}}>Companies filter</Label>
                        </Item>
                        {this.industryList()}
                    </Form>
                </Content>

            </Container>
        );
    }
}
