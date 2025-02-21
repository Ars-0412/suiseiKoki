import { Live2DModel } from "./lib/cubismmodel.js";
import { CubismFramework } from "./lib/cubismframeworkconfig.js";
import { CubismMoc } from "./lib/cubismmoc.js";
import { CubismMotion } from "./lib/cubismmotion.js";
import { CubismMotionManager } from "./lib/cubismmotionmanager.js";
import { CubismPhysics } from "./lib/cubismphysics.js";
import { CubismPose } from "./lib/cubismpose.js";
import { CubismRenderer_WebGL } from "./lib/cubismrenderer_webgl.js";

async function init() {
    const canvas = document.getElementById("live2dCanvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    if (!gl) {
        console.error("WebGLコンテキスト取得失敗");
        return;
    }

    console.log("WebGLコンテキスト取得成功");
    CubismFramework.startUp();
    CubismFramework.initialize();

    try {
        const model = await Live2DModel.from("./models/suisei/suisei_tekoki.model3.json");

        model.scale.set(1.0, 1.0);
        model.x = 0;
        model.y = 0;

        model.renderer = new CubismRenderer_WebGL();
        model.renderer.initialize(gl);
        model.renderer.model = model.internalModel;
        model.update = true;

        console.log("Live2Dモデルのロード成功");
    } catch (error) {
        console.error("Live2Dモデルのロードに失敗しました:", error);
    }
}

window.onload = init;
