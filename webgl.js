global.THREE = require('three')

const canvasSketch = require('canvas-sketch')
const random = require('canvas-sketch-util/random')
const palettes = require('nice-color-palettes')
const { color } = require('canvas-sketch-util')

const settings = {
    animate: true,
    dimensions: [1024, 1280],
    fps: 24,
    duration: 6,
    // Get a WebGL canvas rather than 2D
    context: 'webgl',
    // Turn on MSAA
    attributes: { antialias: true },
}

const sketch = ({ context, width, height }) => {
    // Create a renderer
    const renderer = new THREE.WebGLRenderer({
        context,
    })

    // WebGL background color
    renderer.setClearColor('hsl(0, 0%, 95%)', 1)

    // Setup a camera, we will update its settings on resize
    const camera = new THREE.OrthographicCamera()

    // Setup your scene
    const scene = new THREE.Scene()

    // Re-use the same Geometry across all our cubes
    const geometry = new THREE.BoxGeometry(1, 1, 1)

    const palette = random.pick(palettes)

    const cubeCount = 50
    for (let i = 0; i < cubeCount; i++) {
        // Basic "unlit" material with no depth
        const material = new THREE.MeshStandardMaterial({
            color: random.pick(palette),
        })
        // Create the mesh
        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(
            random.range(-2, 1),
            random.range(-4, 3),
            random.range(-4, 2)
        )
        mesh.scale.set(
            random.range(-1, 1),
            random.range(-1, 1),
            random.range(-1, 1)
        )
        // Sets cubes to smaller size
        mesh.scale.multiplyScalar(0.6)
        scene.add(mesh)
    }

    scene.add(new THREE.AmbientLight(random.pick(palette), 0.8))
    const light = new THREE.DirectionalLight(random.pick(palette), 1)
    light.position.set(2, 20, 7)
    scene.add(light)

    // draw each frame
    return {
        // Handle resize events here
        resize({ pixelRatio, viewportWidth, viewportHeight }) {
            renderer.setPixelRatio(pixelRatio)
            renderer.setSize(viewportWidth, viewportHeight)

            const aspect = viewportWidth / viewportHeight

            // Ortho zoom
            const zoom = 3

            // Bounds
            camera.left = -zoom * aspect
            camera.right = zoom * aspect
            camera.top = zoom
            camera.bottom = -zoom

            // Near/Far
            camera.near = -100
            camera.far = 100

            // Set position & look at world center
            camera.position.set(zoom, zoom, zoom)
            camera.lookAt(new THREE.Vector3())

            // Update the camera
            camera.updateProjectionMatrix()
        },
        // And render events here
        render({ playhead }) {
            scene.rotation.y = Math.sin(playhead * Math.PI * 2) * 0.5

            // Draw scene with our camera
            renderer.render(scene, camera)
        },
        // Dispose of WebGL context (optional)
        unload() {
            renderer.dispose()
        },
    }
}

canvasSketch(sketch, settings)
