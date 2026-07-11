# アプリレビュー

途中までの実装、お疲れさまです。
教材の追加、教材ごとの記録入力、カレンダー選択、学習時間の入力、レポート画面まで作れていて、アプリとしての流れがかなり見えてきています。
特に `localStorage` に保存したデータを使って、教材一覧やグラフにつなげようとしているところはとても良いです。

ここからは、アプリをより安定して動かすために直すと良いポイントをまとめます。
一気に全部直さなくて大丈夫です。まずは「優先して直したいところ」から順番に進めていきましょう。

## 良いところ

- 画面を `MaterialList`、`AddMaterial`、`MaterialContent`、`Calendar`、`Report` のようにコンポーネント分けできています。
- Zustand を使って、ポップアップの表示状態を共有しようとしている点が良いです。
- 教材データを `localStorage` に保存し、ページを再読み込みしても残るようにしている点が良いです。
- レポート画面で Chart.js を使い、記録をグラフ化しようとしているところは発展的でとても良い挑戦です。
- README に作業手順を書いているので、自分がどこまで作ったか振り返りやすくなっています。

## 優先して直したいところ

### 1. 教材を追加・削除しても、画面がすぐ更新されない可能性があります

対象:

- `src/components/materialList/MaterialList.jsx` 24行目
- `src/components/addMaterial/AddMaterial.jsx` 17行目
- `src/components/materialList/MaterialList.jsx` 16行目

今は `localStorage` を直接読んで一覧を表示しています。
ただ、`localStorage.setItem()` で保存しても、それだけでは React の再描画が必ず起きるわけではありません。
そのため、教材を追加・削除したあとに画面へすぐ反映されないことがあります。

おすすめは、教材一覧データを React の state または Zustand に持たせることです。
例えば Zustand に `materials`、`addMaterial`、`deleteMaterial`、`updateMaterialRecord` のような処理をまとめると、画面更新もデータ管理も分かりやすくなります。

### 2. `time`、`studyTimeH`、`studyTimeM` の初期値は配列にしましょう

対象:

- `src/components/addMaterial/AddMaterial.jsx` 15行目
- `src/components/materialContent/MaterialContent.jsx` 59〜61行目

教材追加時に、次のように保存されています。

```js
time: '',
studyTimeH: '',
studyTimeM: '',
```

でも、記録を追加するときは次のように配列として扱っています。

```js
time: [...(item.time || []), calendarTime],
studyTimeH: [...(item.studyTimeH || []), hoursLog],
studyTimeM: [...(item.studyTimeM || []), minutesLog],
```

文字列と配列が混ざると、あとから処理が分かりにくくなります。
最初から次のようにしておくと安全です。

```js
time: [],
studyTimeH: [],
studyTimeM: [],
```

データの形をそろえると、グラフ処理や記録追加のバグが減ります。

### 3. 学習時間の入力値が「文字列」と「数値」で混ざっています

対象:

- `src/components/materialContent/MaterialContent.jsx` 15〜16行目
- `src/components/materialContent/MaterialContent.jsx` 157〜170行目

`input type="number"` でも、`e.target.value` は文字列として入ってきます。
そのため、`hours` や `minutes` が最初は数値の `0`、入力後は文字列の `"1"` のように変わります。

保存や計算に使う値なので、入力時に数値へ変換しておくと良いです。

```js
onChange={(e) => setHours(Number(e.target.value))}
onChange={(e) => setMinutes(Number(e.target.value))}
```

また、分は `0〜59` にしたいので、60以上を入れられないようにする処理も追加できるとさらに良いです。

### 4. `Header.jsx` の import の大文字・小文字が合っていません

対象:

- `src/components/header/Header.jsx` 1行目
- 実際のファイル名: `Header.module.scss`

今は次のようになっています。

```js
import styles from './header.module.scss'
```

しかし、ファイル名は `Header.module.scss` です。
Mac では動くことがありますが、環境によってはビルドエラーになります。

次のように直しましょう。

```js
import styles from './Header.module.scss'
```

### 5. 使っていない import や変数があります

対象:

- `src/components/materialList/MaterialList.jsx` 1行目
- `src/components/materialList/MaterialList.jsx` 10行目
- `src/components/calendar/Calendar.jsx` 14行目付近
- `src/system/graphData.js` 19行目

例:

- `useState` を import しているが使っていない
- `setCalendarTime`、`setHoursLog`、`setMinutesLog` を受け取っているが使っていない
- `saveIndex` を受け取っているが使っていない
- `dataLength` を作っているが使っていない

このままだと ESLint でエラーになる可能性があります。
使わないものは消して、コードをすっきりさせましょう。

## 次に直すと良いところ

### 6. クリックイベントが重なって、意図しない動きになりやすいです

対象:

- `src/components/materialList/MaterialList.jsx` 21行目
- `src/components/materialList/MaterialList.jsx` 26行目
- `src/components/materialList/MaterialList.jsx` 45行目

親要素にも子要素にも `onClick` があるため、どこを押したときに何が起こるかが少し複雑になっています。
今は `stopPropagation()` で調整していますが、クリック範囲が増えるほど管理が難しくなります。

おすすめは、「教材を開くボタン」「詳細メニューボタン」「削除ボタン」の役割をはっきり分けることです。
`li` 全体にクリックを付けるより、押せる場所をボタンとして分けると読みやすくなります。

### 7. `console.log` は提出前に消しましょう

対象:

- `src/components/materialList/MaterialList.jsx` 22行目

開発中の確認として `console.log` を使うのは良いです。
ただ、完成版に残っていると、ブラウザのコンソールに毎回表示されてしまいます。
確認が終わったら消しておきましょう。

### 8. `memo` の初期値は空文字にしましょう

対象:

- `src/components/materialContent/MaterialContent.jsx` 17行目
- `src/components/materialContent/MaterialContent.jsx` 141行目

`textarea` の `value` に入れる値は、最初から文字列にしておくと安全です。

```js
const [memo, setMemo] = useState('');
```

今のように `undefined` から始まると、React の警告が出ることがあります。

### 9. 記録前のチェックをもう少し分かりやすくできます

対象:

- `src/components/materialContent/MaterialContent.jsx` 51〜52行目

今は、日付や学習時間が未入力だと何も起きないようになっています。
機能としては正しいですが、ユーザーから見ると「記録ボタンを押したのに反応しない」と感じるかもしれません。

例えば、未入力ならメッセージを出す、または記録ボタンを無効化するなどにすると親切です。

## さらに良くするためのポイント

### 10. 日付は文字列ではなく、扱いやすい形式で保存すると良いです

対象:

- `src/components/calendar/Calendar.jsx` 15〜22行目
- `src/components/materialContent/MaterialContent.jsx` 81〜88行目
- `src/system/graphData.js` 28行目

今は `2026年06月04日 12:30` のような文字列で保存し、あとから正規表現で数字を取り出しています。
これはよく工夫できていますが、日付計算が増えると少し大変になります。

おすすめは、保存用には `date.toISOString()` のような形式を使い、表示するときだけ日本語の文字列に変換する方法です。
そうすると、グラフ用の集計もかなり楽になります。

### 11. グラフ用の処理は小さな関数に分けると読みやすくなります

対象:

- `src/system/graphData.js`

`getGraphDatas()` は、今の時点でも頑張って整理されています。
ただ、処理が長くなってきているので、次のように分けると読みやすくなります。

- 記録日時を `Date` に変換する関数
- 分を時間に変換する関数
- 今日・今月・合計時間を計算する関数
- 直近7日分のグラフデータを作る関数

関数を分けると、間違いを見つけやすくなります。

### 12. 教材データの形を決めておくと、開発しやすくなります

例えば、教材データは次のような形にそろえると分かりやすいです。

```js
{
  name: '英単語帳',
  status: 'learning',
  records: [
    {
      date: '2026-06-04T12:30:00.000Z',
      minutes: 45,
      memo: 'Chapter 1を復習'
    }
  ]
}
```

`studyTimeH` と `studyTimeM` を別々の配列にするより、1回の記録を1つのオブジェクトにまとめると、あとから編集・削除・集計がしやすくなります。

### 13. 文字列を囲むクォートについて
シングルクォートでもいいところが、バッククォートになっていたりするので、統一するといいかと思います！
テンプレートリテラルとして扱わないところはシングルクォートにしましょう。
また、ダブルクォートとシングルクォートが混在しているので、シングルに統一しましょう。


## まとめ

アプリの完成形に向かって、必要な部品はかなり作れています。
特に、教材を追加して、記録して、レポートに表示するという大きな流れができているのはとても良いです。

次の課題は「データの形をそろえること」と「React の state と `localStorage` の役割を整理すること」です。
ここを直すと、追加・削除・記録・グラフ表示がもっと安定します。

今の実装は、途中段階としては十分よく頑張れています。
焦らず、まずは小さい修正から進めていきましょう。

## 補足

このレビューを書いた環境では `npm` コマンドが見つからなかったため、`npm run lint` と `npm run build` は実行できませんでした。
実行できる環境では、最後にこの2つを確認しておくと安心です。