/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

// 必要なグローバル変数
let s_isStarted = false;
let s_isInitialized = false;
let s_option = null;
let s_cubismIdManager = null;

/**
 * Framework内で使う定数の宣言
 */
const Constant = Object.freeze({
    vertexOffset: 0,
    vertexStep: 2
});

/**
 * Cubism Framework クラス
 */
class CubismFramework {
    /**
     * Cubism FrameworkのAPIを使用可能にする
     * @param {Object} option - オプション設定
     * @return {boolean} - 初期化成功時 `true`
     */
    static startUp(option = null) {
        if (s_isStarted) {
            console.log('CubismFramework.startUp() is already done.');
            return s_isStarted;
        }
        s_option = option;
        s_isStarted = true;
        console.log('CubismFramework.startUp() is complete.');
        return s_isStarted;
    }

    /**
     * Frameworkのリソースを初期化する
     */
    static initialize() {
        if (!s_isStarted) {
            console.warn('CubismFramework is not started.');
            return;
        }
        if (s_isInitialized) {
            console.warn('CubismFramework.initialize() skipped, already initialized.');
            return;
        }
        s_cubismIdManager = new CubismIdManager();
        s_isInitialized = true;
        console.log('CubismFramework.initialize() is complete.');
    }

    /**
     * Frameworkのリソースを解放する
     */
    static dispose() {
        if (!s_isStarted) {
            console.warn('CubismFramework is not started.');
            return;
        }
        if (!s_isInitialized) {
            console.warn('CubismFramework.dispose() skipped, not initialized.');
            return;
        }
        s_cubismIdManager = null;
        s_isInitialized = false;
        console.log('CubismFramework.dispose() is complete.');
    }

    /**
     * Cubism Framework の API を使用可能かチェック
     * @return {boolean} - 使用可能なら `true`
     */
    static isStarted() {
        return s_isStarted;
    }

    /**
     * Cubism Framework が初期化されているかチェック
     * @return {boolean} - 初期化済みなら `true`
     */
    static isInitialized() {
        return s_isInitialized;
    }
}

// `window` に登録してグローバルにアクセス可能にする
window.CubismFramework = CubismFramework;
window.CubismConstant = Constant;
