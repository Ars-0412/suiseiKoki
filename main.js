// PIXI アプリケーションを作成
const app = new PIXI.Application({
    view: document.getElementById("canvas"),
    width: 800,
    height: 600,
    transparent: true
});

async function loadLive2DModel() {
    console.log("Live2D モデルをロード中...");

    try {
        let modelPath = "models/mymodel/suisei_tekoki.model3.json";
        let model = await CubismModel.createFromFile(modelPath); // ここを変更

        if (!model) {
            console.error("Live2D モデルのロードに失敗しました！");
            return;
        }

        console.log("Live2D モデルのロードが完了しました！");

        // モデルをステージに追加
        app.stage.addChild(model);
    } catch (e) {
        console.error("エラーが発生しました:", e);
    }
}

// モデルをロード
loadLive2DModel();
