export interface IErrorResponse extends Error {
  data: IErrorMessage;
  status: string;
}

export interface IErrorMessage {
  errorMessage?: string;
}
