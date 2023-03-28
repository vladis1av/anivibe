/* eslint-disable max-len */
import next from 'next';

import axios from 'axios';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';

import { MangaBase } from '../interfaces/manga';
import { MangaParams, MangaResponse } from '../interfaces/services';
import generateQuery from '../utils/generateQuery';

dotenv.config();

const port = process.env.PORT || 4000;
const isDev = process.env.NODE_ENV !== 'production';
const app = next({ dev: isDev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get('/manga/api', async (req: Request<{}, {}, {}, MangaParams>, res: Response) => {
    try {
      const { query } = req;
      const currentQuery = generateQuery(query);

      const result = await axios
        .get<MangaResponse<MangaBase[]>>(
        encodeURI(`${process.env.DESU_ME_API}?${currentQuery}`),
      );

      if (result) {
        return res.status(result.status).json(result.data);
      }

      throw new Error('Mangas Not found : 404');
    } catch (error) {
      console.log(error);
      return res.status(500).json(null);
    }
  });

  server.all('*', (req: Request, res: Response) => handle(req, res));

  server.listen(port, () => {
    console.log(`Ready on port:${port}`);
  });
}).catch((error) => {
  console.log('Error::', error);
});
