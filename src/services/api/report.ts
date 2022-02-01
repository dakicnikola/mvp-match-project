import client from '../api-client'

const REPORT_URL = 'report'

async function postReportFilter(
  params: TPostReportFilterParams,
): Promise<TPostReportResponse> {
  const response = await client.post<TPostReportResponse>(REPORT_URL, params)
  return response.data
}


type TPostReportResponse = TPayments[]

type TPayments = any

type TPostReportFilterParams = {
  from?: string,
  to?: string,
  projectId?: string,
  gatewayId?: string
}

export type {TPostReportResponse, TPostReportFilterParams}
export {postReportFilter}