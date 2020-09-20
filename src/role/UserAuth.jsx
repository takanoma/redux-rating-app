import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getIsSignedIn} from "../reducks/user/selectors";
import {listenAuthState} from "../reducks/user/operations";

// childrenは子要素 {Home}コンポーネントを指す
const UserAuth = ({children}) => {
    const dispatch  = useDispatch();
    const selector = useSelector((state) => state);
    const isSignedIn = getIsSignedIn(selector);

    // レンダー後に1度だけ呼ばれる
    useEffect(() => {
        if (!isSignedIn) {
            dispatch(listenAuthState());
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (!isSignedIn) {
        return <></>
    } else {
        return children
    }
}

export default UserAuth