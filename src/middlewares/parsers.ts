import { Router } from 'express';
import express from 'express';

const parserRouter = Router();

parserRouter.use(express.json());
parserRouter.use(
  express.urlencoded({
    extended: false,
  }),
);

export { parserRouter };
