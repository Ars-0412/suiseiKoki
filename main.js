// PIXI アプリケーションの作成
const app = new PIXI.Application({
    view: document.getElementById("canvas"),
    width: 800,
    height: 600,
    transparent: true
});

// CubismFramework の初期化
function initLive2D() {
    if (!Live2DCubismCore) {
        console.error("Live2DCubismCore がロードされていません！");
        return;
    }

    console.log("Live2D Cubism SDK 初期化開始...");
    CubismFramework.startUp();
    CubismFramework.initialize();
    console.log("Live2D Cubism SDK 初期化完了！");
}

// Live2D モデルをロード
async function loadLive2DModel() {
    console.log("Live2D モデルをロード中...");

    try {
        let modelPath = "models/mymodel/suisei_tekoki.model3.json";

        // CubismUserModel のインスタンスを作成
        let model = new CubismUserModel();

        await model.loadModel(modelPath);

        console.log("Live2D モデルのロードが完了しました！");

        // モデルを PIXI のステージに追加
        app.stage.addChild(model);
    } catch (e) {
        console.error("エラーが発生しました:", e);
    }
}

// Live2D の初期化とモデルのロードを実行
initLive2D();
loadLive2DModel();
