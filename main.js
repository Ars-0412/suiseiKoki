console.log("Live2Dモデルロード開始");

// ✅ PixiJS と pixi-live2d-display の読み込み確認
if (typeof PIXI === "undefined" || typeof PIXI.live2d === "undefined") {
    console.error("❌ PIXI.js または pixi-live2d-display が正しく読み込まれていません！");
} else {
    console.log("✅ PIXI.js および pixi-live2d-display の読み込み成功！");
}

const app = new PIXI.Application({
    view: document.getElementById("canvas"),
    width: 800,
    height: 600,
    transparent: true,
});

document.body.appendChild(app.view);

async function loadModel() {
    try {
        console.log("Live2Dモデルを読み込みます...");
        
        // ✅ ここでモデルのパスを指定
        const modelPath = "models/mymodel/suisei_tekoki.model3.json";

        // ✅ PixiJS Live2Dモデルのロード
        const model = await PIXI.live2d.Live2DModel.from(modelPath);
        
        console.log("✅ Live2Dモデルのロード成功！");
        
        app.stage.addChild(model);
        
        // 位置とスケール調整
        model.x = app.renderer.width / 2;
        model.y = app.renderer.height / 2;
        model.scale.set(0.5);

    } catch (error) {
        console.error("❌ Live2Dモデルの読み込みに失敗しました！", error);
    }
}

// モデルをロード
loadModel();

