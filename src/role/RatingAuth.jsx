import React from 'react';
import {useSelector} from "react-redux";
import {getRoleId} from "../reducks/user/selectors";
import {ROLE_MANAGER, ROLE_APP} from "../const/code";

// childrenは子要素 {Home}コンポーネントを指す
const RatingAuth = ({children}) => {
    const selector = useSelector((state) => state);
    const roleId = getRoleId(selector);

    const path = window.location.pathname;

    if (new RegExp("/users|/user/edit").test(path)) {
        if (roleId <= ROLE_MANAGER) {
            return children;
        }
    } else if (new RegExp("/notification/edit").test(path)) {
        if (roleId <= ROLE_APP) {
            return children;
        }
    }

    return (
        <section className="c-section-wrapping">
            <div>アクセス権限がありません</div>
            <div>ホームに戻る</div>
        </section>
    )
}

export default RatingAuth