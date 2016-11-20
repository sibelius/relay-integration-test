import React, { Component } from 'react';
import Relay from 'react-relay';
import ViewerQuery from './ViewerQuery';
import { createRenderer } from './RelayUtils';
import RelayStore from './RelayStore';

RelayStore.reset(
  new Relay.DefaultNetworkLayer('http://localhost:5000/graphql')
);

class RelayApp extends Component {
  render() {
    console.log('RelayWeb: ', this.props);

    if (!this.props.viewer.users) {
      return (
        <div>
          <span>No users</span>
        </div>
      );
    }

    return (
      <div>
        <span>name: {this.props.viewer.users.edges[0].node.name}</span>
        <span>length: {this.props.viewer.users.edges.length}</span>
      </div>
    );
  }
}

// Create a Relay.Renderer container
export default createRenderer(RelayApp, {
  queries: ViewerQuery,
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        users(first: 2) {
          edges {
            node {
              name
            }
          }
        }
      }
    `,
  },
});
