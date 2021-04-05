import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { endPoint } from "../../../../config";
import { Loader, Message } from "semantic-ui-react";

const Verify = () => {
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null);
  const [verify, setVerify] = useState(null);

  const { token } = useParams();

  useEffect(() => {
    verifyAccount();
  }, []);

  const verifyAccount = async () => {
    try {
      const res = await axios.get(`${endPoint}/api/verifyAccount/${token}`);
      console.log(res);
      const { data } = res;
      if (data) {
        setVerify(true);
        setMsg("Your Account has been verified");
      } else {
        setVerify(false);
        setError("Expired link or invalid link");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      {verify === null && <Loader active inline="centered" />}
      {verify && <Message color="greed">{msg}</Message>}
      {verify === false && <Message color="red">{error}</Message>}
    </div>
  );
};

export default Verify;
