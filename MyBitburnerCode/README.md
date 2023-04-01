# MyBitburnerCode

Bitburnerというゲームで使っているコードです。主にバックアップ目的。
ご自由にどうぞ

-----2022/11/29追記-----  
Steam版（ https://store.steampowered.com/app/1812820/Bitburner/ ）でやっていて、Steam上の実績が100%になって以来やっていなかったんですけど、気が向いた(というか今思いついた)のでその時のソースコードを全部上げときます。  
**Redditやその他海外サイトで拾ったソースコードも含む**  

devmenu.ns.jsを実行するとその名の通りデベロッパーメニュー（いわゆるチート画面）を開けます。  
確かこれを使わないと特定の実績が解除できなくて全実績を解除することはできなかったはずです。  
まあこれを使えば一瞬で全実績を解除できちゃうんですけどね（実績0の状態から一度に全取得すると爽快かもしれない）。  

もう前にやったことなんで詳細は覚えていません。  
ゲーム側のバージョンアップにより動かないものもあるかもしれません。  
なので動かなかった場合の質問には答えられません（Redditで見つけたmonitor.js関連は当時動かなかった）。  

-----ここまで-----


以下メモ


StartUp.jsを最初に起動すれば残りの3つのコードが自動で始まります。
4つともhomeに置いておいてください。

現状StartUp.js,auto_hack.js,auto_hack_address_to_home.js,auto_Stock_Market.jsはどのBitNodeも必要としません。序盤から使えます。


StartUp.js,auto_hack.js,auto_hack_address_to_home.jsともに勝手に取得可能なサーバーを調べてきます。homeとdarkwebはどの環境でも共通なので予め省いています（homeはhackの対象ではなく、darkwebは使用可能RAMが1.00GBしかないため）。

if文でdarkwebを正規表現で省いているところがありますが、初期に記載したままのものなので消しても問題ありません。

StartUp.js,auto_hack.js,auto_Stock_Market.jsはhomeで実行し、StartUp.jsとauto_Stock_Market.jsのRAMを確保したら残りはauto_hack.jsのスレッドで限界まで埋められます。

序盤はauto_Stock_Market.jsが利用不可能なので適当にコメントアウトしておいてください。

auto_hack_address_to_home.jsはhome以外の検出したサーバーに自動で設置し実行されます。

auto_hack_address_to_home.jsの実行に必要なサーバーのポート開放とroot化はStartUp.jsがポート開放に必要なソフトが揃い次第勝手にやってくれます。Create Programは遅いので早々にTOR Routerを買ってdarkweb上から買うのをお勧めします。

前に一度だけ開けたはずのポートが勝手に閉じてエラー落ちした気がしたのでauto_hack.jsにも念のためポート開放とroot化を行うコードを書いてますが、多分気のせいなのでその部分は消しちゃってもいいかもしれません。そうすれば0.60GBの軽量化ができます。

auto_hack_address_to_home.jsは2.65GBなので8GBのサーバーだったら8÷2.65 =3.0188679245283018867924528301887となり、16GBのサーバーだったら16÷2.65=6.0377358490566037735849056603774となりRAM使用効率がいいと思うので追加で少しだけ拡張したり（拡張するなら倍ぐらいの容量にならないと勿体無い）、無理やり少しだけ軽量化したりするのはお勧めしません。4GBのサーバーだけ腐ります。

全部検証するのは大変なのでやってませんが多分期待通りに動いてます。


auto_Stock_Market.jsはRedditからの流用です。auto_Stock_Market.jsを使うにはWSE AccountとTIX API AccessとMarket Data TIX API Accessが必要です。一度買っちゃえば完全放置で簡単に金が溜まるので早期購入をお勧めします。最初はWSE Accountと4S Market Data Accessで手動で株の売買をしたほうが効率がいいかも？

StartUp.js 5.50GB

auto_hack.js 3.50GB

auto_hack_address_to_home.js 2.65GB

auto_Stock_Market.js 17.70GB
