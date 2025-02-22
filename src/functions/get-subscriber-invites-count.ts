import { redis } from '../redis/client';

interface GetSubscriberInvitesCountParams {
  subscriberId: string;
}

export async function getSubscriberInvitesCount({
  subscriberId,
}: GetSubscriberInvitesCountParams) {
  //radis com lista, [] -> comandos começam com l
  //radis com hashes, {} -> comandos começam com h
  //radis com sorted sets, arrays ordenados por coluna [] -> comandos começam com z

  const count = await redis.zscore('referral:ranking', subscriberId);

  return { count: count ? Number.parseInt(count) : 0 };
}
