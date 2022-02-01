import type {UseQueryOptions, UseQueryResult} from 'react-query'
import {useQuery} from 'react-query'
import type {TGatewaysResponse} from '../../services/api/gateways'
import {getGateways} from '../../services/api/gateways'

const GATEWAYS_QUERY_KEY: string = 'gateways'

function useGetGateways(
  options?: UseQueryOptions<TGatewaysResponse, undefined, TGatewaysResponse, string>,
): UseQueryResult<TGatewaysResponse> {
  return useQuery(GATEWAYS_QUERY_KEY,
    getGateways,
    options,
  )
}

export {useGetGateways}
