# コードレビュー: 学習記録アプリ

## 全体的な印象

Zustand・react-router-dom・Chart.js・react-calendar など複数のライブラリを組み合わせて動くものを作れているのはいい感じですね！
コンポーネントを機能ごとにファイル分けできているのも、良い習慣がついています。
あまりAIを使ってないということで、かなりJSに慣れてきたのではないでしょうか？

まだ開発途中の部分もあると思うので、「次に直すとよい箇所」として参考にしてみてください。

---

## 気になった点

### 学習時間を設定しても保存に反映されない (`src/components/materialContent/MaterialContent.jsx` L33-49)

学習時間のポップアップで設定した値が、保存ボタンを押したときにうまく記録されていません。

原因は、画面に表示している値（Zustand の `hoursLog` / `minutesLog`）と、保存に使っている値（ローカル state の `hours` / `minutes`）が別々になっているためです。

```jsx
// 保存に使っている値（ローカルstate）
studyTimeH: hours,
studyTimeM: minutes,

// 画面に表示している値（Zustand store）
{hoursLog}時間{minutesLog}分
```

`saveClick` の中で `hoursLog` / `minutesLog` を使うように修正すると解決します。

---

### 教材を開き直すとメモや学習時間が消える (`src/components/materialContent/MaterialContent.jsx` L16-18)

```jsx
const [memo, setMemo] = useState()     // undefinedで初期化されている
const [hours, setHours] = useState(0)  // 常に0スタート
```

一度閉じてまた開くと入力した内容が消えてしまいます。localStorage に保存されているデータを開いたときに読み込むようにしてみましょう。

また、教材Aを開いて閉じて、教材Bを開いたとき、Aで入力していた内容がBに残ったままになってしまうという問題もあります。`saveIndex` が変わったタイミングで `useEffect` を使って state をリセット・再読み込みするのが解決の糸口になります。

```jsx
useEffect(() => {
  const data = JSON.parse(localStorage.getItem('materialsData')) || [];
  const item = data[saveIndex];
  if (item) {
    setMemo(item.memo || '');
    setHours(item.studyTimeH || 0);
    setMinutes(item.studyTimeM || 0);
  }
}, [saveIndex]);
```

---

### 「現時刻」ボタンではなく、親のdivにonClickが設定されている (`src/components/materialContent/MaterialContent.jsx` L81)

```jsx
<button className={styles.nowBtn}>現時刻</button>
```

`onClick` をbuttonタグにつけましょう。

---

### 教材名が空のまま保存できる (`src/components/addMaterial/AddMaterial.jsx` L14-22)

名前を入力しなくても保存できてしまいます。`saveClick` の中で `name` が空でないかチェックを追加しましょう。

```jsx
const saveClick = () => {
  if (!name.trim()) return; // この1行を追加するだけでOK
  // ...
}
```

---

### ステータスが「学習中」固定になっている (`src/components/addMaterial/AddMaterial.jsx` L75)

```jsx
<button className={styles.rowValue}>学習中</button>
```

ボタンになっていますが、押しても何も起きません。「学習中・完了・積読」など切り替えられると便利ですね。後で実装する予定があれば TODO コメントを残しておくと良いです。

---

### リストのキーに配列のインデックスを使っている (`src/components/materialList/MaterialList.jsx` L25)

```jsx
{JSON.parse(localStorage.getItem('materialsData')).map((item, index) => (
  <li key={index} ...>
```

`key={index}` を使うと、削除したときに React が要素を取り違えてレンダリングの不具合が起きることがあります。各教材に `id` を持たせて `key={item.id}` にするのがより安全です。

```jsx
// AddMaterial.jsx で保存するときに id を追加する
const addData = {
  id: Date.now(), // 追加
  name: name,
  ...
}
```

---

## 小さな改善点

### コードの整理

以下はバグではないですが、整理しておくと読みやすくなります。

- **`src/App.jsx` L27-37**: コメントアウトした古いコードが残っています。不要なら削除しましょう
- **`src/components/report/Report.jsx` L72-79**: `ChartJS.register()` が2回書かれています。1回で大丈夫です
- **`src/components/report/Report.jsx` L6**: `import { createElement } from "react"` は使っていないので削除できます
- **`src/components/materialContent/MaterialContent.jsx` L98-99**: `<div className={styles.divider} />` が2行連続しています。1つ削除しましょう

### タイポ

`src/components/materialList/MaterialList.jsx` L21 の `meterials` は `materials` のスペルミスです。CSSのクラス名なので動作に影響はないですが、直しておきましょう。

### Header が空

`src/components/header/Header.jsx` の中身が空になっています。今後使う予定があれば残しておいて大丈夫ですが、使わないなら削除してもよいです。

---

## 良かった点

- `e.stopPropagation()` をリスト内のボタンで正しく使えています。これは地味に難しいのでよくできています！
- `react-calendar` の日本語フォーマット（年月日・曜日の表記）が丁寧に実装されています
- 削除確認ポップアップを出す UX は使い勝手を考えられていて良いです
- localStorage のデータ構造（オブジェクト配列）の設計は適切です
- Zustand で状態を一元管理しようとしている方向性は正しいです

---

## 次に取り組む順番の目安

| 優先度 | やること |
|--------|----------|
| まず | 学習時間が正しく保存されるように修正 |
| 次に | 開き直してもデータが残るように修正（`useEffect` の追加） |
| 次に | レポートページに実データを表示 |
| その後 | 現時刻ボタンの実装・ステータス切り替え |
| 余裕があれば | `key={id}` への変更・カレンダーの時刻入力・名前バリデーション・コード整理 |

全体的によく作れています。バグを1つずつ直していけば、かなり完成度の高いアプリになると思います！
