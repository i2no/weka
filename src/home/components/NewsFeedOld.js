/**
 * News Feed Component
 * Author: jin.liu
 */


'use strict';
import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, ScrollView, Platform} from 'react-native';
import { ListItem } from 'react-native-elements';
import { concat } from 'react-native-reanimated';
import RightElement from './RightElement';
import Colors from '../../common/Colors';
import SecondLevelList from './SecondLevelList';
import Loading from '../../common/Loading';
import {apiBaseUrl} from '../../../app.json';

class NewsFeedOld extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false,
            activeIndex: -1,
        };
        this.page = 1;
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    refreshData() {
        // this.page = 1;
        // this.state.data = [];
        // this.fetchData();
    }

    fetchData() {
        fetch(`${apiBaseUrl}/api/results/top-level-list?page=` + this.page)
            .then(response => response.json())
            .then(responseData => {
                this.page++;
                this.setState({
                    data: this.state.data.concat(responseData.data),
                    loaded: true
                });
            });
    }

    _getRef = (flatList) => {
        this._flatList = flatList;
        const reObj = this._flatList;
        return reObj;
    }

    componentDidUpdate() {
        if (this.state.activeIndex != -1) {
            this._flatList.scrollToIndex({ animated: false, index: this.state.activeIndex });
        }
    }

    render() {
        if (!this.state.loaded) {
            return <Loading />;
        }
        return <View>
            <FlatList
                ref={this._getRef}
                keyExtractor={this.keyExtractor}
                data={this.state.data}
                renderItem={this.renderItem}
                style={{backgroundColor:Colors.darkBackground}}
                onEndReached={this.fetchData()}
                onRefresh={
                    this.refreshData()
                }
                removeClippedSubviews={true}
            />
            </View>;
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item, index }) => {
            let secondLevelSection = null;
            if (index == this.state.activeIndex) {
                secondLevelSection = <SecondLevelList {...this.props} eventType={item.eventType} companies={item.companies} pdate={item.pdate} />;
            }
            return <View>
                <ListItem
                    title={item.highlight}
                    leftAvatar={{
                        title: item.highlight[0],
                    }}
                    containerStyle={{backgroundColor:Colors.darkBackground}}
                    titleStyle={{color:Colors.whiteText}}
                    bottomDivider
                    onPress={() => {
                        if (this.state.activeIndex == index) {
                            this.state.activeIndex = -1;
                        } else {
                            this.setState({
                                eventType: item.eventType,
                                companies: item.companies,
                                pdate: item.pdate,
                                activeIndex: index
                            });
                        }
                    }}
                    rightElement={() => {return <RightElement newsCount={item.count} datetime={item.publishDate} />}}
                />
                {
                    Platform.OS == 'ios' ?
                    <ScrollView style={{maxHeight: 600}}>
                        {secondLevelSection}
                    </ScrollView> : secondLevelSection
                }
            </View>
    }
}

export default NewsFeedOld;
