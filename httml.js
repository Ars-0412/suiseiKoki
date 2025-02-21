<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Live2D Cubism 5 テスト</title>
    <!-- Live2D Core -->
    <script src="lib/live2dcubismcore.min.js"></script>
    <!-- Live2D Framework -->
    <script src="lib/CubismFramework.js"></script>
    <script src="lib/CubismModelSettingJson.js"></script>
    <script src="lib/CubismModel.js"></script>
    <script src="lib/CubismMotionManager.js"></script>
    <script src="lib/CubismMotion.js"></script>
    <script src="lib/CubismPhysics.js"></script>
    <script src="lib/CubismPose.js"></script>
    <script src="lib/CubismRenderer_WebGL.js"></script>
    <!-- メインスクリプト -->
    <script src="main.js" defer></script>
    <style>
        body { margin: 0; overflow: hidden; }
        canvas { display: block; }
    </style>
</head>
<body>
    <canvas id="live2dCanvas"></canvas>
</body>
</html>
