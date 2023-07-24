import store from "store"
import { IUser } from "./types";
import { addUser, logOut } from "./userSlice";

const user: IUser = 
    {
        id: 1,
        username: 'j@f.com',
        status: 'active'        
    }

describe('RecordsSlice Test', () => {
    it('should have an inital state with empty records', () => {
        expect(store.getState().user.username).toBe("");
    })

    it ('should add user', () => {
        store.dispatch(addUser(user));
        const state = store.getState().user;
        expect(state.username).toBe(user.username);
    })
    it ('should remove user on logout action dispatch', () => {
        store.dispatch(addUser(user));

        store.dispatch(logOut());

        const state = store.getState().user;
        expect(state.username).toBe("");
        expect(state.auth.isAuthenticated).toBe(false);
    })
})