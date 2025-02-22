import { redis } from '../redis/client';

interface AccessInviteLinkParams {
  subscriberId: string;
}

export async function accessInviteLink({
  subscriberId,
}: AccessInviteLinkParams) {
  //radis com lista, [] -> comandos começam com l
  //radis com hashes, {} -> comandos começam com h
  //radis com sorted sets, arrays ordenados por coluna [] -> comandos começam com z

  await redis.hincrby('referral:access-count', subscriberId, 1);
}
