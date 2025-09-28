import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { BlogRoutes } from "../modules/blog/blog.route";
// import { UserRoutes } from "../modules/user/user.route";

export const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/blog",
    route: BlogRoutes,
  },
  //   {
  //     path: "/wallet",
  //     route: WalletRoutes,
  //   },
  //   {
  //     path: "/agent",
  //     route: AgentRoutes,
  //   },
  //   {
  //     path: "/transaction",
  //     route: TransactionRoutes,
  //   },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
