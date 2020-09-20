import React from 'react';
import {Route, Switch} from "react-router";
import {
    NotificationList, UserList, UserEdit, SignIn, Reset,
    NotificationEdit
} from "./templates";
import {UserAuth, RatingAuth} from "./role";

const Router = () => {

    return(
        <Switch>
            <Route exact path={"/signin"} component={SignIn} />
            <Route exact path={"/signin/reset"} component={Reset} />
            <UserAuth>
                <Switch>
                    <Route exact path={"/"} component={NotificationList} />
                    <Route exact path={"/notifications/:id"} component={NotificationEdit} />
                    <RatingAuth>
                        <Switch>
                            <Route path={"/notification/edit(/:id)?"} component={NotificationEdit} />
                            <Route exact path={"/users"} component={UserList} />
                            <Route path={"/user/edit(/:id)?"} component={UserEdit} />
                        </Switch>
                    </RatingAuth>
                </Switch>
            </UserAuth>
        </Switch>
    )
};
export default Router