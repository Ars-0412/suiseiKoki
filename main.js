const Live2DApp = {
    loadAssets: async function(gl, modelDir, modelFile) {
        try {
            console.log("Live2Dモデルのロード開始...");
            
            // Live2DCubismFramework の中身を確認
            console.log("Live2DCubismFramework の状態: ", Live2DCubismFramework);

            // モデル設定ファイル（model3.json）の読み込み
            const response = await fetch(modelDir + modelFile);
            if (!response.ok) throw new Error('モデル設定ファイルの読み込みに失敗しました');

            const jsonData = await response.json();
            console.log("モデル設定の読み込み成功: ", jsonData);

            if (!jsonData.FileReferences || !jsonData.FileReferences.Moc) {
                throw new Error("モデル設定ファイルの 'FileReferences.Moc' が見つかりません");
            }

            const moc3FileName = jsonData.FileReferences.Moc;
            console.log("Moc3 ファイル名: ", moc3FileName);

            // Moc3ファイルの読み込み
            const moc3Response = await fetch(modelDir + moc3FileName);
            if (!moc3Response.ok) throw new Error('Moc3ファイルの読み込みに失敗しました');

            const moc3ArrayBuffer = await moc3Response.arrayBuffer();

            console.log("CubismMoc.create() を呼ぶ前に Live2DCubismFramework をチェック: ", Live2DCubismFramework);
            if (!Live2DCubismFramework || !Live2DCubismFramework.CubismMoc) {
                throw new Error("Live2DCubismFramework が正しくロードされていません");
            }

            const moc3 = Live2DCubismFramework.CubismMoc.create(moc3ArrayBuffer);
            console.log("Moc3の作成成功: ", moc3);

            if (!moc3) throw new Error('Moc3の作成に失敗しました');

            const model = Live2DCubismFramework.CubismModel.create(moc3);
            console.log("モデルオブジェクトの作成成功: ", model);

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
