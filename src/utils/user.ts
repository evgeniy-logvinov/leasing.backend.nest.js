import { Request } from 'express';

export const getUserIdFromReq = (req: Request) => {
  const user = req['user'];
  const userId = (user as { id: string }).id;
  if (!userId) {
    throw new Error(`Can't get user id`);
  }

  return userId;
};
