import cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import nc from 'next-connect';

export default nc<NextApiRequest, NextApiResponse>()
  .use(cors())
  .get(async (req, res) => {
    const session = await getSession({ req });
    const response = await fetch(`${process.env.API_URL}/events/${req.query.id}/`, {
      method: 'GET',
      headers: {
        Authorization: (session?.accessToken as string) ?? '',
      },
    }).then((data) => data.json());
    res.json(response);
  })
  .delete(async (req, res) => {
    const session = await getSession({ req });
    const response = await fetch(`${process.env.API_URL}/events/${req.query.id}/`, {
      method: 'DELETE',
      headers: {
        Authorization: (session?.accessToken as string) ?? '',
      },
    }).then((data) => data.json());
    res.json(response);
  })
  .patch(async (req, res) => {
    const session = await getSession({ req });
    const response = await fetch(`${process.env.API_URL}/events/${req.query.id}/`, {
      method: 'PATCH',
      headers: {
        Authorization: (session?.accessToken as string) ?? '',
      },
      body: req.body,
    }).then((data) => data.json());
    res.json(response);
  });
