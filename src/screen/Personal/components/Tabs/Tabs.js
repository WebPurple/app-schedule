// @flow
import * as React from 'react';
import { Text, View } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';

const UserInfoTab = () => (
    <View>
        <Text>User Info</Text>
    </View>
);

const SettingsTab = () => (
    <View>
        <Text>SettingsTab</Text>
    </View>
);

export class Tabs extends React.Component {
    static defaultProps = {
        pageColor: '#e62270',
    };

    state = {
        index: 0,
        routes: [
            { key: 'info', title: 'Info', icon: 'info-circle' },
            { key: 'settings', title: 'Settings', icon: 'cogs' }
        ],
    };

    renderIcon = ({ route }) => (
        <Icon size={24} color={'#e62270'} name={route.icon} />
    );

    renderNothing = () => null;

    render() {
        return (
            <TabView
                navigationState={this.state}
                renderScene={SceneMap({
                    info: UserInfoTab,
                    settings: SettingsTab
                })}
                onIndexChange={index => this.setState({ index })}
                tabBarPosition="top"
                renderTabBar={props => (
                    <TabBar
                        {...props}
                        style={{
                            backgroundColor: '#fff',
                        }}
                        renderIcon={this.renderIcon}
                        renderLabel={this.renderNothing}
                        labelStyle={{ color: '#545454' }}
                        indicatorStyle={{
                            backgroundColor: this.props.pageColor,
                        }}
                        useNativeDriver
                    />
                )}
            />
        );
    }
}
