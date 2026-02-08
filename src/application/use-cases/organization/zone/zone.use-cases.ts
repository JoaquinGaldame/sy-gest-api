import { NotFoundError } from '../../../../domain/errors/domain-errors';
import { ZoneRepository } from '../../../ports/organization/zone.repository';

export class CreateZoneUseCase {
  constructor(private readonly zones: ZoneRepository) {}

  execute(input: { code: string; name: string }) {
    return this.zones.create(input);
  }
}

export class ListZonesUseCase {
  constructor(private readonly zones: ZoneRepository) {}

  execute() {
    return this.zones.list();
  }
}

export class GetZoneUseCase {
  constructor(private readonly zones: ZoneRepository) {}

  async execute(input: { id: number }) {
    const zone = await this.zones.findById(input.id);
    if (!zone) {
      throw new NotFoundError('Zone not found');
    }
    return zone;
  }
}

export class UpdateZoneUseCase {
  constructor(private readonly zones: ZoneRepository) {}

  async execute(input: { id: number; code: string; name: string }) {
    const zone = await this.zones.update(input.id, {
      code: input.code,
      name: input.name,
    });
    if (!zone) {
      throw new NotFoundError('Zone not found');
    }
    return zone;
  }
}

export class DeleteZoneUseCase {
  constructor(private readonly zones: ZoneRepository) {}

  async execute(input: { id: number }) {
    const ok = await this.zones.delete(input.id);
    if (!ok) {
      throw new NotFoundError('Zone not found');
    }
    return { ok: true };
  }
}
