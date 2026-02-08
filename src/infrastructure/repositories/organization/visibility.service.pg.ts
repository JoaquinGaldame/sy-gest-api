import {
  VisibilityService,
  VisibilityScope,
} from '../../../application/ports/organization/visibility.service';
import { DbClient } from '../../db/db.client';
import { getWarehouseVisibilityScope } from './warehouse-visibility.helper';

export class VisibilityServicePg implements VisibilityService {
  constructor(private readonly db: DbClient) {}

  getWarehouseVisibility(user_id: string): Promise<VisibilityScope> {
    return getWarehouseVisibilityScope(this.db, user_id);
  }
}
