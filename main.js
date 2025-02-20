let live2DModel = null;

async function loadLive2DModel() {
    console.log("Live2D モデルをロード中...");
    
    // Live2Dモデルをロードする
    live2DModel = await PIXI.live2d.Live2DModel.from("models/mymodel/suisei_tekoki.model3.json");

    if (!live2DModel) {
        console.error("Live2D モデルのロードに失敗しました！");
        return;
    }

    // モデルを画面に追加
    app.stage.addChild(live2DModel);
    console.log("Live2D モデルのロードが完了しました！");
}

// PIXIアプリケーションを作成
const app = new PIXI.Application({
    view: document.getElementById("canvas"),
    width: 800,
    height: 600,
    transparent: true
});

// モデルをロード
loadLive2DModel();
