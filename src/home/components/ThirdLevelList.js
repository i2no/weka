import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Colors from '../../common/Colors';
import Loading from '../../common/Loading';
import {apiBaseUrl} from '../../../app.json';
class ThirdLevelList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false,
        };
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        let apiUrl = `${apiBaseUrl}/api/results/third-level-list`;
        let paramsStr = `?publishDate=${this.props.pdate}&companies=${this.props.companies}&eventType=${this.props.eventType}&arguments=${this.props.args}`;
        let url = apiUrl + paramsStr;
        console.log(url);
        fetch(url)
            .then(response => response.json())
            .then(responseData => {
                this.setState({
                    data: this.state.data.concat(responseData.data),
                    loaded: true
                });
            });
    }

    keyExtractor = (item, index) => index.toString()

    render() {
        if (!this.state.loaded) {
            return <Loading />;
        }
        return <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.data}
            renderItem={this.renderItem}

            style={{backgroundColor:Colors.darkBackground}}

        />;
    }

    renderItem = ({ item }) => {
        return <TouchableOpacity onPress={() => {
                //Linking.openURL(item.url);
                this.props.navigation.navigate('Webview', {url: item.url})
        }}>
            <View style={styles.newsItem}>
                <Text style={styles.newsTitle}>{item.title}</Text>
                <Text style={styles.newsAbstract}>{item.sentence}</Text>
                <Text style={styles.newsAttach}>{item.publishDate}</Text>
            </View>
        </TouchableOpacity>;
    }
}

const styles = StyleSheet.create({
    newsItem: {
        flexDirection: 'column',
        backgroundColor: Colors.darkBackground3,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: Colors.darkBackground2
    },
    newsTitle: {
        color: Colors.whiteText
    },
    newsAbstract: {
        color: Colors.hintText,
        fontSize: 12,
        marginTop: 5
    },
    newsAttach: {
        color: Colors.hintText,
        fontSize: 12,
        marginTop: 5
    }
});

export default ThirdLevelList;
