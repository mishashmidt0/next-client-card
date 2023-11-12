import { type Server, type Member, type Profile } from "@prisma/client";

export type ServerWithMembersWithProfiles = Server & {
  members: Array<Member & { profile: Profile }>;
};
