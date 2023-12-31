import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
          await axios
            .post(`${server}/user/activation`, {
              activation_token,
            })
            .then((response) => {
              console.log(response);
            }).catch((error) => {
              console.log(error.response.data.message);
              setError(true);
            })
      };
      activationEmail();
    }
  }, [activation_token]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <p>Your token is Expired</p>
      ) : (
        <p>Your account is created successfully. Please login!!</p>
      )}
    </div>
  );
};

export default ActivationPage;
