import * as CubismFramework from "/lib/cubismframeworkconfig.js";
import { CubismModelSettingJson } from "/lib/cubismmodel.js";
import { Live2DCubismCore } from "/lib/live2dcubismcore.min.js";

async function loadLive2DModel() {
    console.log("Live2Dモデルのロード中...");

    // Cubism Framework の初期化
    if (!CubismFramework.CubismFramework.startUp()) {
        console.error("CubismFramework の初期化に失敗しました！");
        return;
    }

    CubismFramework.CubismFramework.initialize();

    try {
        // Live2Dモデルの設定
        const modelPath = "models/suisei/suisei_tekoki.model3.json";
        const response = await fetch(modelPath);
        if (!response.ok) throw new Error("モデル設定ファイルの読み込みに失敗しました！");
        
        const modelSettingJson = await response.json();
        const modelSetting = new CubismModelSettingJson(modelSettingJson);

        console.log("モデル設定ファイルの読み込み成功: ", modelSetting);

        // Live2Dモデルの読み込み
        const moc3Path = modelSetting.getModelFileName();
        console.log("Moc3ファイル:", moc3Path);

        if (!moc3Path) {
            throw new Error("Moc3ファイルが取得できません！");
        }

        const moc3Data = await fetch(moc3Path).then(res => res.arrayBuffer());
        const moc = Live2DCubismCore.Moc.fromArrayBuffer(moc3Data);

        if (!moc) {
            throw new Error("Moc3の読み込みに失敗しました！");
        }

        console.log("Moc3ファイルの読み込み成功");

        // WebGLコンテキストの取得
        const canvas = document.getElementById("live2dCanvas");
        const gl = canvas.getContext("webgl");

        if (!gl) {
            throw new Error("WebGLの初期化に失敗しました！");
        }

        console.log("WebGLコンテキスト取得成功");

    } catch (error) {
        console.error("Live2Dモデルのロードに失敗しました:", error);
    }
}

// ページ読み込み時にモデルを読み込む
window.onload = loadLive2DModel;
