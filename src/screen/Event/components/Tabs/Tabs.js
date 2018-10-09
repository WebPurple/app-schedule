// @flow
import * as React from 'react';
import { Text, View } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';

const EventInfoTab = () => (
    <View>
        <Text>Event Info</Text>
    </View>
);

const LocationInfoTab = () => (
    <View>
        <Text>LocationInfo</Text>
    </View>
);

const NotesTab = () => (
    <View>
        <Text>Notes</Text>
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
            { key: 'location', title: 'Location', icon: 'location-arrow' },
            { key: 'notes', title: 'Notes', icon: 'sticky-note' },
        ],
    };

    renderIcon = ({ route }) => (
        <Icon size={24} color={this.props.pageColor} name={route.icon} />
    );

    renderNothing = () => null;

    render() {
        return (
            <TabView
                navigationState={this.state}
                renderScene={SceneMap({
                    info: EventInfoTab,
                    location: LocationInfoTab,
                    notes: NotesTab,
                })}
                onIndexChange={index => this.setState({ index })}
                tabBarPosition="bottom"
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
