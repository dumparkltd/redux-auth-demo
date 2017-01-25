import React from 'react';
import { PageHeader } from 'react-bootstrap';
import { connect } from 'react-redux';

if (!global.__SERVER__ && !global.__TEST__) {
  require('../styles/main.scss');
}

class Main extends React.Component {

  render() {
    return (
      <div>
        <PageHeader>
          Home
        </PageHeader>
      </div>
    );
  }
}

export default connect()(Main);
