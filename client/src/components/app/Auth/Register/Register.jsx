import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Icon,
  Grid,
  Message,
  Header,
  Segment,
  Form
} from "semantic-ui-react";

import { registerUser } from "../../../../redux/actions/auth/auth";

const Register = ({ history, async, auth, registerUser }) => {
  // DECLARE STATE VARIABLES
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  // ONCHANGE FUNCTION
  const onChange = (value, name) => {
    name(value.target.value);
  };

  // REGISTER FUNCTION
  const onSubmit = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError(true);
      setError("Passwords Did not Matched");
    } else {
      setLoading(true);
      const body = {
        username,
        email,
        password
      };
      registerUser(body, setLoading, setError, setEmailError, history);
    }
  };

  const ValidateEmail = mail => {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  };

  const disabled = () => {
    if (
      email === "" ||
      username === "" ||
      password === "" ||
      confirmPassword === "" ||
      confirmPassword !== password ||
      password.length < 8 ||
      loading === true ||
      ValidateEmail(email) !== true
    ) {
      return true;
    }
    return false;
  };

  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        {/**saved && <Message color="green">Successfully Registered</Message> */}
        <Header as="h2" icon color="orange" textAlign="center">
          <Icon name="puzzle piece" color="orange" />
          Register for Chat
        </Header>
        <Form size="large" onSubmit={e => onSubmit(e)}>
          <Segment stacked>
            <Form.Input
              fluid
              name="username"
              icon="user"
              iconPosition="left"
              placeholder="Username"
              value={username}
              onChange={e => onChange(e, setUsername)}
              type="text"
            />
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
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              value={password}
              onChange={e => onChange(e, setPassword)}
              type="password"
            />
            {password.length < 8 && password !== "" && (
              <Message color="red">Password length must be at least 8</Message>
            )}
            <Form.Input
              fluid
              name="Confirm Password"
              icon="repeat"
              iconPosition="left"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={e => onChange(e, setConfirmPassword)}
              type="password"
            />
            {confirmPassword !== password && confirmPassword !== "" && (
              <Message color="red">
                Password and Confirm Password Did not matched
              </Message>
            )}
            <Button
              color="orange"
              className={loading ? "loading" : null}
              fluid
              size="large"
              disabled={disabled()}
            >
              Submit
            </Button>
          </Segment>
        </Form>
        <Message>
          Already a User? <Link to="/login">Login in Here</Link>
        </Message>
        {error && <Message color="red">{error}</Message>}
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    async: state.async
  };
};
export default connect(mapStateToProps, { registerUser })(Register);
