import { Controller, Get, Query } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectDto } from '../../../dtos/project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  async getAll(@Query('searchValue') searchValue?: string): Promise<ProjectDto[]> {
    return (await this.projectsService.findWithSearch(searchValue)).map(project => new ProjectDto(project.id, project.name));
  }
}
