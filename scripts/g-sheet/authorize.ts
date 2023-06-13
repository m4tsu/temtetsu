/* eslint-disable @typescript-eslint/no-explicit-any */
import { promises } from 'fs'
import path from 'path'
import process from 'process'

import { authenticate } from '@google-cloud/local-auth'
import { google } from 'googleapis'

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json')
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json')

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await promises.readFile(TOKEN_PATH)
    const credentials = JSON.parse(content as unknown as string)
    return google.auth.fromJSON(credentials)
  } catch (err) {
    return null
  }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client: any) {
  const content = await promises.readFile(CREDENTIALS_PATH)
  const keys = JSON.parse(content as unknown as string)
  const key = keys.installed || keys.web
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  })
  await promises.writeFile(TOKEN_PATH, payload)
}

/**
 * Load or request or authorization to call APIs.
 *
 */
export async function authorize() {
  try {
    const jsonClient = await loadSavedCredentialsIfExist()
    if (jsonClient) {
      return jsonClient
    }
    const client = await authenticate({
      scopes: SCOPES,
      keyfilePath: CREDENTIALS_PATH,
    })
    if (client.credentials) {
      await saveCredentials(client)
    }
    return client
  } catch (e) {
    console.log('authorize error : ' + e)
    throw e
  }
}
