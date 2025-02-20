document.addEventListener("DOMContentLoaded", async function () {
    console.log("Live2D モデルをロード中...");

    const modelPath = "models/mymodel/suisei_tekoki.model3.json";

    // PixiJSとpixi-live2d-displayの読み込み確認
    if (typeof PIXI === "undefined" || typeof PIXI.live2d === "undefined") {
        console.error("PIXI.js または pixi-live2d-display が正しく読み込まれていません！");
        return;
    }

    // PixiJSのアプリケーション作成
    const app = new PIXI.Application({
        view: document.getElementById("canvas"),
        width: 800,
        height: 600,
        transparent: true,
    });

    document.body.appendChild(app.view);

    try {
        // Live2Dモデルの読み込み
        const model = await PIXI.live2d.Live2DModel.from(modelPath);
        app.stage.addChild(model);

        // モデルの位置とスケールを調整
        model.x = app.renderer.width / 2;
        model.y = app.renderer.height / 2;
        model.anchor.set(0.5);
        model.scale.set(0.5);

        console.log("Live2Dモデルのロードに成功しました！");
    } catch (error) {
        console.error("Live2Dモデルの読み込みに失敗しました:", error);
    }
});