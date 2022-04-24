import React from 'react';
import {
    FlatList
} from 'react-native';

import { ListItem } from 'react-native-elements'


const list = [
    {
        name: 'Amy Farha',
        subtitle: 'Vice President'
    },
    {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman'
    },
];

keyExtractor = (item, index) => index.toString()

renderItem = ({ item }) => (
    <ListItem
        title={item.name}
        subtitle={item.subtitle}
        leftAvatar={{
            source: item.avatar_url && { uri: item.avatar_url },
            title: item.name[0]
        }}
        bottomDivider
        chevron
    />
)

const ListItem4 = (): Node => (
    <FlatList
        keyExtractor={this.keyExtractor}
        data={list}
        renderItem={this.renderItem}
    />
);

export default ListItem4;
