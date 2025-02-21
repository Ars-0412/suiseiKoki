async function loadAssets(gl, modelDir, modelFile) {
    try {
        console.log(`📂 モデル設定ファイルの読み込み: ${modelDir + modelFile}`);
        const response = await fetch(modelDir + modelFile);

        if (!response.ok) {
            throw new Error(`❌ モデル設定ファイルの取得に失敗: ${response.status} ${response.statusText}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        console.log("✅ モデル設定ファイルの読み込み成功");

        const setting = new Live2DCubismFramework.CubismModelSettingJson(arrayBuffer);

        // Moc3 ファイルのチェック
        const moc3FileName = setting.getModelFileName();
        if (!moc3FileName) {
            throw new Error("❌ Moc3ファイル名が取得できません！model3.json の FileReferences.Moc を確認してください");
        }

        console.log(`📂 Moc3ファイルの読み込み: ${modelDir + moc3FileName}`);
        const moc3Response = await fetch(modelDir + moc3FileName);

        if (!moc3Response.ok) {
            throw new Error(`❌ Moc3ファイルの取得に失敗: ${moc3Response.status} ${moc3Response.statusText}`);
        }

        const moc3ArrayBuffer = await moc3Response.arrayBuffer();
        const moc3 = Live2DCubismFramework.CubismMoc.create(moc3ArrayBuffer);
        const model = Live2DCubismFramework.CubismModel.create(moc3);

        console.log("✅ モデルの読み込み成功");

        return model;
    } catch (error) {
        console.error("🚨 モデル設定の読み込みエラー:", error);
        return null;
    }
}

// Live2Dの初期化
async function init() {
    console.log("🚀 Live2Dモデルをロード中...");

    const canvas = document.getElementById("live2dCanvas");
    const gl = canvas.getContext("webgl");

    if (!gl) {
        console.error("❌ WebGL コンテキストの取得に失敗しました");
        return;
    }

    const modelDir = "models/suisei/";
    const modelFile = "suisei_tekoki.model3.json";

    const model = await loadAssets(gl, modelDir, modelFile);
    
    if (!model) {
        console.error("🚨 モデルのロードに失敗しました");
        return;
    }

    console.log("🎉 モデルのロード成功！");
}

window.onload = init;
