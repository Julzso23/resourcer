import { Models } from "@rematch/core"
import { auth } from "./auth"
import { planner } from "./planner"
import { staff } from "./staff"
import { projects } from "./projects"
import { users } from "./users"

export interface RootModel extends Models<RootModel> {
  auth: typeof auth,
  planner: typeof planner,
  staff: typeof staff,
  projects: typeof projects,
  users: typeof users,
}

export const models: RootModel = { auth, planner, staff, projects, users }
