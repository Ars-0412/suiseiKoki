document.addEventListener("DOMContentLoaded", function () {
    console.log("Live2D モデルをロード中...");

    let modelPath = "models/mymodel/suisei_tekoki.model3.json"; // 変数の二重定義を修正

    async function loadLive2DModel() {
        console.log("Live2Dモデルロード開始");

        if (typeof PIXI === "undefined") {
            console.error("PIXI.js が正しく読み込まれていません！");
            return;
        }

        const app = new PIXI.Application({
            view: document.getElementById("canvas"),
            width: 800,
            height: 600,
            transparent: true,
        });

        document.body.appendChild(app.view);

        try {
            const model = await PIXI.live2d.Live2DModel.from(modelPath);
            app.stage.addChild(model);
            console.log("Live2Dモデルロード完了");
        } catch (error) {
            console.error("Live2Dモデルの読み込みに失敗しました:", error);
        }
    }

    if (typeof CubismFramework !== "undefined" && CubismFramework.startUp) {
        CubismFramework.startUp();
        CubismFramework.initialize();
        loadLive2DModel().catch(console.error);
    } else {
        console.error("CubismFramework が正しく定義されていません！");
    }
});
