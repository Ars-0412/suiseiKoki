const Live2DApp = {
    loadAssets: async function(gl, modelDir, modelFile) {
        try {
            console.log("Live2Dモデルのロード開始...");

            // モデル設定ファイル（model3.json）の読み込み
            const response = await fetch(modelDir + modelFile);
            if (!response.ok) throw new Error('モデル設定ファイルの読み込みに失敗しました');

            const arrayBuffer = await response.arrayBuffer();
            const setting = new Live2DCubismFramework.CubismModelSettingJson(arrayBuffer);
            console.log("モデル設定の読み込み成功: ", setting);

            // Moc3ファイルの読み込み
            const moc3FileName = setting.getModelFileName();
            const moc3Response = await fetch(modelDir + moc3FileName);
            if (!moc3Response.ok) throw new Error('Moc3ファイルの読み込みに失敗しました');

            const moc3ArrayBuffer = await moc3Response.arrayBuffer();
            const moc3 = Live2DCubismFramework.CubismMoc.create(moc3ArrayBuffer);
            console.log("Moc3の作成成功: ", moc3);

            if (!moc3) throw new Error('Moc3の作成に失敗しました');

            const model = Live2DCubismFramework.CubismModel.create(moc3);
            console.log("モデルオブジェクトの作成成功: ", model);

            // テクスチャの読み込み
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
            console.error("Live2Dモデルのロードに失敗しました: ", error);
            return null;
        }
    },

    init: async function() {
        const canvas = document.getElementById("live2dCanvas");
        const gl = canvas.getContext("webgl");
        if (!gl) {
            console.error("WebGLコンテキストの取得に失敗しました。");
            return;
        }

        console.log("WebGLコンテキスト取得成功");

        const modelDir = "models/suisei/";
        const modelFile = "suisei_tekoki.model3.json";

        console.log("モデルファイルをロード: ", modelDir + modelFile);
        const model = await this.loadAssets(gl, modelDir, modelFile);

        if (!model) {
            console.error("モデルのロードに失敗しました");
            return;
        }

        console.log("Live2Dモデルのロード成功！");
    }
};

// Live2Dアプリの初期化
window.onload = () => {
    Live2DApp.init();
};
