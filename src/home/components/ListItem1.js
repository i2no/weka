import React from 'react';
import {
    View,
} from 'react-native';

import { ListItem } from 'react-native-elements'


const list = [
    {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Vice President'
    },
    {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman'
    },
];

const ListItem1 = (): Node => (
    <View>
    {
        list.map((l, i) => (
            <ListItem
                key={i}
                leftAvatar={{ source: { uri: l.avatar_url } }}
                title={l.name}
                subtitle={l.subtitle}
                bottomDivider
            />
        ))
    }
    </View>
);

export default ListItem1;
