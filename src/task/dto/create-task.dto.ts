import { IsDate, IsEnum, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

export enum TaskStatusEnum {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}

export class CreateTaskDto {
    @IsUUID()
    @IsOptional()
    id: string;
    @IsString()
    @MinLength(3)
    @MaxLength(256)
    title: string;
    @IsString()
    @MinLength(5)
    @MaxLength(512)
    description: string;
    @IsEnum(TaskStatusEnum)
    @IsOptional()
    status: string;
    @IsDate()
    expirationDate: Date;
}
