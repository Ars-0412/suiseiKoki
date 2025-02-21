window.Live2DCubismFramework = window.Live2DCubismFramework || {};

class CubismModel {
    constructor(moc) {
        this._moc = moc;
    }

    getMoc() {
        return this._moc;
    }
}

// `window` に追加
window.Live2DCubismFramework.CubismModel = CubismModel;

