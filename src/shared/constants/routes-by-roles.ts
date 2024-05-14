import { LIBRARY_ROUTES } from 'config/routes'
import { APP_ROLES } from './constants'

export const ROUTES_BY_ROLES = {
  [APP_ROLES.ADMIN]: [LIBRARY_ROUTES.ADMIN_PANEL.path],
  [APP_ROLES.USER]: [LIBRARY_ROUTES.LIBRARY.path, LIBRARY_ROUTES.ROOT.path],
}
