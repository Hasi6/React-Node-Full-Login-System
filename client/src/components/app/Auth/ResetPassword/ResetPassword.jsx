import React, { useState } from "react";
import {
  Grid,
  Header,
  Icon,
  Form,
  Segment,
  Message,
  Button
} from "semantic-ui-react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { endPoint, config } from "../../../../config";

const ResetPassword = () => {
  //   if (auth) {
  //     history.push("/");
  //   }
  const { token } = useParams();

  // DECLARE STATE VARIABLES
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null);

  // ONCHANGE FUNCTION
  const onChange = (value, name) => {
    name(value.target.value);
  };

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const body = {
      token,
      password
    };

    const res = await httpRequest(body);
    setLoading(false);
    if (res) {
      setMsg("Your Password is Reset Successfully");
    } else if (!res) {
      setError("Link is Expired or Invalid");
    }
  };

  const httpRequest = async body => {
    try {
      const res = await axios.post(
        `${endPoint}/api/resetPassword`,
        body,
        config
      );
      return res.data;
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    }
  };

  const disabled = () => {
    if (password === "" || loading === true) {
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
              fluid
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="New Password"
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
          <Link to="/login">Login Here</Link>
        </Message>
        {error && <Message color="red">{error}</Message>}
        {msg && <Message color="green">{msg}</Message>}
      </Grid.Column>
    </Grid>
  );
};

export default ResetPassword;
