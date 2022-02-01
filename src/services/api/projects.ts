import client from '../api-client'

const PROJECTS_URL = 'projects'

async function getProjects(): Promise<TProjectsResponse> {
  const response = await client.get<TProjectsResponse>(PROJECTS_URL)
  return response.data
}

type TProjectsResponse = {
  data: TProject[],
  code: string,
  error: null | string
}

type TProject = {
  projectId: string,
  userIds: string[]
  rule: string,
  gatewayIds: string[]
  structure: string,
  industry: string,
  website: string,
  description: string
  image: string,
  name: string
}

export type {TProjectsResponse}
export {getProjects}