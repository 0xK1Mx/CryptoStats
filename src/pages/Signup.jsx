import React from "react";
import Form from "../components/Form";
function Signup({ setUser, isLoading, setIsLoading }) {
  return (
    <Form setUser={setUser} isLoading={isLoading} setIsLoading={setIsLoading} />
  );
}

export default Signup;
