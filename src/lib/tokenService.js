import awsmobile from '../aws-exports';
import oAuthOptions from './oAuthOptions';

export const fetchToken = async (auth_code) => {
  var oData = new URLSearchParams();
  oData.append('grant_type', 'authorization_code');
  oData.append('client_id', awsmobile.aws_user_pools_web_client_id);
  oData.append('code', auth_code);
  oData.append('redirect_uri', 'https://localhost:3000/signin')

// https://test-pool-gjoel.auth.ap-southeast-2.amazoncognito.com/login?redirect_uri=https://localhost:3000/signin&response_type=code&client_id=4lrq5q5l2kde65sb3b87guhqp8
  const response = await fetch(`https://${oAuthOptions.domain}/oauth2/token`, {
    method: 'POST', // may need to change this to POST
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: oData,
    //'credentials': 'include'
  })
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.message)
  }
  return body;
}
