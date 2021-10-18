import * as express from 'express'

declare module 'express' {
  export interface ResponseError extends Error {
    status?: number;
  }
}