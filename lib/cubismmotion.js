window.Live2DCubismFramework = window.Live2DCubismFramework || {};

class CubismMotion {
    constructor(name) {
        this.name = name;
    }

    play() {
        console.log(`${this.name} を再生`);
    }
}

// `window` に追加
window.Live2DCubismFramework.CubismMotion = CubismMotion;
