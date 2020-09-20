const initialState = {
    user: {
        isSignedIn: false,
        userId: "",
        userName: "",
        mailAddress: "",
        roleId: "",
        sectionId: "",
        sectionName: "",
        image: ""
    },
    users: {
        list: []
    },
    notifications: {
        list: []
    },
    loading: {
        state: false,
        text: ""
    },
    error: {
        errorType: "",
        args: [],
        returnValue: ""
    }
};

export default initialState