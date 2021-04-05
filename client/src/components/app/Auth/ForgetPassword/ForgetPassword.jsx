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

import "../auth.css";
import axios from "axios";
import { endPoint, config } from "../../../../config";

const ForgetPassword = ({ auth, history }) => {
  if (auth) {
    history.push("/");
  }

  // DECLARE STATE VARIABLES
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null);

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
    setMsg(null);
    const body = {
      email
    };

    try {
      const res = await axios.post(
        `${endPoint}/api/forgetPassword`,
        body,
        config
      );
      if (res.data.msg) {
        setMsg("Email Has Been Sent");
      } else if (!res.data.msg) {
        setError("Email Not Found");
      }
      setLoading(false);
    } catch (err) {
      console.error(err.message);
      setError(err.message);
      setLoading(false);
    }
  };

  const ValidateEmail = mail => {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  };

  const disabled = () => {
    if (email === "" || loading === true || !ValidateEmail(email)) {
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
            <Button
              color="violet"
              className={loading ? "loading" : null}
              fluid
              size="large"
              disabled={disabled()}
            >
              Get Reset Password Link
            </Button>
          </Segment>
        </Form>

        {error && <Message color="red">{error}</Message>}
        {msg && <Message color="green">{msg}</Message>}
        <Link to="/login">
          <small>Login Page</small>
        </Link>
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
export default connect(mapStateToProps)(ForgetPassword);
