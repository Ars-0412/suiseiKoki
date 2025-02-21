async function loadLive2DModel() {
    console.log("Live2Dモデルのロード中...");

    if (!window.CubismFramework) {
        console.error("Live2D Cubism Framework がロードされていません！");
        return;
    }

    try {
        // Live2Dモデルの設定
        const modelPath = "models/suisei/suisei_tekoki.model3.json";
        const modelSetting = new CubismModelSettingJson(await fetch(modelPath).then(res => res.json()));

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
        const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

        if (!gl) {
            throw new Error("WebGLコンテキストが取得できませんでした！");
        }

        console.log("WebGLコンテキスト取得成功");

        // Live2Dモデルの作成
        const model = new CubismModel();
        model.loadModel(moc);

        console.log("Live2Dモデルのロード完了");

    } catch (error) {
        console.error("Live2Dモデルのロードに失敗しました: ", error);
    }
}

async function init() {
    console.log("Live2Dモデルのロードを開始...");

    // Live2D Cubism Framework の初期化
    if (!window.CubismFramework) {
        console.error("Live2D Cubism Framework がロードされていません！");
        return;
    }

    CubismFramework.startUp();
    CubismFramework.initialize();

    console.log("Live2D Cubism Framework の初期化成功");

    await loadLive2DModel();
}

window.onload = init;
