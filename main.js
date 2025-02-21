import { Live2DModel } from "./lib/cubismmodel.js";
import { CubismFramework } from "./lib/cubismframeworkconfig.js";
import { CubismMoc } from "./lib/cubismmoc.js";
import { CubismMotion } from "./lib/cubismmotion.js";
import { CubismMotionManager } from "./lib/cubismmotionmanager.js";
import { CubismPhysics } from "./lib/cubismphysics.js";
import { CubismPose } from "./lib/cubismpose.js";
import { CubismRenderer_WebGL } from "./lib/cubismrenderer_webgl.js";

// WebGL コンテキストの作成
let canvas = document.getElementById("live2dCanvas");
let gl = canvas.getContext("webgl");

if (!gl) {
    console.error("WebGL がサポートされていません");
}

// Live2D Cubism の初期化
CubismFramework.startUp();
CubismFramework.initialize();

async function loadLive2DModel() {
    console.log("Live2Dモデルをロード中...");

    try {
        const model = await Live2DModel.from("./models/suisei/suisei_tekoki.model3.json", {
            autoInteract: true,
        });

        console.log("Live2Dモデルのロード成功:", model);
        
        model.scale.set(0.5, 0.5);
        model.position.set(0, 0);

        document.body.appendChild(model.view);
    } catch (error) {
        console.error("Live2Dモデルのロードに失敗しました:", error);
    }
}

window.onload = async function () {
    console.log("WebGLコンテキスト取得成功");
    await loadLive2DModel();
};
