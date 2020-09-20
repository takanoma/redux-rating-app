export const config = () => {
    if (process.env.NODE_ENV === 'production') {
        return {
            common: {
                mailApiKey: process.env.REACT_APP_PROD_MAIL_API_KEY,
                sender: process.env.REACT_APP_PROD_SENDER,
                url: process.env.REACT_APP_PROD_URL
            }
        }
    } else {
        return {
            common: {
                mailApiKey: process.env.REACT_APP_DEV_MAIL_API_KEY,
                sender: process.env.REACT_APP_DEV_SENDER,
                url: process.env.REACT_APP_DEV_URL
            }
        }
    }
}