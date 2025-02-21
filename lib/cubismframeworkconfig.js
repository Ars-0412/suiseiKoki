/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

/**
 * Cubism Framework の設定クラス
 */
class CubismFrameworkConfig {
    constructor() {
        this.supportLog = false;
    }

    /**
     * ログ出力の設定を有効化
     */
    enableLogging() {
        this.supportLog = true;
    }

    /**
     * ログ出力の設定を無効化
     */
    disableLogging() {
        this.supportLog = false;
    }

    /**
     * ログが有効かどうか
     * @return {boolean} - 有効なら `true`
     */
    isLoggingEnabled() {
        return this.supportLog;
    }
}

// `window` に登録してグローバルにアクセス可能にする
window.CubismFrameworkConfig = new CubismFrameworkConfig();
