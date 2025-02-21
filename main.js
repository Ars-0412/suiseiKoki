
// Live2DAppオブジェクトの定義
const Live2DApp = {
    loadAssets: async function(gl, modelDir, modelFile) {
        try {
            // モデル設定ファイル（model3.json）の読み込み
            const response = await fetch(modelDir + modelFile);
            if (!response.ok) {
                throw new Error('モデル設定ファイルの読み込みに失敗しました');
            }
            const arrayBuffer = await response.arrayBuffer();
            const setting = new Live2DCubismFramework.CubismModelSettingJson(arrayBuffer);

            // Moc3ファイルの読み込み
            const moc3FileName = setting.getModelFileName();
            const moc3Response = await fetch(modelDir + moc3FileName);
            if (!moc3Response.ok) {
                throw new Error('Moc3ファイルの読み込みに失敗しました');
            }
            const moc3ArrayBuffer = await moc3Response.arrayBuffer();
            const moc3 = Live2DCubismFramework.CubismMoc.create(moc3ArrayBuffer);
            const model = Live2DCubismFramework.CubismModel.create(moc3);

            // テクスチャの読み込みとバインド
            const textureCount = setting.getTextureCount();
            for (let i = 0; i < textureCount; i++) {
                const textureFileName = setting.getTextureFileName(i);
                if (textureFileName) {
                    const textureImage = new Image();
                    textureImage.src = modelDir + textureFileName;
                    await new Promise((resolve) => {
                        textureImage.onload = () => {
                            const texture = gl.createTexture();
                            gl.bindTexture(gl.TEXTURE_2D, texture);
                            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureImage);
                            resolve();
                        };
                    });
                }
            }

            return model;
        } catch (error) {
            console.error("Live2Dモデルのロードに失敗しました:", error);
            return null;
        }
    }
};

// WebGL のセットアップ
const canvas = document.getElementById("live2dCanvas");
const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

if (!gl) {
    console.error("WebGLがサポートされていません");
}

// Live2Dのセットアップ
async function loadLive2DModel() {
    console.log("Live2Dモデルをロード中...");

    // モデルのパス
    const modelDir = "models/suisei/";
    const modelFile = "suisei_tekoki.model3.json";

    try {
        const model = await Live2DApp.loadAssets(gl, modelDir, modelFile);

        if (!model) {
            throw new Error("モデルのロードに失敗しました");
        }

        // Live2Dのレンダリング設定
        const cubismRenderer = new Live2DCubismFramework.CubismRenderer_WebGL();
        cubismRenderer.initialize(model);
        cubismRenderer.bindTexture(0, null);
        cubismRenderer.setModel(model);

        console.log("✅ Live2Dモデルのロードに成功しました！");

        // レンダリングループ
        function renderLoop() {
            gl.clear(gl.COLOR_BUFFER_BIT);
            cubismRenderer.drawModel();
            requestAnimationFrame(renderLoop);
        }
        renderLoop();

    } catch (error) {
        console.error("Live2Dモデルの読み込み中にエラーが発生しました:", error);
    }
}

// 初期化処理
function init() {
    if (!gl) {
        console.error("WebGLがサポートされていません");
        return;
    }
    loadLive2DModel();
}

init();
