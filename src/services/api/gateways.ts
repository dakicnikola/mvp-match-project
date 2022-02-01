import client from '../api-client'

const GATEWAYS_URL = 'gateways'

async function getGateways(): Promise<TGatewaysResponse> {
  const response = await client.get<TGatewaysResponse>(GATEWAYS_URL)
  return response.data
}

type TGatewaysResponse = TGateway[]

type TGateway = {
  'gatewayId': string,
  'userIds': string[]
  'name': string,
  'type': string,
  'apiKey': string,
  'secondaryApiKey': string,
  'description': string,
}

export type {TGatewaysResponse}
export {getGateways}