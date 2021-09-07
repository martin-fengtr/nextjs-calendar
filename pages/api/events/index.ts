import cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import nc from 'next-connect';

export default nc<NextApiRequest, NextApiResponse>()
  .use(cors())
  .get(async (req, res) => {
    const session = await getSession({ req });
    const response = await fetch(`${process.env.API_URL}/events/`, {
      method: 'GET',
      headers: {
        Authorization: (session?.accessToken as string) ?? '',
      },
    }).then((data) => data.json());
    res.json(response);
  })
  .post(async (req, res) => {
    const session = await getSession({ req });
    const response = await fetch(`${process.env.API_URL}/events/`, {
      method: 'POST',
      headers: {
        Authorization: (session?.accessToken as string) ?? '',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: req.body,
    }).then((data) => data.json());
    res.json(response);
  });
