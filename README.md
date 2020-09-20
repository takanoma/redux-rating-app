### 環境構築
- npx create-react-app
- npm install --save @material-ui/core @material-ui/icons @material-ui/styles connected-react-router firebase 
history@4.10.1 react-redux react-router redux redux-actions redux-logger redux-thunk reselect @sendgrid/mail
- npm install --save react-id-swiper@3.0.0 swiper@5.4.2
- npm install --save html-react-parser
- npm install --save @sendgrid/mail cors
- npm install --save firebase-admin
- npm install --save i18next react-i18next 
- npm install --save react-cookie


### コマンド
firebase deploy --only functions
curl -X POST -H "Content-Type:application/json" https://us-central1-redux-rating-app.cloudfunctions.net/emailMessage -d '{"sender":"something"}'
curl -X POST -H "Content-Type:application/json" https://us-central1-redux-rating-app.cloudfunctions.net/helloWorld -d '{"sender":"something"}'


### 機能要件
##### 権限
- システム管理者
- アプリ管理者
- 部長
- 社員

##### ログイン後の画面
- お知らせ画面

##### システム管理者（人事管理者）
- システム管理者ロールでログインすることができる
- 全ユーザーを閲覧することができる
- アプリ管理者以下の権限の新規ユーザーを作成することができる
- アプリ管理者以下の権限のユーザーを編集・削除することができる
- お知らせ一覧を作成・編集・削除することができる

##### アプリ管理者
- アプリ管理者ロールでログインすることができる
- 全ユーザーを閲覧することができる
- アプリ管理者以下の権限の新規ユーザーを作成することができる
- アプリ管理者以下の権限のユーザーを編集・削除することができる
- 自分自身を削除することはできない
- お知らせ一覧を作成・編集・削除することができる

##### 部署管理者
- 部署管理者ロールでログインすることができる
- 同一部署内のユーザーを閲覧することができる
- 部署管理者以下の権限の新規ユーザーを作成することができる
- 部署管理者以下の権限の新規ユーザーを編集・削除することができる
- 自分自身を削除することはできない

##### 社員
- 社員ロールでログインすることができる

##### 共通
- お知らせ一覧を閲覧することができる
- パスワードをリセットすることができる

### テストアカウント

|  名前  |  メールアドレス  | パスワード | 所属部署 |
| ---- | ---- | ---- | ---- |
|  管理者  |  testorangeapp123@gmail.com  |  dSJt2pfs  |  人事部  |
|  開発部長  |  testorangeapp123+developmanager@gmail.com  |  V79EWucQ  |  開発部  |
|  開発社員1  |  testorangeapp123+develop1@gmail.com  |  BMZlaBkQ  |  開発社員１  |
|  開発社員2  |  testorangeapp123+develop2@gmail.com  |  gWTEeeF5  |  開発社員２  |
