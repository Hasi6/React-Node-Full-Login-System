import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Grid,
  Header,
  Icon,
  Segment,
  Message,
  Form
} from "semantic-ui-react";

import { loginUser } from "../../../../redux/actions/auth/auth";

const Login = ({ auth, loginUser, history }) => {
  if (auth) {
    history.push("/");
  }

  // DECLARE STATE VARIABLES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState(null);
  const [isVerified, setIsVerified] = useState(true);

  // ONCHANGE FUNCTION
  const onChange = (value, name) => {
    name(value.target.value);
  };

  // LOGIN FUNCTION
  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setEmailError(false);
    setError(null);
    setPasswordError(false);
    const body = {
      email,
      password
    };

    loginUser(
      body,
      setLoading,
      setError,
      setEmailError,
      setPasswordError,
      setIsVerified
    );
  };

  const disabled = () => {
    if (
      email === "" ||
      password === "" ||
      loading === true ||
      !ValidateEmail(email)
    ) {
      return true;
    }
    return false;
  };

  const ValidateEmail = mail => {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  };

  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" icon color="violet" textAlign="center">
          <Icon name="code branch" color="violet" />
          Login for Chat
        </Header>
        <Form size="large" onSubmit={e => onSubmit(e)}>
          <Segment stacked>
            <Form.Input
              className={emailError ? "error" : null}
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="email"
              value={email}
              onChange={e => onChange(e, setEmail)}
              type="email"
            />
            {ValidateEmail(email) === false && email !== "" && (
              <Message color="red">Please Enter a Valid Email</Message>
            )}
            <Form.Input
              fluid
              className={passwordError ? "error" : null}
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              value={password}
              onChange={e => onChange(e, setPassword)}
              type="password"
            />
            <Button
              color="violet"
              className={loading ? "loading" : null}
              fluid
              size="large"
              disabled={disabled()}
            >
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          Don't Have an Account? <Link to="/register">Register in Here</Link>
        </Message>
        {error && <Message color="red">{error}</Message>}
        {!isVerified && (
          <Message color="red">
            "Your Account is not verified Please check your email or click
            bellow
          </Message>
        )}
        {isVerified && (
          <Link to="/forgetPassword">
            <small>Forget Password</small>
          </Link>
        )}
        <br />
        {!isVerified && (
          <Link to="/getVerifyEmail">
            <small>Get Verify Token</small>
          </Link>
        )}
      </Grid.Column>
    </Grid>
  );
};

// export default Login;

const mapStateToProps = state => {
  return {
    auth: state.auth,
    async: state.async
  };
};
export default connect(mapStateToProps, { loginUser })(Login);
