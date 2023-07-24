import { IOperationState } from "./features/operation/types";
import { IRecordState } from "./features/record/types";
import { IUserState } from "./features/user/types";

export interface IAppState {
  user: IUserState,
  record: IRecordState,
  operation: IOperationState
}


