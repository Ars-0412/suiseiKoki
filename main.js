// Live2Dモデルを画面に追加する関数
async function loadLive2DModel() {
    console.log("Live2D モデルをロード中...");

    // PIXI.live2d の Live2DModel を使用
    try {
        let modelPath = "models/mymodel/suisei_tekoki.model3.json";
        let model = await PIXI.live2d.Live2DModel.from(modelPath);

        if (!model) {
            console.error("Live2D モデルのロードに失敗しました！");
            return;
        }

        console.log("Live2D モデルのロードが完了しました！");

        // PIXI アプリケーションを作成
        const app = new PIXI.Application({
            view: document.getElementById("canvas"),
            width: 800,
            height: 600,
            transparent: true
        });

        // モデルを追加
        app.stage.addChild(model);
    } catch (e) {
        console.error("エラーが発生しました:", e);
    }
}

// モデルをロード
loadLive2DModel();
