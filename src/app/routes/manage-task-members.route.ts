import { manageTaskMembersResolver } from "../resolvers/manage-task-members/manage-task-members.resolver";
import { RoutesEnum } from "./routes.enum";
import { Route } from "@angular/router";

export const ManageTaskMembersRoute: Route = {
  title: 'Manage Task Members',
  path: RoutesEnum.ManageTaskMembers,
  resolve: {
    manageTaskMembers: manageTaskMembersResolver
  },
  loadComponent: () => import('../pages/manage-task-members/manage-task-members.component').then(m => m.ManageTaskMembersComponent)
};