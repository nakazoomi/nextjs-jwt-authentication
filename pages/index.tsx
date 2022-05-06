import { useState } from 'react';
import jwt from 'jsonwebtoken';

export default function Home(req, res) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [message, setMessage] = useState<string>('Please Login:');
  const [secret, setSecret] = useState<string>('');

  // SUBMIT FORM
  async function submitForm() {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password }),
    }).then((t) => t.json());

    const token = res.token;

    if(token) {
      const json = jwt.decode(token) as { [key: string]: string}

      console.log(json);
        setMessage(`Welcome ${json.username}! (${json.admin ? 'Admin' : 'No Admin'})`
        );

        // SECRET TOKEN
        const res = await fetch('/api/secret', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token }),
        }).then((t) => t.json());

        if (res.secretAdminCode) {
            setSecret(res.secretAdminCode);

        } else {
            setSecret('No secret code available');
        }

    } else {
      setMessage('Invalid credentials - Something went wrong here!');
    }
  }

  return (
    <>
    <div className="login-form__container">
      <div className="login-form__wrapper">
        <h3>{message}</h3>
        <p>Secret: {secret}</p>
        <form className="login-form">
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-form__input"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-form__input"
          />

          <input type="button" value="Login" onClick={submitForm} className="login-form__btn"/>
        </form>
      </div>
    </div>
    </>
  );
}
