import {Project,Task} from "../generate/prisma"

export type CreateProjectDTO = Pick<Project,"name"|"description">
export type CreateTaskDTO = Pick<Task,"title"|"description"|"assignedId">
