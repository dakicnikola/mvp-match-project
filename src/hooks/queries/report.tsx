import type {UseMutationOptions} from 'react-query'
import {useMutation} from 'react-query'
import {AxiosError} from 'axios'

import type {TPostReportFilterParams, TPostReportResponse} from '../../services/api/report'
import {postReportFilter} from '../../services/api/report'


function usePostReportFilter(
  options?: UseMutationOptions<TPostReportResponse,
    AxiosError,
    TPostReportFilterParams>,
) {
  return useMutation(postReportFilter, options)
}

export {usePostReportFilter}