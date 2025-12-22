import { createModel } from "@rematch/core"
import { RootModel } from "."
import { Api } from "../api"
import { ProjectDto } from "../../../dtos/project.dto"

interface ProjectsState {
  projects: ProjectDto[]
}

export const projects = createModel<RootModel>()({
  state: {
    projects: []
  } as ProjectsState,
  reducers: {
    setProjects(state, projects: ProjectDto[]) {
      return { ...state, projects }
    }
  },
  effects: (dispatch) => ({
    handleError({ error }) {
      if (error === 401) {
        dispatch.auth.logout()
      }
    },

    async getProjects({ searchValue }, rootState) {
      try {
        this.setProjects(await Api.get<ProjectDto[]>('projects', { searchValue }, rootState.auth.token || undefined))
      } catch (error) {
        this.handleError({ error })
      }
    },
  }),
})
