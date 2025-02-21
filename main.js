window.onload = async function() {
    const canvas = document.getElementById("live2dCanvas");
    const gl = canvas.getContext("webgl");

    if (!gl) {
        console.error("WebGL コンテキストの取得に失敗しました。");
        return;
    }

    console.log("✅ WebGLコンテキスト取得成功");

    // Live2Dモデルのロード
    await loadLive2DModel(gl, "models/suisei/suisei_tekoki.model3.json");
};

async function loadLive2DModel(gl, modelFile) {
    try {
        console.log("📂 Live2Dモデルのロード中...");

        const response = await fetch(modelFile);
        if (!response.ok) {
            throw new Error("❌ モデル設定ファイルの読み込みに失敗しました。");
        }

        const arrayBuffer = await response.arrayBuffer();
        const setting = new window.CubismModelSettingJson(arrayBuffer);

        console.log("✅ モデル設定読み込み成功");
        console.log("📌 Moc3 ファイル: ", setting.getModelFileName());

        const moc3Response = await fetch("models/suisei/" + setting.getModelFileName());
        if (!moc3Response.ok) {
            throw new Error("❌ Moc3ファイルの読み込みに失敗しました。");
        }

        const moc3ArrayBuffer = await moc3Response.arrayBuffer();
        const moc3 = window.CubismMoc.create(moc3ArrayBuffer);

        if (!moc3) {
            throw new Error("❌ Moc3の作成に失敗しました。");
        }

        console.log("✅ Moc3作成成功");
    } catch (error) {
        console.error("🚨 Live2Dモデルのロードに失敗しました: ", error);
    }
}
