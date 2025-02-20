/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

/**
 * Live2D Cubism モデル管理クラス
 */
class CubismModel {
    constructor() {
        this.parameters = {};
    }

    /**
     * パラメータの値を設定する
     * @param {string} name - パラメータ名
     * @param {number} value - 設定する値
     */
    setParameter(name, value) {
        this.parameters[name] = value;
    }

    /**
     * パラメータの値を取得する
     * @param {string} name - パラメータ名
     * @return {number} - 現在の値
     */
    getParameter(name) {
        return this.parameters[name] || 0;
    }

    /**
     * モデルを更新する (ダミー関数)
     */
    update() {
        console.log("CubismModel: update() called");
    }
}

// `window` に登録してグローバルにアクセス可能にする
window.CubismModel = CubismModel;
