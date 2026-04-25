# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Work procedure

1. サイドバーで記録という項目をつくり、その後教材追加ボタンを設定。
2. 教材はクリックすると画面が変わるようにし、×ボタンで戻れるようにする。
3. 増やせるようにする。教材一覧を並べる。
4. 教材一覧に詳細ボタンを設定し、そこから削除ができるようになる。
5. 教材・学習内容のタイトルを表示、カレンダーを出せるようにする。
6. カレンダーで日付時間を設定すると表示させるようにする。学習時間をつくり、押すとpopupが表示される。
7. 学習時間を入力できるようにし、設定したら表示させる。その後要点・メモをつくり記入できるようにし、最後に記録を押すことで全部記録させるようになる。
<!-- 8. 何か記録していて×を押す場合は編集内容が保存されていませんとでるようになる。 -->

9. サイドバーにレポートの項目を追加し、画面が変わって学習推移をつくる。

10. 学習推移のなかで今日、今月、総学習時間が表示される。
11. 棒グラフをつくり、日によって変わるようにし、タスクによって色が変わるようになる。