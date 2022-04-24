import React, {PureComponent} from 'react';
import Colors from '../../common/Colors';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import ThirdLevelList from './ThirdLevelList';
import {Platform, ScrollView, View} from 'react-native';
import {Icon} from 'native-base';

class SecondLevelItem extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            showMore: false
        };
    }

    render() {
        let thirdLevelSection = this.props.active == true ?
            <ThirdLevelList {...this.props} /> : null;
        return <View>
            <TouchableOpacity
                onPress={this.props.onPress}
                style={{backgroundColor:Colors.darkBackground2, padding: 10}}
            >
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flex:1}}>
                        <Text style={{color:Colors.whiteText}}>Credibility</Text>
                    </View>
                    <View style={{flex:3}}><Text style={{color:Colors.whiteText}}>High</Text></View>
                </View>
                {/*<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>*/}
                    {/*<View style={{flex:1}}>*/}
                        {/*<Text style={{color:Colors.whiteText}}>Sentiment</Text>*/}
                    {/*</View>*/}
                    {/*<View style={{flex:3}}>*/}
                        {/*<Text style={this.state.showMore ? styles.multiLine : styles.singleLine}>*/}
                            {/*{this.props.sentiment}*/}
                        {/*</Text>*/}
                    {/*</View>*/}
                {/*</View>*/}
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flex:1}}>
                        <Text style={{color:Colors.whiteText}}>Organizations</Text>
                    </View>
                    <View style={{flex:3}}>
                        <Text style={this.state.showMore ? styles.multiLine : styles.singleLine}>
                            {this.props.organizations}
                        </Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flex:1}}>
                        <Text style={{color:Colors.whiteText}}>Locations</Text>
                    </View>
                    <View style={{flex:3}}>
                        <Text style={this.state.showMore ? styles.multiLine : styles.singleLine}>
                            {this.props.locations}
                        </Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flex:1}}>
                        <Text style={{color:Colors.whiteText}}>People</Text>
                    </View>
                    <View style={{flex:3}}>
                        <Text style={this.state.showMore ? styles.multiLine : styles.singleLine}>
                            {this.props.persons}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
            {
                <TouchableOpacity
                    onPress={() => {
                        this.setState({
                            showMore: !this.state.showMore
                        });
                    }}
                    style={styles.showMore}>
                    <Icon type="FontAwesome" name={this.state.showMore ? 'chevron-up' : 'chevron-down'} style={{color: Colors.whiteText, fontSize: 16}} />
                </TouchableOpacity>
            }
            {
                Platform.OS == 'ios' ?
                    <ScrollView style={{maxHeight: 200}}>
                        {thirdLevelSection}
                    </ScrollView> : thirdLevelSection
            }
        </View>
    }

}

const styles = StyleSheet.create({
    showMore: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 8,
        paddingBottom: 8,
        backgroundColor: Colors.darkBackground2,
    },
    singleLine: {
        height: 18,
        color: Colors.whiteText
    },
    multiLine: {
        color: Colors.whiteText
    },
});

export default SecondLevelItem;
