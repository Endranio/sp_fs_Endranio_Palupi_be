import {Project,Task,User} from "../generate/prisma"

export type CreateProjectDTO = Pick<Project,"name"|"description">
export type CreateTaskDTO = Pick<Task,"title"|"description"|"assignedId">
export type RegisterDTO = Pick<User,"email"|"username"|"password">
export type LoginDTO = Pick<User,"email"|"password">
