import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common'
import { ProjectsService } from './projects.service'
import { ProjectDto } from '../../../dtos/project.dto'
import { Project } from 'entities/project.entity'

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get(':id')
  async get(@Param('id') id: number): Promise<ProjectDto> {
    const project: Project | null = await this.projectsService.findOne(id)
    if (project == null) throw new NotFoundException()
    return new ProjectDto(project.id, project.name)
  }

  @Get()
  async getAll(
    @Query('searchValue') searchValue?: string,
  ): Promise<ProjectDto[]> {
    return (await this.projectsService.findWithSearch(searchValue)).map(
      (project) => new ProjectDto(project.id, project.name),
    )
  }
}
