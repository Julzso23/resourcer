import { Models } from "@rematch/core"
import { auth } from "./auth"
import { planner } from "./planner"
import { staff } from "./staff"

export interface RootModel extends Models<RootModel> {
  auth: typeof auth,
  planner: typeof planner,
  staff: typeof staff,
}

export const models: RootModel = { auth, planner, staff }
