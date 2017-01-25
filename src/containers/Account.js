import React, { PropTypes } from 'react';
import IndexPanel from '../components/IndexPanel';
import { PageHeader, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  SignOutButton,
  DestroyAccountButton,
  UpdatePasswordForm
} from 'redux-auth/bootstrap-theme';
import { browserHistory } from 'react-router';

class Account extends React.Component {
  static propTypes = {
    currentUserId: PropTypes.string,
    currentUserEmail: PropTypes.string,
    currentUserEndpoint: PropTypes.string,
    currentUserName: PropTypes.string,
  };

  render() {
    return (
      <div>
        <PageHeader>Account page</PageHeader>
        <Row>
          <IndexPanel header="Account information">
            <label>current user id</label>
            <p>{this.props.currentUserId}</p>

            <label>current user name</label>
            <p>{this.props.currentUserName}</p>

            <label>current user email</label>
            <p>{this.props.currentUserEmail}</p>

          </IndexPanel>
          <IndexPanel header="Update Password">
            <UpdatePasswordForm />
          </IndexPanel>
          <IndexPanel header="Sign out">
            <SignOutButton next={() => browserHistory.push('/')} />
          </IndexPanel>
          <IndexPanel header="Close account">
            <DestroyAccountButton bsStyle="danger" next={() => browserHistory.push('/')} />
          </IndexPanel>
        </Row>
      </div>
    );
  }
}

export default connect(({ auth }) => ({
  currentUserId: auth.getIn(['user', 'attributes', 'id']) || 'none',
  currentUserEmail: auth.getIn(['user', 'attributes', 'email']) || 'none',
  currentUserEndpoint: auth.getIn(['user', 'endpointKey']) || 'none',
  currentUserName: auth.getIn(['user', 'attributes', 'name']) || 'none',
}))(Account);

