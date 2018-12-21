import React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainerProps } from 'react-navigation';
import { getColor } from '../../styles/theme';
import { withAuth, withFirebase, Firebase } from '../../core';
import { User } from '../../types/scheme';

import Icon from 'react-native-vector-icons/FontAwesome';

type Props = NavigationContainerProps & { user: User; firebase: Firebase };

const Profile: React.SFC<Props> = ({ user, firebase }) => (
    <View style={{ flex: 1, width: '100%' }}>
        <View style={{ flex: 1 }}>
            <Text>{JSON.stringify(user, null, 4)}</Text>
        </View>
        <View style={{ flex: 1 }}>
            <Button title="Sign out" onPress={() => firebase.auth.signOut()} />
        </View>
    </View>
);

(Profile as any).navigationOptions = {
    tabBarIcon: <Icon size={24} color={getColor('grape')} name="user" />
};

export const ProfileScreen = withFirebase(withAuth(Profile));
