import * as THREE from 'three'
import CANNON from 'cannon'

export const createSphere = (sphereGeometry, sphereMaterial, radius, position, scene, material, world, playHitSound) => {
    // Three.js mesh
    const mesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
    mesh.scale.set(radius, radius, radius)
    mesh.castShadow = true
    mesh.position.copy(position)
    scene.add(mesh)

    // Cannon.js body
    const shape = new CANNON.Sphere(radius)
    const body = new CANNON.Body({
        mass: 1,
        shape,
        material
    })
    body.position.copy(position)
    body.addEventListener('collide', playHitSound)
    world.addBody(body)

    return { mesh, body }
}

export const createBox = (boxGeometry, boxMaterial, size, position, scene, material, world, playHitSound) => {
    // Three.js mesh
    const mesh = new THREE.Mesh(boxGeometry, boxMaterial)
    mesh.scale.set(size, size, size)
    mesh.castShadow = true
    mesh.position.copy(position)
    scene.add(mesh)

    // Cannon.js body
    const shape = new CANNON.Box(new CANNON.Vec3(size, size, size))
    const body = new CANNON.Body({
        mass: 1,
        shape,
        material
    })
    body.position.copy(position)
    body.addEventListener('collide', playHitSound)
    world.addBody(body)

    return { mesh, body }
}