# 課題レビュー

## 全体の感想

今回の変更では、教材を `index` ではなく `id` で管理するようにしたり、教材編集画面を追加したり、グラフの色数制限をなくしたりと、アプリを実際に使いやすくするための改善がかなり進んでいました。

特に、削除や編集で `index` に頼ると、表示順やフィルタの影響で別の教材を操作してしまうことがあります。そこを `id` 管理に変えたのは、とても良い判断です。

次は「状態をどこに持たせるか」と「保存時にも必ずチェックするか」を意識できると、さらに安定したコードになります。

## 良かったところ

### 1. `id` 管理に変えたのが良いです

`MaterialList.jsx` で教材を開くとき、削除するとき、編集するときに `item.id` を使うようになっています。

- `src/components/materialList/MaterialList.jsx:13`（削除対象のID）
- `src/components/materialList/MaterialList.jsx:32`（記録画面を開く教材のID）
- `src/components/materialList/MaterialList.jsx:48`（詳細メニューを開いた教材のID）
- `src/components/materialList/MaterialList.jsx:61`（編集する教材のID）

これはとても大事な改善です。教材を「学習中だけ表示する」ようにした場合、配列の何番目かという `index` は元データとずれることがあります。`id` で探す形にすると、そのズレが起きにくくなります。

### 2. 教材編集画面を別コンポーネントに分けられています

`MaterialEdit.jsx` を新しく作って、教材追加とは別に編集の処理を持たせたのは良い方向です。

- `src/components/materialEdit/MaterialEdit.jsx:5`
- `src/App.jsx:22`

追加と編集は似ていますが、やりたいことは少し違います。コンポーネントを分けることで、あとから「編集だけの処理」を足しやすくなっています。

### 3. グラフの色を動的に作る考え方が良いです

教材数が増えても `getColor` で色を作れるようにしたのは良い改善です。

- `src/components/report/Report.jsx:61`
- `src/components/report/Report.jsx:97`

最初に色の配列を決め打ちするより、データ数に合わせて作るほうが拡張しやすいです。

## 次に直すと良さそうなところ

### 1. 追加画面と編集画面で同じ `status` を共有しているので、状態が混ざりやすいです

今は `status` が Zustand のグローバル状態になっています。

- `src/store/stateSettings.js:6`
- `src/components/addMaterial/AddMaterial.jsx:13`
- `src/components/materialEdit/MaterialEdit.jsx:8`

そのため、追加画面で選んだステータスと、編集画面で選んだステータスが同じ場所に保存されます。画面を閉じるときに `setStatus('')` しているので普段は気づきにくいですが、画面が増えてくると「別の画面で選んだ値が残る」原因になりやすいです。

おすすめは、追加画面の `status` と編集画面の `status` はそれぞれのコンポーネント内の `useState` で持つことです。Zustand には、アプリ全体で本当に共有したい情報だけを置くと整理しやすくなります。

### 2. 学習時間の入力チェックが「設定」ボタンのときだけなので、保存時にすり抜けます

`studyTimeSet` では、時間が `24` を超えた場合や、分が `59` を超えた場合にチェックしています。

- `src/components/materialContent/MaterialContent.jsx:30`

ただし、入力欄に値を入れたあと「設定」を押さずに、右上の「記録」ボタンを押すと、`saveRecord` 側では上限チェックをしていません。

- `src/components/materialContent/MaterialContent.jsx:40`

この場合、たとえば `99時間99分` のような値も保存できてしまいます。

入力チェックは、最後に保存する `saveRecord` の中でも行うと安心です。「途中の設定ボタンでもチェック」「最終保存時にもチェック」という形にすると、ユーザー操作の順番に左右されにくくなります。

### 3. 円グラフの計算で、古いデータや壊れたデータに弱い部分があります

`calcTotalByMaterial` では、`item.records.hours` があれば `item.records.minutes[idx]` を読むようになっています。

- `src/system/graphData.js:71`
- `src/system/graphData.js:75`

今回、追加時のデータは `minutes` に直せていますが、以前のデータには `minute` という名前で保存されたものが残っている可能性があります。また、何かの理由で `minutes` が存在しないデータがあると、ここでエラーになる可能性があります。

まずは `item.records?.minutes` があるかも確認すると安全です。過去データも使う場合は、`minutes` がなければ `minute` を見る、という移行用の処理を入れるのも良いです。

### 4. `MaterialEdit.jsx` の `useEffect` に依存関係の warning があります

`MaterialEdit.jsx` の `useEffect` は `openPopup` だけを見ています。

- `src/components/materialEdit/MaterialEdit.jsx:16`
- `src/components/materialEdit/MaterialEdit.jsx:21`

`saveItemId` は教材名などの編集値ではなく、「どの教材を編集するか」を示すIDです。13行目で、このIDを使って `thisDataMaterial` を探しています。

- `src/components/materialEdit/MaterialEdit.jsx:9`
- `src/components/materialEdit/MaterialEdit.jsx:13`

そのため、`saveItemId` が変わると `thisDataMaterial` も変わり、effect でセットしたい教材名とステータスも変わります。しかし現在の依存配列は `openPopup` だけなので、ESLint は `thisDataMaterial` 内の値と `setStatus` が不足していると warning を出しています。

ただし、現在の操作では編集画面を開く際に `openPopup` も変わるため、すぐに大きな不具合になるとは限りません。単純に依存配列へ値を足すだけでなく、編集画面を開く処理で初期値を渡す方法や、編集対象のIDから値を初期化する構造も含めて整理すると分かりやすくなります。

React では、effect の中で参照している値と依存配列の関係をそろえることが大切です。

### 5. `npm run lint` が通っていないので、提出前に確認できるとさらに良いです

確認したところ、`npm run build` は成功しました。

一方で、`npm run lint` は失敗しています。今回の変更に関係するものでは、次のような指摘が出ています。

- `src/components/materialContent/MaterialContent.jsx:21`
- `src/components/materialEdit/MaterialEdit.jsx:18`
- `src/system/graphData.js:58`

`graphData.js:58` の `ms` は作っているけれど使っていない変数なので、消すだけで直せます。

`Header.jsx` の `styles` 未使用も出ていますが、これは今回の変更前からありそうです。余裕があれば一緒に直しておくと、lint が見やすくなります。

## まとめ

今回の実装は、機能追加としてかなり前に進んでいます。特に `id` 管理への変更、編集画面の追加、円グラフの追加は、アプリとして自然に成長している感じがあって良いです。

次に意識すると良いのは、次の3つです。

1. 画面ごとの入力途中の値は、できるだけその画面の `useState` に置く
2. 入力チェックは、最後に保存する処理でも必ず行う
3. localStorage の過去データも考えて、存在しない値を読む前に確認する

ここまでできると、「動く」だけでなく「データが増えても壊れにくい」コードに近づいていきます。
