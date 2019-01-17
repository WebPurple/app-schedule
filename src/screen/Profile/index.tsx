import React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainerProps } from 'react-navigation';
import { withAuth, withFirebase, Firebase } from '../../core';
import { User } from '../../types/scheme';

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

export const ProfileScreen = withFirebase(withAuth(Profile));
