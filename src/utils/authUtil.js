import { getLoggedInUserSession, clearSession } from "../services/storageServices"

export function getStoredSession() {
  const localSession = getLoggedInUserSession()
  return localSession ? localSession : null
}

export function isAuthenticated() {
  const session = getStoredSession()
  return session?.isLoggedIn === true
}

export function clearSessionOnLogout() {
    clearSession()
}

