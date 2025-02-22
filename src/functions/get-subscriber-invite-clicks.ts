import { redis } from '../redis/client';

interface GetSubscriberInviteClicksParams {
  subscriberId: string;
}

export async function getSubscriberInviteClicks({
  subscriberId,
}: GetSubscriberInviteClicksParams) {
  //radis com lista, [] -> comandos começam com l
  //radis com hashes, {} -> comandos começam com h
  //radis com sorted sets, arrays ordenados por coluna [] -> comandos começam com z

  const count = await redis.hget('referral:access-count', subscriberId);

  return { count: count ? Number.parseInt(count) : 0 };
}
