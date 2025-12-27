import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch, RootState } from "../store"
import { ProjectDto } from "../../../dtos/project.dto"
import { useParams } from "react-router-dom"
import { Loading } from "../components/common/Loading"

export function ProjectPage() {
  const { id } = useParams()

  const [loading, setLoading] = useState<boolean>(false)

  const dispatch = useDispatch<Dispatch>()
  useEffect(() => {
    setLoading(true)
    dispatch.projects.getProject({ projectId: id }).then(() => setLoading(false))
  }, [dispatch.projects, id])

  const project = useSelector<RootState, ProjectDto | undefined>(state => state.projects.projects.find(p => p.id === parseInt(id || '0')))

  return (
    loading ? (<Loading />) :
    (<div>
      { project == undefined ? <h1 className="text-center text-4xl">Project not found</h1> : (
        <>
          <div className="bg-gray-950 py-8 items-end px-[10%] relative">
            <img src="https://placehold.co/128x128" className="rounded-xl absolute -bottom-16" />
            <h1 className="text-4xl ml-40">{ project.name }</h1>
          </div>
          <div className="mx-[10%] px-40 py-8">
          </div>
        </>
      ) }
    </div>)
  )
}
