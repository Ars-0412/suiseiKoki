window.Live2DCubismFramework = window.Live2DCubismFramework || {};

class CubismMotionManager {
    constructor() {
        this._motions = [];
    }

    addMotion(motion) {
        this._motions.push(motion);
    }

    getMotions() {
        return this._motions;
    }
}

// `window` に追加
window.Live2DCubismFramework.CubismMotionManager = CubismMotionManager;

