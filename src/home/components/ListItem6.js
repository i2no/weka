import React from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet
} from 'react-native';
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import LinearGradient from 'react-native-linear-gradient'; // Only if no expo

import { ListItem } from 'react-native-elements'

const ListItem6 = (): Node => (
    <ListItem
        Component={TouchableScale}
        friction={90} //
        tension={100} // These props are passed to the parent component (here TouchableScale)
        activeScale={0.95} //
        linearGradientProps={{
            colors: ['#FF9800', '#F44336'],
            start: {x:1, y:0},
            end: {x:0.2, y:0},
        }}
        ViewComponent={LinearGradient} // Only if no expo
        leftAvatar={{ rounded: true, source: { uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg" } }}
        title="Chris Jackson"
        titleStyle={{ color: 'white', fontWeight: 'bold' }}
        subtitleStyle={{ color: 'white' }}
        subtitle="Vice Chairman"
        chevron={{ color: 'white' }}
    />
);

export default ListItem6;
