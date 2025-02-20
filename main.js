// PixiJS のセットアップ
const app = new PIXI.Application({
    view: document.getElementById("live2dCanvas"),
    width: 800,  // キャンバスの幅
    height: 600, // キャンバスの高さ
    transparent: true // 背景を透明にする
});

// Live2Dモデルのロード
async function loadLive2DModel() {
    const modelUrl = "models/mymodel/suisei_tekoki.model3.json"; // モデルのパス

    // Live2Dモデルを読み込む
    const model = await PIXI.live2d.Live2DModel.from(modelUrl);

    // モデルのサイズ調整
    model.scale.set(0.5);

    // モデルを画面中央に配置
    model.x = app.renderer.width / 2;
    model.y = app.renderer.height / 2;
    model.anchor.set(0.5, 0.5);

    // PixiJSのステージにモデルを追加
    app.stage.addChild(model);
}

// Live2Dモデルを読み込んで表示
loadLive2DModel();
