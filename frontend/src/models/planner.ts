import { createModel, RematchDispatch } from "@rematch/core";
import { RootModel } from ".";
import { AllocationCollectionDto } from '../../../dtos/allocationCollection.dto'
import { Api } from "../api";
import { ProposalAllocationsDto } from '../../../dtos/proposalAllocations.dto'

interface PlannerState {
  allocationCollections: AllocationCollectionDto[]
}

export const planner = createModel<RootModel>()({
  state: {
    allocationCollections: []
  } as PlannerState,
  reducers: {
    setAllocationCollections(state: PlannerState, payload: AllocationCollectionDto[]) {
      return {
        ...state,
        allocationCollections: payload
      }
    }
  },
  effects: (dispatch: RematchDispatch<RootModel>) => ({
    async getAllocationCollections({ projectView, withProposal }: {
      projectView: boolean,
      withProposal?: number,
    }, rootState) {
      const proposalAllocations = await Api.get<ProposalAllocationsDto>('proposals/master', {
        ...(projectView && { projectView: 'true' }),
        ...(withProposal && { withProposal: withProposal.toString() }),
      }, rootState.auth.token)
      dispatch.planner.setAllocationCollections(proposalAllocations.collections)
    }
  }),
})
