// @flow
import * as React from 'react';
import { Text, View, Dimensions } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

const EventInfoTab = () => (
  <View>
    <Text>EventInfo</Text>
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

type State = {
  index: number,
  routes: Array<{ key: string, title: string }>,
};

export class Tabs extends React.Component<{}, State> {
  state = {
    index: 0,
    routes: [
      { key: 'info', title: 'Info' },
      { key: 'location', title: 'Location' },
      { key: 'notes', title: 'Notes' },
    ],
  };

  renderNothing() {
    return null;
  }

  render(): React.Node {
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
            labelStyle={{ color: '#545454' }}
            indicatorStyle={{
              backgroundColor: '#e62270',
            }}
          />
        )}
      />
    );
  }
}
