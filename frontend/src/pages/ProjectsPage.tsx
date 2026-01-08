import { useDispatch, useSelector } from 'react-redux'
import { Dispatch, RootState } from '../store'
import { useEffect, useState } from 'react'
import { ProjectDto } from '../../../dtos/project.dto'
import { StaffMemberCard } from '../components/staff/StaffMemberCard'
import { TextInput } from '../components/common/TextInput'
import { useDebounce } from 'use-debounce'
import { Loading } from '../components/common/Loading'

export function ProjectsPage() {
  const [_searchValue, setSearchValue] = useState<string>('')
  const [searchValue] = useDebounce(_searchValue, 500)

  const [loading, setLoading] = useState<boolean>(false)

  const dispatch = useDispatch<Dispatch>()
  useEffect(() => {
    setLoading(true)
    dispatch.projects.getProjects({ searchValue }).then(() => setLoading(false))
  }, [searchValue, dispatch.projects])

  const projects = useSelector<RootState, ProjectDto[]>(
    (state) => state.projects.projects,
  )

  return (
    <div className="p-4 flex flex-col gap-4">
      <TextInput
        type="text"
        placeholder="Search"
        value={_searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {loading ? (
        <Loading />
      ) : (
        <div className="grid xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2">
          {projects.map((project) => (
            <StaffMemberCard
              key={project.id}
              name={project.name}
              link={`/projects/${project.id}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
