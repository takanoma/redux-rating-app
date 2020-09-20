export const userRegistrationTitle = "【考課システム】ユーザー登録完了のお知らせ"
export const userRegistrationBody = (mailAddress, password, url) => {
    return `
{mailAddress} 様
    
         
ユーザー登録が完了しました。
    
-- ログイン情報 --
メールアドレス：{mailAddress}
初期パスワード:{password}
以下のリンクより、システムにログインしてください。
なお、ログインできない場合は、お問い合わせください。
{url}
            
--
株式会社Orange Square
人事部
`
        .replace(/{mailAddress}/g, mailAddress)
        .replace(/{password}/g, password)
        .replace(/{url}/g, url);
}


