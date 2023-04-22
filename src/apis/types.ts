/**
 * @Author linzeguang
 * @Date 2023-03-24 10:56:36
 * @LastEditTime 2023-04-07 15:41:04
 * @LastEditors linzeguang
 * @Description
 */

export type IPromise<D = unknown> = {
  state: number;
  msg: string;
} & D;

export type IList<T> = {
  list: T[];
};
