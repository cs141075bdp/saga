import axios, { AxiosResponse } from 'axios'

declare module 'axios-demo' {
  export interface Promise<V> {
    then<R1, R2>(onFulfilled: (value: V) => R1 | Promise<R1>, onRejected: (error: any) => R2 | Promise<R2>): Promise<R1 | R2>;
    then<R>(onFulfilled: (value: V) => R | Promise<R>): Promise<R>;
    catch<R>(onRejected: (error: any) => R | Promise<R>): Promise<R>;
    finally<R>(onRejected: (error: any) => R | Promise<R>): Promise<R>;
  }

  export interface AxiosPromise extends Promise<AxiosResponse> {
  }
}
