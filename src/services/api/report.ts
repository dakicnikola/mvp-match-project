import client from '../api-client'

const REPORT_URL = 'report'

async function postReportFilter(
  params: TPostReportFilter,
): Promise<TPostReportResponse> {
  const response = await client.post<TPostReportResponse>(REPORT_URL, params)
  return response.data
}


type TPostReportResponse = {
  data: TPayment[]
  code: string,
  error: string | null
}

type TPayment = {
  amount: number
  created: string
  gatewayId: string
  modified: string
  paymentId: string
  projectId: string
  userIds: string[]
}

type TPostReportFilter = {
  from?: string,
  to?: string,
  projectId?: string,
  gatewayId?: string
}

export type {TPostReportResponse, TPostReportFilter}
export {postReportFilter}