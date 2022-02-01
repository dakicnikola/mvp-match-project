import type {UseMutationOptions} from 'react-query'
import {useMutation} from 'react-query'
import {AxiosError} from 'axios'

import type {TPostReportFilter, TPostReportResponse} from '../../services/api/report'
import {postReportFilter} from '../../services/api/report'


function usePostReportFilter(
  options?: UseMutationOptions<TPostReportResponse,
    AxiosError,
    TPostReportFilter>,
) {
  return useMutation(postReportFilter, {
    ...options,
  })
}

export {usePostReportFilter}