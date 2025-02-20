window.onload = () => {
    console.log("Live2Dモデルロード開始...");

    // PixiJS と Live2D のライブラリが正しく読み込まれたか確認
    if (typeof PIXI === "undefined" || typeof PIXI.live2d === "undefined") {
        console.error("❌ PIXI.js または pixi-live2d-display が正しく読み込まれていません！");
        return;
    }

    // Pixiアプリケーションの作成
    const app = new PIXI.Application({
        view: document.getElementById("canvas"),
        width: 800,
        height: 600,
        transparent: true,
    });

    document.body.appendChild(app.view);

    // Live2DモデルのURL
    const modelUrl = "https://ars-0412.github.io/suiseiKoki/models/mymodel/suisei_tekoki.model3.json";

    (async function () {
        try {
            // Live2Dモデルを非同期で読み込む
            const model = await PIXI.live2d.Live2DModel.from(modelUrl);
            model.anchor.set(0.5, 0.5);
            model.scale.set(0.5);
            model.x = app.renderer.width / 2;
            model.y = app.renderer.height / 2;
            app.stage.addChild(model);

            console.log("✅ Live2Dモデルのロードに成功しました！");
        } catch (error) {
            console.error("❌ Live2Dモデルの読み込みに失敗しました:", error);
        }
    })();
};

