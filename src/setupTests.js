// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { OperationType } from 'constants/operation.constant';
import { fetch, Headers, Request, Response } from 'cross-fetch'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

global.fetch = fetch
global.Headers = Headers
global.Request = Request
global.Response = Response

export const handlers = [
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/operations`, (_req, res, ctx) => {
    return res(ctx.json([
        {
            type: OperationType.ADDITION,
            cost: 10
        }
    ]))
  }),
]

export const server = setupServer(...handlers)

// Enable the API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable the API mocking after the tests finished.
afterAll(() => server.close())
