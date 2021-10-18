import { Request, Response } from 'express';

export async function homeController(req: Request, res: Response) {
  res.send('Hello World !!!');
}
