document.addEventListener("DOMContentLoaded", async function () {
    console.log("Live2D モデルをロード中...");

    // Live2Dモデルのパス
    const modelPath = "models/mymodel/suisei_tekoki.model3.json";

    // PixiJSのアプリケーション作成
    const app = new PIXI.Application({
        view: document.getElementById("canvas"),
        width: 800,
        height: 600,
        transparent: true,
    });

    document.body.appendChild(app.view);

    try {
        // Live2D Cubism 5 のモデルをロード
        const model = await Live2DCubismCore.Model.loadFromFile(modelPath);

        // PixiJSのスプライトに変換
        const texture = PIXI.Texture.from(model.getTexture(0));
        const sprite = new PIXI.Sprite(texture);

        // モデルの位置とスケールを調整
        sprite.x = app.renderer.width / 2;
        sprite.y = app.renderer.height / 2;
        sprite.anchor.set(0.5);
        sprite.scale.set(0.5);

        app.stage.addChild(sprite);

        console.log("Live2Dモデルのロードに成功しました！");
    } catch (error) {
        console.error("Live2Dモデルの読み込みに失敗しました:", error);
    }
});
