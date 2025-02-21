// Live2DAppオブジェクトの定義
const Live2DApp = {
    loadAssets: async function(gl, modelDir, modelFile) {
        // モデル設定ファイル（model3.json）の読み込み
        const response = await fetch(modelDir + modelFile);
        if (!response.ok) {
            throw new Error('モデル設定ファイルの読み込みに失敗しました');
        }
        const arrayBuffer = await response.arrayBuffer();
        const setting = new Live2DCubismFramework.CubismModelSettingJson(arrayBuffer);

        // Moc3ファイルの読み込み
        const moc3FileName = setting.getModelFileName();
        const moc3Response = await fetch(modelDir + moc3FileName);
        if (!moc3Response.ok) {
            throw new Error('Moc3ファイルの読み込みに失敗しました');
        }
        const moc3ArrayBuffer = await moc3Response.arrayBuffer();
        const moc3 = Live2DCubismFramework.CubismMoc.create(moc3ArrayBuffer);
        const model = Live2DCubismFramework.CubismModel.create(moc3);

        // テクスチャの読み込みとバインド
        const textureCount = setting.getTextureCount();
        for (let i = 0; i < textureCount; i++) {
            const textureFileName = setting.getTextureFileName(i);
            if (textureFileName) {
                const textureImage = new Image();
                textureImage.src = modelDir + textureFileName;
                await new Promise((resolve) => {
                    textureImage.onload = () => {
                        const texture = gl.createTexture();
                        gl.bindTexture(gl.TEXTURE_2D, texture);
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR
::contentReference[oaicite:0]{index=0}
 
