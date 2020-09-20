export const ERROR = "ERROR";
export const errorAction = (error) => {
    return {
        type: "ERROR",
        payload: {
            errorType: error.errorType,
            args: error.args,
            returnValue: error.returnValue
        }
    }
}