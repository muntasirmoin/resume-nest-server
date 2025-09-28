import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { BlogRoutes } from "../modules/blog/blog.route";
import { ProjectRoutes } from "../modules/project/project.routes";
import { AboutRoutes } from "../modules/about/about.route";
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
  {
    path: "/project",
    route: ProjectRoutes,
  },
  {
    path: "/about",
    route: AboutRoutes,
  },
  //   {
  //     path: "/transaction",
  //     route: TransactionRoutes,
  //   },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
