import type {TProject, TProjectsResponse} from '../../services/api/projects'
import {getProjects} from '../../services/api/projects'
import type {UseQueryOptions, UseQueryResult} from 'react-query'
import {useQuery} from 'react-query'

const PROJECTS_QUERY_KEY: string = 'projects'

function useGetProjects(
  options?: UseQueryOptions<TProjectsResponse, undefined, TTransformedProjectsResponse, string>,
): UseQueryResult<TTransformedProjectsResponse> {
  return useQuery(PROJECTS_QUERY_KEY,
    getProjects,
    {
      ...options, select: data => ({
        ...data,
        projectsById: data.data.reduce((acc, project) => ({...acc, [project.projectId]: project}), {}),
      }),
    },
  )
}

type TTransformedProjectsResponse = TProjectsResponse & {
  projectsById: Record<string, TProject>
}

export {useGetProjects}
