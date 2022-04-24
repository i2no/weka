import React, {PureComponent} from 'react';
import {FlatList, Platform, ScrollView, StyleSheet, Text, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import { concat } from 'react-native-reanimated';
import RightElement from './RightElement';
import Colors from '../../common/Colors';
import ThirdLevelList from './ThirdLevelList';
import Loading from '../../common/Loading';
import {apiBaseUrl} from '../../../app.json';

class SecondLevelList extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false,
            activeIndex: -1,
        };
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        fetch(`${apiBaseUrl}/api/results/second-level-list?publishDate=${this.props.pdate}&companies=${this.props.companies}&eventType=${this.props.eventType}`)
            .then(response => response.json())
            .then(responseData => {
                console.log(responseData);
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

    keyExtractor = (item, index) => index.toString()

    render() {
        if (!this.state.loaded) {
            return <Loading />;
        }
        return <FlatList
            ref={this._getRef}
            keyExtractor={this.keyExtractor}
            data={this.state.data}
            renderItem={this.renderItem}
            style={{backgroundColor:Colors.darkBackground}}
        />;
    }

    renderItem = ({ item, index }) => {
        let thirdLevelSection = null;
        if (this.state.activeIndex == index) {
            console.log(item);
            thirdLevelSection = <ThirdLevelList {...this.props} eventType={item.eventType} companies={item.companies} pdate={item.pdate} args={item.arguments} />;
        }
        return <View>
                <ListItem
                    title={item.highlight}
                    bottomDivider
                    containerStyle={{backgroundColor:Colors.darkBackground2}}
                    titleStyle={{color:Colors.whiteText}}
                    onPress={() => {
                        this.setState({
                            activeIndex: index
                        });
                    }}
                    rightElement={() => {return <RightElement newsCount={item.count} datetime={item.publishDate} />}}
                />
                {
                    Platform.OS == 'ios' ?
                        <ScrollView style={{maxHeight: 300}}>
                            {thirdLevelSection}
                        </ScrollView> : thirdLevelSection
                }
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.darkBackground
    }
});

export default SecondLevelList;
