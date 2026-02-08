import { NotFoundError } from '../../../../domain/errors/domain-errors';
import { JobTitleRepository } from '../../../ports/catalogs/job-titles.repository';

export class CreateJobTitleUseCase {
  constructor(private readonly jobTitles: JobTitleRepository) {}

  execute(input: Parameters<JobTitleRepository['create']>[0]) {
    return this.jobTitles.create(input);
  }
}

export class ListJobTitlesUseCase {
  constructor(private readonly jobTitles: JobTitleRepository) {}

  execute() {
    return this.jobTitles.list();
  }
}

export class GetJobTitleUseCase {
  constructor(private readonly jobTitles: JobTitleRepository) {}

  async execute(input: { id: number }) {
    const jobTitle = await this.jobTitles.findById(input.id);
    if (!jobTitle) {
      throw new NotFoundError('Job title not found');
    }
    return jobTitle;
  }
}

export class UpdateJobTitleUseCase {
  constructor(private readonly jobTitles: JobTitleRepository) {}

  async execute(
    input: { id: number } & Parameters<JobTitleRepository['update']>[1],
  ) {
    const jobTitle = await this.jobTitles.update(input.id, input);
    if (!jobTitle) {
      throw new NotFoundError('Job title not found');
    }
    return jobTitle;
  }
}

export class DeleteJobTitleUseCase {
  constructor(private readonly jobTitles: JobTitleRepository) {}

  async execute(input: { id: number }) {
    const ok = await this.jobTitles.delete(input.id);
    if (!ok) {
      throw new NotFoundError('Job title not found');
    }
    return { ok: true };
  }
}
