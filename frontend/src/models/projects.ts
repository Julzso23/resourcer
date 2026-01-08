import { createModel } from '@rematch/core'
import { RootModel } from '.'
import { Api } from '../api'
import { ProjectDto } from '../../../dtos/project.dto'

interface ProjectsState {
  projects: ProjectDto[]
}

export const projects = createModel<RootModel>()({
  state: {
    projects: [],
  } as ProjectsState,
  reducers: {
    setProjects(state, projects: ProjectDto[]) {
      return { ...state, projects }
    },
    removeProject(state, projectId: number) {
      return {
        ...state,
        projects: state.projects.filter((project) => project.id !== projectId),
      }
    },
    addProject(state, project: ProjectDto) {
      return { ...state, projects: [...state.projects, project] }
    },
  },
  effects: (dispatch) => ({
    handleError({ error }) {
      if (error === 401) {
        dispatch.auth.logout()
      }
    },

    async getProjects({ searchValue }, rootState) {
      try {
        this.setProjects(
          await Api.get<ProjectDto[]>(
            'projects',
            { searchValue },
            rootState.auth.token || undefined,
          ),
        )
      } catch (error) {
        this.handleError({ error })
      }
    },

    async getProject({ projectId }, rootState) {
      try {
        this.removeProject(projectId)
        this.addProject(
          await Api.get<ProjectDto>(
            `projects/${projectId}`,
            {},
            rootState.auth.token || undefined,
          ),
        )
      } catch (error) {
        this.handleError({ error })
      }
    },
  }),
})
