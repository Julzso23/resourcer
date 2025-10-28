import { Models } from "@rematch/core";
import { auth } from "./auth";
import { planner } from "./planner";

export interface RootModel extends Models<RootModel> {
  auth: typeof auth,
  planner: typeof planner,
}

export const models: RootModel = { auth, planner }
