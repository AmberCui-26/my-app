import { useRouter } from "next/router";

export type Role = "student" | "teacher" | "manager";

export const userRole = () => {
  const router = useRouter();
  const path = router.pathname.split("/");
  return path[2] as Role;
};
