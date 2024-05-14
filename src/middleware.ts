import { AUTH_ROUTES, LIBRARY_ROUTES } from 'config/routes'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ROUTES_BY_ROLES } from 'shared/constants/routes-by-roles'
import { jwtDecode } from 'jwt-decode'
import { IJwtInfo } from 'shared/types/user'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value
  const { pathname } = request.nextUrl

  if (token) {
    const user = jwtDecode(token) as IJwtInfo
    if (user.exp < Date.now() / 1000) {
      return NextResponse.redirect(
        new URL(AUTH_ROUTES.SIGNIN_PAGE.path, request.url)
      )
    }

    if (pathname.startsWith(AUTH_ROUTES.SIGNIN_PAGE.path)) {
      return NextResponse.redirect(
        new URL(LIBRARY_ROUTES.ROOT.path, request.url)
      )
    }
    const rolesRouteMatch = user.roles.some((role) =>
      ROUTES_BY_ROLES[role].some((path) => path.startsWith(pathname))
    )
    if (!rolesRouteMatch) {
      return NextResponse.redirect(
        new URL(LIBRARY_ROUTES.ROOT.path, request.url)
      )
    }
    return NextResponse.next()
  }
  return NextResponse.redirect(
    new URL(AUTH_ROUTES.SIGNIN_PAGE.path, request.url)
  )
}

export const config = {
  matcher: ['/library'],
}
