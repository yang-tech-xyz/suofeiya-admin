
import router from '../router/index'

export function isPermission(type) {
  const permission_routes = localStorage.getItem('permission_routes')

  return permission_routes.indexOf(type) == -1 ? 0 : 1
}
export function goTo(url) {
  router.push(url)
}

export function goBack(num) {
  router.go(num || -1)
}

