import React from 'react';
import { Button, Result } from 'antd';

import { useNavigate } from "react-router-dom";

function CreateUserResult() {
  const navigate = useNavigate();

  const home = () => {
    navigate('/');
  }

  return (
    <Result
      status="success"
      title="Successfully Create New Account!"
      subTitle="Now you can login your account and enjoy our product!"
      extra={[
        <Button type="primary" key="console" onClick={home}>
          Okay!
        </Button>
      ]}
    />
  );
}

export default CreateUserResult;