import React from 'react';
import IndexPanel from '../components/IndexPanel';
import EmailSignUpForm from '../views/EmailSignUpForm';
import { PageHeader, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { EmailSignInForm, RequestPasswordResetForm } from 'redux-auth/bootstrap-theme';

class SignIn extends React.Component {

  render() {
    return (
      <div>
        <PageHeader>Sign In</PageHeader>
        <Row>

          <IndexPanel header="Email Sign In">
            <EmailSignInForm
              next={() => browserHistory.push('/account')}
            />
          </IndexPanel>

          <IndexPanel header="Email Sign Up">
            <EmailSignUpForm />
          </IndexPanel>

          <IndexPanel header="Request Password Reset">
            <RequestPasswordResetForm />
          </IndexPanel>

        </Row>
      </div>
    );
  }
}

export default connect(({ routes }) => ({ routes }))(SignIn);
