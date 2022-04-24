import React from 'react';
import {
    View,
} from 'react-native';

import { ListItem } from 'react-native-elements'
import Colors from '../../common/Colors';


const list = [
    {
        title: 'Setting1',
        icon: 'av-timer'
    },
    {
        title: 'Setting2',
        icon: 'flight-takeoff'
    }
];

const ListItem2 = (): Node => (
    <View style={{flex: 1, backgroundColor: Colors.darkBackground}}>
        {
            list.map((item, i) => (
                <ListItem
                    key={i}
                    title={item.title}
                    leftIcon={{ name: item.icon, color: Colors.whiteText }}
                    bottomDivider
                    chevron
                    onPress={() => {

                    }}
                    containerStyle={{backgroundColor:Colors.darkBackground}}
                    titleStyle={{color:Colors.whiteText}}
                />
            ))
        }
    </View>
);

export default ListItem2;
