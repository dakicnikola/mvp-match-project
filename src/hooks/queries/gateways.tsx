import type {UseQueryOptions, UseQueryResult} from 'react-query'
import {useQuery} from 'react-query'
import type {TGateway, TGatewaysResponse} from '../../services/api/gateways'
import {getGateways} from '../../services/api/gateways'

const GATEWAYS_QUERY_KEY: string = 'gateways'

function useGetGateways(
  options?: UseQueryOptions<TGatewaysResponse, undefined, TTransformedGatewaysResponse, string>,
): UseQueryResult<TTransformedGatewaysResponse> {
  return useQuery(GATEWAYS_QUERY_KEY,
    getGateways,
    {
      ...options, select: data => ({
        ...data,
        gatewaysById: data.data.reduce((acc, gateway) => ({...acc, [gateway.gatewayId]: gateway}), {}),
      }),
    },
  )
}

type TTransformedGatewaysResponse = TGatewaysResponse & {
  gatewaysById: Record<string, TGateway>
}

export {useGetGateways}
