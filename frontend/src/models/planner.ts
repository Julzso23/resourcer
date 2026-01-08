import { createModel } from '@rematch/core'
import { RootModel } from '.'
import { AllocationCollectionDto } from '../../../dtos/allocationCollection.dto'
import { Api } from '../api'
import { ProposalAllocationsDto } from '../../../dtos/proposalAllocations.dto'
import { AllocationDto } from '../../../dtos/allocation.dto'
import { CreateAllocationDto } from '../../../dtos/createAllocation.dto'

interface PlannerState {
  projectView: boolean
  allocationCollections: AllocationCollectionDto[]
  currentProposal: number | undefined
}

export const planner = createModel<RootModel>()({
  state: {
    projectView: false,
    allocationCollections: [],
    currentProposal: 1,
  } as PlannerState,

  reducers: {
    setAllocationCollections(
      state: PlannerState,
      payload: AllocationCollectionDto[],
    ): PlannerState {
      return {
        ...state,
        allocationCollections: payload,
      }
    },

    addAllocation(state: PlannerState, payload: AllocationDto): PlannerState {
      return {
        ...state,
        allocationCollections: state.allocationCollections.map((collection) =>
          collection.id ===
          (state.projectView ? payload.projectId : payload.staffMemberId)
            ? {
                ...collection,
                allocations: [...collection.allocations, payload],
              }
            : collection,
        ),
      }
    },

    removeAllocation(
      state: PlannerState,
      payload: AllocationDto,
    ): PlannerState {
      return {
        ...state,
        allocationCollections: state.allocationCollections.map(
          (collection) => ({
            ...collection,
            allocations: collection.allocations.filter(
              (allocation) => allocation.id !== payload.id,
            ),
          }),
        ),
      }
    },
  },

  effects: (dispatch) => ({
    handleError({ error }) {
      if (error === 401) {
        dispatch.auth.logout()
      }
    },

    async getAllocationCollections(
      {
        projectView,
      }: {
        projectView: boolean
      },
      rootState,
    ) {
      try {
        const proposalAllocations = await Api.get<ProposalAllocationsDto>(
          'proposals/master',
          {
            ...(projectView && { projectView: 'true' }),
            ...(rootState.planner.currentProposal && {
              withProposal: rootState.planner.currentProposal.toString(),
            }),
          },
          rootState.auth.token || undefined,
        )
        this.setAllocationCollections(proposalAllocations.collections)
      } catch (error) {
        this.handleError({ error })
      }
    },

    async createAllocation(
      {
        allocation,
      }: {
        allocation: CreateAllocationDto
      },
      rootState,
    ) {
      try {
        const newAllocation = await Api.post<AllocationDto>(
          'allocations',
          allocation,
          rootState.auth.token || undefined,
        )
        this.addAllocation(newAllocation)
      } catch (error) {
        this.handleError({ error })
      }
    },

    async editAllocation(
      {
        oldAllocation,
        newAllocation,
      }: {
        oldAllocation: AllocationDto
        newAllocation: CreateAllocationDto
      },
      rootState,
    ) {
      try {
        const allocation = await Api.put<AllocationDto>(
          `allocations/${oldAllocation.id}`,
          newAllocation,
          rootState.auth.token || undefined,
        )
        this.removeAllocation(oldAllocation)
        this.addAllocation(allocation)
      } catch (error) {
        this.handleError({ error })
      }
    },
  }),
})
