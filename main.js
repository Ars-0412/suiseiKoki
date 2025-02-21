// Live2Dのセットアップ
Live2DCubismFramework.CubismFramework.startUp();
Live2DCubismFramework.CubismFramework.initialize();

// WebGLのセットアップ
const canvas = document.getElementById("live2dCanvas");
const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

if (!gl) {
    console.error("WebGLがサポートされていません");
}

// Live2Dモデルの読み込み関数
async function loadLive2DModel() {
    try {
        console.log("Live2Dモデルをロード中...");

        // モデルのパス
        const modelDir = "models/suisei/";
        const modelFile = "suisei.model3.json";

        // モデルデータの読み込み
        const model = await Live2DApp.loadAssets(gl, modelDir, modelFile);

        // モデルのレンダリング設定
        model.update = function(dt) {
            model.getModel().update();
        };

        // 描画ループ
        function tick() {
            gl.clear(gl.COLOR_BUFFER_BIT);
            model.update(16);
            model.draw(gl);
            requestAnimationFrame(tick);
        }

        tick();

    } catch (error) {
        console.error("Live2Dモデルの読み込みに失敗しました:", error);
    }
}

// モデルを読み込む
loadLive2DModel();
