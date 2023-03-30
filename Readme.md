# Cafe kouno web system all in one

データベースのマイグレーションに使用するファイル(/postgres)  
バックエンド(/cafe_kouno_back)  
フロントエンド(/cafe_kouno_front)  
が一緒になったプロジェクト

## 動作に必要な条件

```japanese
デプロイは開発者側で行うことを想定しています
```

・1 GB RAM、1 vCPU、40 GB の SSD インターネット接続
・ 環境変数の設定  
export GOOGLE_MAIL='<ご注文確認メール送信に使用する gmail メールアドレス>'  
export GOOGLE_PASS='<ご注文確認メール送信に使用するアカウントのアプリパスワード>'  
export FB_ACCESS_TOKEN='<フェイスブックの API 呼び出しに使うアカウントアクセストークン>'  
export IG_USER_ID='<インスタグラムビジネスアカウントの id>'  
export CAFE_KOUNO_PASSWORD='<bcrypt でハッシュ化された管理画面用パスワード>'  

・バックエンドのコントローラー（/cafe_kouno_back/src/main/java/com/yutadd/controller/CafeController.java）  
のクロスオリジンの設定をフロントエンドのデプロイ先のオリジンに変更

・バックエンド用に TLS 証明書を作成し、p12 形式にパックして、名前を output.p12 として/cafe_kouno_back/に配置  
・バックエンドの application.properties(/cafe_kouno_back/src/main/resources/)  
のデータベースと TLS 設定を環境に合わせて再設定

・フロントエンドのバックエンドのアドレス設定(/cafe_kouno_back/src/App.tsx)
の initialValue の apiPath をバックエンドのドメイン:ポートに変更
