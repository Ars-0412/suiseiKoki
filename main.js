import { Live2DModel } from "./lib/cubismmodel.js"; 

async function loadLive2DModel() {
    try {
        console.log("Live2Dモデルをロード中...");

        // モデル設定 JSON のパス
        const modelSettingPath = "models/suisei/suisei_tekoki.model3.json";

        // Live2Dモデルを作成
        const model = await Live2DModel.from(modelSettingPath);
        model.scale.set(0.5, 0.5); // サイズ調整
        model.position.set(0, 0); // 位置調整

        // PIXI.js のステージに追加
        app.stage.addChild(model);
        console.log("Live2Dモデルのロード成功");

    } catch (error) {
        console.error("Live2Dモデルのロードに失敗しました:", error);
    }
}

// PIXIアプリケーションを作成
const app = new PIXI.Application({
    view: document.getElementById("canvas"),
    autoStart: true,
    backgroundAlpha: 0
});

// Live2Dモデルのロード
window.onload = async () => {
    await loadLive2DModel();
};
