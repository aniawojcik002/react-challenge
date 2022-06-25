import { request } from '../core/request';

export class CategoryService {
  /**
   * @returns any
   * @throws ApiError
   */
  static create({ requestBody }) {
    return request({
      method: 'POST',
      path: `/category`,
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  static findAll(unlinkedToBudget) {
    return request({
      method: 'GET',
      path: `/category`,
      query: {
        ...(unlinkedToBudget ? { unlinkedToBudget: true } : {}),
      },
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  static findOne({ id }) {
    return request({
      method: 'GET',
      path: `/category/${id}`,
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  static update({ id, requestBody }) {
    return request({
      method: 'PATCH',
      path: `/category/${id}`,
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  static remove({ ids }) {
    if (ids.length > 1) {
      return request({
        method: 'DELETE',
        path: `/category`,
        body: { ids },
      });
    } else {
      return request({
        method: 'DELETE',
        path: `/category/${ids[0]}`,
      });
    }
  }
}
