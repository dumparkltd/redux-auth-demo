import React from 'react';
import * as BSTheme from 'redux-auth/bootstrap-theme';
import { connect } from 'react-redux';

class GlobalComponents extends React.Component {

  render() {
    return (
      <div>
        <BSTheme.AuthGlobals />
      </div>
    );
  }
}

export default connect()(GlobalComponents);
