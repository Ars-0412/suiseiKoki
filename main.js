// main.js のフルコード

import { Live2DModel } from "./lib/cubismmodel.js";
import { CubismModelSettingJson } from "./lib/cubismmodel.js";

async function loadLive2DModel() {
    console.log("Live2Dモデルをロード中...");

    const modelPath = "models/suisei/suisei_tekoki.model3.json";
    const response = await fetch(modelPath);
    const modelJson = await response.json();

    console.log("モデルデータファイルの読み込み成功:", modelPath);

    const modelSetting = new CubismModelSettingJson(modelJson);

    console.log("Live2Dモデル設定を解析:", modelSetting);

    const mocFile = modelSetting.getModelFileName();
    console.log("Moc3 ファイル:", mocFile);

    const model = await Live2DModel.from(modelPath);
    model.scale.set(0.5, 0.5);
    model.x = window.innerWidth / 2;
    model.y = window.innerHeight / 2;

    const app = new PIXI.Application({
        view: document.getElementById("live2dCanvas"),
        autoStart: true,
        width: window.innerWidth,
        height: window.innerHeight,
        transparent: true,
    });

    app.stage.addChild(model);
}

window.onload = async () => {
    await loadLive2DModel();
};
