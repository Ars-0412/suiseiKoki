// 必要なモジュールをインポート
const {
    Live2DCubismFramework: {
        CubismFramework,
        CubismModelSettingJson,
        CubismDefaultParameterId,
        CubismDefaultPartId,
        CubismMatrix44,
        CubismViewMatrix,
        CubismMotionManager,
        CubismMotion,
        CubismPhysics,
        CubismPose,
        CubismRenderer_WebGL
    }
} = window;

// Live2Dを表示するWebGLコンテキストを作成
const canvas = document.getElementById("live2dCanvas");
const gl = canvas.getContext("webgl");

// **Live2Dモデルのパス**
const modelDir = "models/suisei/";
const modelFile = "suisei_tekoki.model3.json";
const modelPath = modelDir + modelFile;

// Live2Dの設定
let live2DModel = null;
let cubismRenderer = null;

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
        // モデルJSONの読み込み
        const response = await fetch(modelPath);
        if (!response.ok) throw new Error("モデルデータのロードに失敗");

        const modelData = await response.arrayBuffer();

        // Live2Dの初期化
        CubismFramework.startUp();
        CubismFramework.initialize();

        // モデル設定の読み込み
        const setting = new CubismModelSettingJson(modelData, modelData.byteLength);

        // `moc3` ファイルのパス取得
        const moc3File = setting.getModelFileName();
        const moc3Response = await fetch(modelDir + moc3File);
        const moc3Data = await moc3Response.arrayBuffer();

        // モデルの読み込み
        live2DModel = CubismFramework.loadMoc(moc3Data);

        // レンダラーの初期化
        cubismRenderer = new CubismRenderer_WebGL();
        cubismRenderer.initialize(live2DModel);
        cubismRenderer.bindTexture(0, null);
        cubismRenderer.setModel(live2DModel);

        console.log("✅ Live2Dモデルのロードに成功しました！");
        renderLoop();
    } catch (error) {
        console.error("Live2Dモデルの読み込みに失敗しました:", error);
    }
}

// レンダリングループ
function renderLoop() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    cubismRenderer.drawModel();
    requestAnimationFrame(renderLoop);
}

// 初期化処理
function init() {
    initWebGL();
    loadLive2DModel();
}

init();
