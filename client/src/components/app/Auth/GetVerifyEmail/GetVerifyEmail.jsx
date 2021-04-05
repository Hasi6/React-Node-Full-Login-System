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
import { endPoint, config } from "../../../../config";
import axios from "axios";
import { Link } from "react-router-dom";

const GetVerifyEmail = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null);

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const body = {
      email
    };

    const res = await httpRequest(body);
    setLoading(false);
    if (res.msg === false) {
      setError("No User Found on this email");
      setEmailError(true);
    } else if (res.msg === "Already Verified") {
      setMsg("Already Verified");
    } else if (res.msg === true) {
      setMsg("Verify link sent to your email Please Check your Emails");
    }
  };

  const httpRequest = async body => {
    try {
      const res = await axios.post(`${endPoint}/api/sendToken`, body, config);
      console.log(res);
      return res.data;
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    }
  };

  const onChange = (value, name) => {
    name(value.target.value);
  };

  const disabled = () => {
    if (email === "" || loading === true || !ValidateEmail(email)) {
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
              fluid
              name="email"
              className={emailError ? "error" : null}
              icon="mail"
              iconPosition="left"
              placeholder="Email"
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

export default GetVerifyEmail;
