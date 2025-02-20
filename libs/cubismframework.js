/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

// グローバル変数定義
let s_isStarted = false;
let s_isInitialized = false;
let s_option = null;
let s_cubismIdManager = null;

window.CubismFramework = {
    startUp: function (option = null) {
        if (s_isStarted) {
            console.log('CubismFramework.startUp() is already done.');
            return s_isStarted;
        }
        s_option = option;
        if (s_option != null && Live2DCubismCore && Live2DCubismCore.Logging) {
            Live2DCubismCore.Logging.csmSetLogFunction(s_option.logFunction);
        }
        s_isStarted = true;

        if (s_isStarted && Live2DCubismCore && Live2DCubismCore.Version) {
            const version = Live2DCubismCore.Version.csmGetVersion();
            const major = (version & 0xff000000) >> 24;
            const minor = (version & 0x00ff0000) >> 16;
            const patch = version & 0x0000ffff;
            console.log(`Live2D Cubism Core version: ${major}.${minor}.${patch}`);
        }

        console.log('CubismFramework.startUp() is complete.');
        return s_isStarted;
    },

    initialize: function (memorySize = 0) {
        if (!s_isStarted) {
            console.warn('CubismFramework is not started.');
            return;
        }

        if (s_isInitialized) {
            console.warn('CubismFramework.initialize() skipped, already initialized.');
            return;
        }

        if (!s_cubismIdManager) {
            s_cubismIdManager = {}; // 修正: オブジェクトとして仮初期化
        }

        if (Live2DCubismCore && Live2DCubismCore.Memory) {
            Live2DCubismCore.Memory.initializeAmountOfMemory(memorySize);
        }
        s_isInitialized = true;
        console.log('CubismFramework.initialize() is complete.');
    },

    dispose: function () {
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
    },

    isStarted: function () {
        return s_isStarted;
    },

    isInitialized: function () {
        return s_isInitialized;
    },

    getIdManager: function () {
        return s_cubismIdManager;
    }
};