/**
 * News Feed Component
 * Author: jin.liu
 */


'use strict';
import React, {Component} from 'react';
import {View, Text, SectionList, Button} from 'react-native';
import Colors from '../../common/Colors';
import Loading from '../../common/Loading';
import FirstLevelItem from './FirstLevelItem';
import SecondLevelItem from './SecondLevelItem';
import {apiBaseUrl} from '../../../app.json';
import ListEmpty from '../../common/ListEmpty';
import ListFooter from '../../common/ListFooter';
import {ActionSheet, Toast, Form, Item, Label, Input, Icon} from "native-base";
import AsyncStorage from '@react-native-community/async-storage';
import ActionOverlay from './ActionOverlay';

class NewsFeed extends Component {

    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
        this.renderSectionHeader = this.renderSectionHeader.bind(this);
        this.init();
        this.state = {
            dataSource: [],
            loaded: false,
            refreshing: false,
            hasMore: true,
            actionOverlayVisible: false,
            selectedHighlight: '',
            selectedEventType: '',
            selectedIndex: -1,
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    init() {
        this.page = 1;
        this.pageIng = 0;
        this.keywords = this.props.keywords;
        this.startDate = this.props.startDate;
        this.endDate = this.props.endDate;
        this.status = this.props.status;
        this.sectionData = [];
        this.activeIndex = -1;
    }

    UNSAFE_componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        this.init();
        this.keywords = nextProps.keywords;
        this.startDate = nextProps.startDate;
        this.endDate = nextProps.endDate;
        this.status = nextProps.status;
        this.fetchData();
    }

    parseData(data) {
        this.sectionData = this.sectionData.concat(data);
        let newDataSource = [];
        for (let sIndex in this.sectionData) {
            let section = this.sectionData[sIndex];
            section.key = sIndex;
            for (let iIndex in section.data) {
                let item = section.data[iIndex];
                item.key = iIndex;
                item.active = false;
            }
            let newSection = JSON.parse(JSON.stringify(section));
            newSection.data = [];
            newDataSource.push(newSection);
        }
        this.setState({
            dataSource: newDataSource,
        });
    }

    requestApiData(page, keywords, startDate, endDate, status) {
        let critical = status == 'Critical' ? '1' : '0';
        let url = `${apiBaseUrl}/api/results/section-list?page=${page}&keywords=${keywords}&startDate=${startDate}&endDate=${endDate}&critical=${critical}`;
        if (this.pageIng == page) {
            return;
        }
        this.pageIng = page;
        console.log(url);
        fetch(url)
            .then(response => response.json())
            .then(responseData => {
                if (responseData.code == 200) {
                    this.parseData(responseData.data);
                    if (page == 1) {
                        if (this.props.updateTabNum) {
                            this.props.updateTabNum(responseData.total);
                        }
                    }
                    this.page = page + 1;
                    this.setState({
                        loaded: true,
                        refreshing: false,
                        hasMore: true,
                    });
                } else {
                    this.setState({
                        loaded: true,
                        refreshing: false,
                        hasMore: false,
                    });
                }
            });
    }

    requestStorageData(status) {
        if (this.state.loaded == false) {
            this.getData(status, (value) => {
                if (value != null) {
                    let data = JSON.parse(value);
                    console.log('requestStorageData', value, data, data.length);
                    if (data) {
                        this.parseData(data);
                    }
                }
                this.setState({
                    loaded: true,
                    refreshing: false,
                    hasMore: false,
                });
            });
        }
    }

    fetchData() {
        let page = this.page;
        let keywords= this.keywords;
        let startDate = this.startDate;
        let endDate = this.endDate;
        let status = this.status;
        if (status == 'Critical' || status == 'Relevant') {
            this.requestApiData(page, keywords, startDate, endDate, status);
        } else {
            this.requestStorageData(status);
        }
    }

    _getRef = (sectionList) => {
        this._sectionList = sectionList;
        const reObj = this._sectionList;
        return reObj;
    }

    renderItem({section, item}) {
        return <SecondLevelItem
            navigation={this.props.navigation}
            {...item}
            args={item.arguments}
            onPress={() => {
                let newDataSource = this.state.dataSource;
                newDataSource[section.key].data[item.key].active = !newDataSource[section.key].data[item.key].active;
                this.setState({
                    dataSource: newDataSource
                });
            }}
        />
    }

    renderSectionHeader({section}) {
        if (section.hidden == true) {
            return null;
        }
        if (section.timeline == true) {
            return <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 15,
                paddingBottom: 15,
                borderBottomColor: Colors.whiteText,
                borderBottomWidth: 2,
                borderTopColor: Colors.whiteText,
                borderTopWidth: 2,
            }}>
                <Text style={{color: Colors.whiteText, fontSize: 18}}>{section.pdate}</Text>
            </View>
        }
        return <FirstLevelItem
            title={section.highlight}
            eventType={section.eventType}
            icon={section.icon}
            count={section.count}
            publishDate={section.publishDate}
            monitorDatetime={section.monitorDatetime}
            onPress={() => {
                if (this.activeIndex != -1 && this.activeIndex != section.key) {
                    this.state.dataSource[this.activeIndex].data = [];
                }
                if (section.data.length == 0) {
                    this.activeIndex = section.key;
                    this.state.dataSource[section.key].data = this.sectionData[section.key].data;
                } else {
                    this.state.dataSource[section.key].data = [];
                    this.activeIndex = -1;
                }
                this.setState({
                    dataSource: this.state.dataSource
                });
                //this._sectionList.scrollToLocation({animated: true, itemIndex: 0, sectionIndex: section.key});
            }}
            onLongPress={() => {
                    this.setState({
                        actionOverlayVisible: true,
                        selectedHighlight: section.highlight,
                        selectedEventType: section.eventType,
                        selectedIndex: section.key
                    });
                }
            }
        />
    }

    formatDate(time,format='YY-MM-DD hh:mm:ss') {
        let date = new Date(time);
        let year = date.getFullYear(),
        month = date.getMonth()+1,//月份是从0开始的
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();
        let preArr = Array.apply(null,Array(10)).map(function(elem, index) {
            return '0'+index;
        });
        let newTime = format.replace(/YY/g,year)
            .replace(/MM/g,preArr[month]||month)
            .replace(/DD/g,preArr[day]||day)
            .replace(/hh/g,preArr[hour]||hour)
            .replace(/mm/g,preArr[min]||min)
            .replace(/ss/g,preArr[sec]||sec);
        return newTime;
    }

    storeData = async (key, value) => {
        try {
            //console.log('storeData', key, value);
            await AsyncStorage.setItem(key, value)
        } catch (e) {
            // saving error
        }
    }

    getData = async (key, callback) => {
        try {
            const value = await AsyncStorage.getItem(key);
            //console.log('getData', key, value);
            callback(value);
        } catch(e) {
            // error reading value
        }
    }

    render() {
        if (!this.state.loaded) {
            return <Loading />;
        }
        return <View style={{flex: 1}}>
            <ActionOverlay
                isVisible={this.state.actionOverlayVisible}
                selectedHighlight={this.state.selectedHighlight}
                selectedEventType={this.state.selectedEventType}
                onBackdropPress={() => {
                    this.setState({ actionOverlayVisible: false });
                }}
                category={this.props.status}
                onResolveButtonPress={() => {
                    Toast.show({
                        text: "Done",
                        duration: 1000,
                        type: "success"
                    });
                    let section = this.state.dataSource[this.state.selectedIndex];
                    section.hidden = true;
                    let statusToMove = 'Archive';
                    this.getData(statusToMove, (value) => {
                        let newData = null;
                        if (value != null) {
                            newData = JSON.parse(value);
                            newData.push(this.sectionData[section.key]);
                        } else {
                            newData = [this.sectionData[section.key]];
                        }
                        this.storeData(statusToMove, JSON.stringify(newData));
                    });

                    this.setState({
                        dataSource: this.state.dataSource,
                        actionOverlayVisible: false
                    });
                }}
                onMonitorButtonPress={() => {
                    Toast.show({
                        text: "Done",
                        duration: 1000,
                        type: "success"
                    });
                    let section = this.state.dataSource[this.state.selectedIndex];
                    section.hidden = true;
                    let statusToMove = 'Ongoing';
                    this.getData(statusToMove, (value) => {
                        let newData = null;
                        let newSection = this.sectionData[section.key];
                        newSection.monitorDatetime = this.formatDate(new Date().getTime());
                        if (value != null) {
                            newData = JSON.parse(value);
                            newData.push(newSection);
                        } else {
                            newData = [newSection];
                        }
                        console.log(newData);
                        this.storeData(statusToMove, JSON.stringify(newData));
                    });
                    this.props.showOngoingBadge();
                    this.setState({
                        dataSource: this.state.dataSource,
                        actionOverlayVisible: false
                    });
                }}
                onIgnoreButtonPress={() => {
                    Toast.show({
                        text: "Done",
                        duration: 1000,
                        type: "success"
                    });
                    let section = this.state.dataSource[this.state.selectedIndex];
                    section.hidden = true;
                    let statusToMove = 'Archive';
                    this.getData(statusToMove, (value) => {
                        let newData = null;
                        if (value != null) {
                            newData = JSON.parse(value);
                            newData.push(this.sectionData[section.key]);
                        } else {
                            newData = [this.sectionData[section.key]];
                        }
                        this.storeData(statusToMove, JSON.stringify(newData));
                    });

                    this.setState({
                        dataSource: this.state.dataSource,
                        actionOverlayVisible: false
                    });
                }}
            />
            <SectionList
                ref={this._getRef}
                sections={this.state.dataSource}
                renderSectionHeader={this.renderSectionHeader}
                renderItem={this.renderItem}
                ListFooterComponent={
                    <ListFooter
                        hasMore={this.state.hasMore}
                        showEndHint={this.state.dataSource.length > 0 && this.props.status == 'Critical'}
                    />}
                onRefresh={() => {
                    this.init();
                    this.setState({
                        refreshing: true
                    });
                    this.fetchData();
                }}
                onEndReached={() => {
                    this.fetchData();
                }}
                style={{backgroundColor:Colors.darkBackground}}
                ListEmptyComponent={<ListEmpty/>}
                refreshing={this.state.refreshing}
            />
        </View>

    }

}

export default NewsFeed;
