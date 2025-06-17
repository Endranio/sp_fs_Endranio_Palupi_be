import {Project} from "../generate/prisma"

export type CreateProjectDTO = Pick<Project,"name"|"description">