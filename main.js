console.log("✅ スクリプトが読み込まれました");

// Live2D モデルのパス
const modelPath = "models/mymodel/suisei_tekoki.model3.json";

// PIXI.js のセットアップ
const app = new PIXI.Application({
    view: document.getElementById("live2dCanvas"), // ID を修正
    width: 800,
    height: 600,
    transparent: true
});
console.log("✅ PIXI.js 初期化完了");

// CubismFramework の初期化
function initLive2D() {
    console.log("✅ Live2D Cubism SDK 初期化開始...");

    if (!Live2DCubismCore) {
        console.error("❌ Live2DCubismCore がロードされていません！");
        return;
    }

    CubismFramework.startUp();
    CubismFramework.initialize();

    console.log("✅ Live2D Cubism SDK 初期化完了！");
}

// Live2D モデルをロード
async function loadLive2DModel() {
    console.log("🔄 Live2D モデルをロード中...");

    try {
        let model = new CubismUserModel();
        await model.loadModel(modelPath);

        console.log("✅ Live2D モデルのロードが完了しました！");

        // モデルを PIXI のステージに追加
        app.stage.addChild(model);
        console.log("✅ Live2D モデルをステージに追加しました！");
    } catch (e) {
        console.error("❌ モデルのロード中にエラー発生:", e);
    }
}

// 初期化とロードを実行
initLive2D();
loadLive2DModel();
