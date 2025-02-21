window.Live2DCubismFramework = window.Live2DCubismFramework || {};

class CubismModelSettingJson {
    constructor(arrayBuffer) {
        this._json = JSON.parse(new TextDecoder().decode(arrayBuffer));
    }

    getModelFileName() {
        return this._json.Model.File;
    }

    getTextureCount() {
        return this._json.Textures.length;
    }

    getTextureFileName(index) {
        return this._json.Textures[index];
    }
}

// `window` に追加
window.Live2DCubismFramework.CubismModelSettingJson = CubismModelSettingJson;
