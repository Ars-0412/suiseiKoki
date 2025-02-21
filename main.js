async function loadAssets(modelDir, modelFile) {
    console.log("モデル設定ファイルを読み込み中:", modelDir + modelFile);

    // `model3.json` をフェッチ
    const response = await fetch(modelDir + modelFile);
    if (!response.ok) {
        throw new Error("モデル設定ファイルの読み込みに失敗しました: " + response.status);
    }

    // JSONデータとしてパース
    const json = await response.json();
    console.log("モデル設定読み込み成功:", json);

    // `FileReferences` があるかチェック
    if (!json.FileReferences || !json.FileReferences.Moc) {
        throw new Error("モデル設定が不正です: " + JSON.stringify(json));
    }

    return json;
}

async function init() {
    console.log("Live2Dモデルをロード中...");

    const modelDir = "models/suisei/";
    const modelFile = "suisei_tekoki.model3.json";

    try {
        const settings = await loadAssets(modelDir, modelFile);

        console.log("モデル設定を取得:", settings);
        console.log("Moc3 ファイル名:", settings.FileReferences.Moc);

        // WebGLコンテキストを取得
        const canvas = document.getElementById("live2dCanvas");
        const gl = canvas.getContext("webgl");

        if (!gl) {
            throw new Error("WebGL を初期化できませんでした");
        }

        console.log("WebGL コンテキスト取得成功");

        // Moc3ファイルの読み込み
        const mocResponse = await fetch(modelDir + settings.FileReferences.Moc);
        if (!mocResponse.ok) {
            throw new Error("Moc3ファイルの読み込みに失敗しました: " + settings.FileReferences.Moc);
        }

        const mocArrayBuffer = await mocResponse.arrayBuffer();
        console.log("Moc3ファイル読み込み成功");

        const moc3 = Live2DCubismFramework.CubismMoc.create(mocArrayBuffer);
        const model = Live2DCubismFramework.CubismModel.create(moc3);

        console.log("Live2Dモデルのロード成功");

    } catch (error) {
        console.error("Live2Dモデルのロードに失敗しました", error);
    }
}

window.onload = init;
