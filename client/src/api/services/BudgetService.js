import { request } from '../core/request';

export class BudgetService {
  /**
   * @returns any
   * @throws ApiError
   */
  static create({ requestBody }) {
    return request({
      method: 'POST',
      path: `/budget`,
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  static findAll() {
    return request({
      method: 'GET',
      path: `/budget`,
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  static findOne({ id }) {
    return request({
      method: 'GET',
      path: `/budget/${id}`,
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  static update({ id, requestBody }) {
    return request({
      method: 'PATCH',
      path: `/budget/${id}`,
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  static remove({ ids }) {
    return ids.length === 1
      ? request({
          method: 'DELETE',
          path: `/budget/${ids[0]}`,
        })
      : request({
          method: 'DELETE',
          path: `/budget`,
          body: { ids },
        });
  }
}
