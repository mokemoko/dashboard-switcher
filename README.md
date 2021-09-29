# Dashboard Switcher

Datadog / Cloud Profiler など複数ダッシュボード間で表示時間などの状態を維持したまま遷移できるようにするブラウザ拡張機能

## Usage

### Install

[リリースページ](https://github.com/mokemoko/dashboard-switcher/releases) から利用しているブラウザに対応した最新バージョンのアーカイブをダウンロードし、拡張機能ページにDrag&Dropでインストールしてください

### Setting

拡張機能の設定画面から遷移したいダッシュボードのURLを登録できます。  
なお、ダッシュボードによっては登録できるURLに制約があるため、後述の説明欄を参照下さい。  

また、対応していない任意のURLも登録でき、単純なブックマークとして利用することが可能です。

### Use

拡張機能アイコンを押下すると登録したURLの一覧が表示され、遷移できます。  
この時、遷移元ページが対応するダッシュボードページだった場合、表示期間の情報が遷移先にも反映されます。

## Supported dashboard

### Datadog Dashboard

#### Example URL
    https://app.datadoghq.com/dashboard/[DASHBORD_ID]

### Cloud Profiler

#### Example URL
    https://console.cloud.google.com/profiler;timespan=3d;end=2021-09-27T11:15:03.419Z/[YOUR_SERVICE]/cpu?project=[YOUR_PROJECT]

#### Remarks
登録するURLには必ず `timspan`, `end` が含まれる必要があります。  
トレースグラフ上でD&Dして固定期間に絞られたURLを利用するようにして下さい。

### Cloud Trace

#### Example URL
    https://console.cloud.google.com/traces/list?project=[YOUR_PROJECT]

## For developer

### Development

    npm run dev

### Build

    npm run build

## Refs

* [webextension-toolbox](https://github.com/HaNdTriX/webextension-toolbox)
