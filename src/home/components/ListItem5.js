import React from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet
} from 'react-native';

import { ListItem } from 'react-native-elements'

const ListItem5 = (): Node => (
    <ListItem
        title='Limited supply! Its like digital gold!'
        subtitle={
            <View style={styles.subtitleView}>
                <Image source={require('../images/rating.png')} style={styles.ratingImage}/>
                <Text style={styles.ratingText}>5 months ago</Text>
            </View>
        }
        leftAvatar={{ source: require('../images/avatar1.jpg') }}
    />
);

const styles = StyleSheet.create({
    subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5
    },
    ratingImage: {
        height: 19.21,
        width: 100
    },
    ratingText: {
        paddingLeft: 10,
        color: 'grey'
    }
})

export default ListItem5;
