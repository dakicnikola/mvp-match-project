import type {TProjectsResponse} from '../../services/api/projects'
import {getProjects} from '../../services/api/projects'
import type {UseQueryOptions, UseQueryResult} from 'react-query'
import {useQuery} from 'react-query'

const PROJECTS_QUERY_KEY: string = 'projects'

function useGetProjects(
  options?: UseQueryOptions<TProjectsResponse, undefined, TProjectsResponse, string>,
): UseQueryResult<TProjectsResponse> {
  return useQuery(PROJECTS_QUERY_KEY,
    getProjects,
    options,
  )
}

export {useGetProjects}
