import { Ability, AbilityBuilder } from '@casl/ability'

import { APP_ROLES } from 'shared/constants/constants'
import { IUser } from 'shared/types/user'

export enum RouteGuardActions {
  create = 'create',
  read = 'read',
  update = 'update',
  delete = 'delete',
  manage = 'manage',
}

export enum RouteGuardEntities {
  Admin = 'Admin',
  User = 'User',
}

type Action = RouteGuardActions
type Subject = RouteGuardEntities
export type AppAbility = Ability<[Action, Subject]>
export default function defineAbilityFor(user?: IUser | null) {
  const { can, build } = new AbilityBuilder<AppAbility>(Ability)

  if (user?.roles?.includes(APP_ROLES.ADMIN)) {
    can(RouteGuardActions.manage, RouteGuardEntities.Admin)
  }
  if (user?.roles?.includes(APP_ROLES.USER)) {
    can(RouteGuardActions.manage, RouteGuardEntities.User)
  }

  return build()
}
