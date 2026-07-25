import { google } from "googleapis"

// Personal OAuth2 (not a service account): the org's "secure by default" policy
// blocks service account key creation, so the app authenticates as the calendar
// owner directly via a long-lived refresh token. "primary" then refers to that
// owner's own calendar, with no calendar-sharing step required.
export function getCalendarAuth() {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET
  const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error(
      "Missing Google OAuth env vars: GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET, GOOGLE_OAUTH_REFRESH_TOKEN"
    )
  }

  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret)
  oauth2Client.setCredentials({ refresh_token: refreshToken })
  return oauth2Client
}

export const CALENDAR_ID = "primary"
