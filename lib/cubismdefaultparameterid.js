/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

/**
 * デフォルトパラメータIDを管理するクラス
 */
const CubismDefaultParameterId = {
    ParamAngleX: "PARAM_ANGLE_X",
    ParamAngleY: "PARAM_ANGLE_Y",
    ParamAngleZ: "PARAM_ANGLE_Z",
    ParamEyeLOpen: "PARAM_EYE_L_OPEN",
    ParamEyeROpen: "PARAM_EYE_R_OPEN",
    ParamEyeBallX: "PARAM_EYE_BALL_X",
    ParamEyeBallY: "PARAM_EYE_BALL_Y",
    ParamMouthOpenY: "PARAM_MOUTH_OPEN_Y"
};

// `window` に登録することでグローバルアクセス可能にする
window.CubismDefaultParameterId = CubismDefaultParameterId;
