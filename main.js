// Live2DAppオブジェクトの定義
const Live2DApp = {
    loadAssets: async function(gl, modelDir, modelFile) {
        console.log("Live2Dモデルロード開始");
        console.log("モデルディレクトリ:", modelDir);
        console.log("モデルファイル:", modelFile);

        try {
            // モデル設定ファイル（model3.json）の読み込み
            const response = await fetch(modelDir + modelFile);
            console.log("fetch response:", response);

            if (!response.ok) {
                console.error("model3.json の読み込みに失敗:", response.status, response.statusText);
                throw new Error('モデル設定ファイルの読み込みに失敗しました');
            }
            
            const arrayBuffer = await response.arrayBuffer();
            console.log("model3.json 読み込み成功");

            if (!window.Live2DCubismFramework || !window.Live2DCubismFramework.CubismModelSettingJson) {
                console.error("Live2DCubismFramework.CubismModelSettingJson が見つかりません");
                throw new Error("CubismModelSettingJson が未定義です");
            }

            const setting = new window.Live2DCubismFramework.CubismModelSettingJson(arrayBuffer);
            console.log("モデル設定読み込み成功:", setting);

            // Moc3ファイルの読み込み
            const moc3FileName = setting.getModelFileName();
            if (!moc3FileName) {
                console.error("moc3ファイル名が取得できません");
                throw new Error("Moc3ファイル名が不明です");
            }

            console.log("Moc3ファイル名:", moc3FileName);
            const moc3Response = await fetch(modelDir + moc3FileName);
            if (!moc3Response.ok) {
                console.error("Moc3ファイルの読み込みに失敗:", moc3Response.status, moc3Response.statusText);
                throw new Error('Moc3ファイルの読み込みに失敗しました');
            }

            const moc3ArrayBuffer = await moc3Response.arrayBuffer();
            const moc3 = window.Live2DCubismFramework.CubismMoc.create(moc3ArrayBuffer);
            if (!moc3) {
                throw new Error("Moc3 の作成に失敗しました");
            }

            const model = window.Live2DCubismFramework.CubismModel.create(moc3);
            console.log("モデルの作成成功:", model);

            // テクスチャの読み込みとバインド
            const textureCount = setting.getTextureCount();
            console.log("テクスチャの数:", textureCount);

            for (let i = 0; i < textureCount; i++) {
                const textureFileName = setting.getTextureFileName(i);
                if (textureFileName) {
                    console.log(`テクスチャ ${i}: ${textureFileName}`);
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

            console.log("すべてのアセットが正常にロードされました");
            return model;
        } catch (error) {
            console.error("Live2Dモデルのロードに失敗しました:", error);
            return null;
        }
    }
};

// モデルの初期化処理
async function init() {
    console.log("Live2D 初期化開始");

    const canvas = document.getElementById("live2dCanvas");
    if (!canvas) {
        console.error("Canvas が見つかりません");
        return;
    }

    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) {
        console.error("WebGL コンテキストの取得に失敗しました");
        return;
    }

    console.log("WebGL コンテキスト取得成功");

    const modelDir = "models/suisei/";  // モデルのディレクトリ
    const modelFile = "suisei_tekoki.model3.json";  // モデルの設定ファイル名

    const model = await Live2DApp.loadAssets(gl, modelDir, modelFile);
    if (!model) {
        console.error("モデルのロードに失敗しました");
        return;
    }

    console.log("Live2D モデルのロード完了:", model);
}

// ページのロード時に初期化
window.onload = init;

