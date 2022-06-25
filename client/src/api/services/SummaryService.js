import { request } from '../core/request';

export class SummaryService {
  /**
   * @returns any
   * @throws ApiError
   */
  static findAll() {
    return request({
      method: 'GET',
      path: `/summary`,
    });
  }
}
