import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

const KEY = 'lalala'

export default function (req: NextApiRequest, res: NextApiResponse) {

  if(!req.body) {
    res.statusCode = 404
    res.end('Error')
    return
  }

  const { username, password } = req.body;
  console.log(req.body);

  res.json({
    token: jwt.sign({
      username,
      admin: username === 'admin' && password === 'admin'
      }, KEY
      )
   });
}