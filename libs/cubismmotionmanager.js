/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

/**
 * Live2D Cubism モーション管理クラス
 */
class CubismMotionManager {
    constructor() {
        this.currentMotion = null;
        this.motions = {};
    }

    /**
     * モーションを登録する
     * @param {string} name - モーション名
     * @param {Object} motion - モーションデータ
     */
    addMotion(name, motion) {
        this.motions[name] = motion;
    }

    /**
     * 指定したモーションを再生する
     * @param {string} name - モーション名
     */
    startMotion(name) {
        if (this.motions[name]) {
            this.currentMotion = this.motions[name];
            console.log(`CubismMotionManager: モーション '${name}' を開始`);
        } else {
            console.warn(`CubismMotionManager: モーション '${name}' が見つかりません`);
        }
    }

    /**
     * モーションの更新 (ダミー関数)
     */
    update() {
        if (this.currentMotion) {
            console.log("CubismMotionManager: モーション更新中...");
        }
    }
}

// `window` に登録してグローバルにアクセス可能にする
window.CubismMotionManager = CubismMotionManager;
