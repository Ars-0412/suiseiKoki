/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at:
 * https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html
 */

// CubismRenderer クラスの定義
var CubismRenderer = (function () {
    function CubismRenderer() {
        this._isCulling = true;
    }

    /**
     * カリングの設定
     * @param culling 有効にする場合は true、無効にする場合は false
     */
    CubismRenderer.prototype.setCulling = function (culling) {
        this._isCulling = culling;
    };

    /**
     * カリングの状態を取得
     * @return 現在のカリング設定
     */
    CubismRenderer.prototype.isCulling = function () {
        return this._isCulling;
    };

    /**
     * モデル描画の前処理
     */
    CubismRenderer.prototype.preDraw = function () {
        // ここに描画前処理を追加
        console.log("CubismRenderer: preDraw");
    };

    /**
     * モデル描画処理
     */
    CubismRenderer.prototype.drawModel = function () {
        console.log("CubismRenderer: drawModel 実行");
        // ここに描画処理を追加
    };

    return CubismRenderer;
})();

// グローバルオブジェクトに追加
window.CubismRenderer = CubismRenderer;
