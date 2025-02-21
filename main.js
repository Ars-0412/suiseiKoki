// Live2Dを表示するWebGLコンテキストを作成
const canvas = document.getElementById("live2dCanvas");
const gl = canvas.getContext("webgl");

// Live2Dモデルのパス（GitHub Pagesのパスに合わせる）
const modelPath = "models/mymodel/suisei_tekoki.model3.json";

// Live2Dの設定
let live2DModel = null;

// WebGLの初期化
function initWebGL() {
    if (!gl) {
        console.error("WebGLの初期化に失敗しました");
        return;
    }
    gl.clearColor(0.0, 0.0, 0.0, 0.0); // 透明背景
    gl.clear(gl.COLOR_BUFFER_BIT);
}

// Live2Dモデルの読み込み
async function loadLive2DModel() {
    console.log("Live2Dモデルをロード中...");

    try {
        const response = await fetch(modelPath);
        if (!response.ok) throw new Error("モデルデータのロードに失敗");
        const modelData = await response.json();

        // Live2Dのモデルを作成
        live2DModel = new Live2DCubismCore.Model(modelData);

        console.log("✅ Live2Dモデルのロードに成功しました！");
        renderLoop(); // 描画ループ開始
    } catch (error) {
        console.error("❌ Live2Dモデルの読み込みに失敗しました:", error);
    }
}

// 描画ループ
function renderLoop() {
    if (!live2DModel || !gl) return;

    gl.clear(gl.COLOR_BUFFER_BIT);
    
    // Live2Dモデルを描画
    live2DModel.draw();

    requestAnimationFrame(renderLoop);
}

// 初期化
initWebGL();
loadLive2DModel();
