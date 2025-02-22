import { redis } from '../redis/client';

interface GetSubscriberRankingPositionParams {
  subscriberId: string;
}

export async function getSubscriberRankingPosition({
  subscriberId,
}: GetSubscriberRankingPositionParams) {
  //radis com lista, [] -> comandos começam com l
  //radis com hashes, {} -> comandos começam com h
  //radis com sorted sets, arrays ordenados por coluna [] -> comandos começam com z

  const rank = await redis.zrevrank('referral:ranking', subscriberId);

  if (rank === null) {
    return { position: null };
  }

  return { position: rank + 1 };
}
