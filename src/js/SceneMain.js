import { Scene } from 'phaser'

import sprSand from '../assets/sprSand.png'
import sprGrass from '../assets/sprGrass.png'
import sprWater from '../assets/sprWater.png'
import dude from '../assets/dude.png'

import Chunk from './Chunk'
import Player from './Player'


export default class SceneMain extends Scene {
  constructor() {
    super({ key: "SceneMain" })
  }
  
  preload() {
    // Map
    this.load.image("sprSand", sprSand)
    this.load.image("sprGrass", sprGrass)
    this.load.spritesheet("sprWater", sprWater, {
      frameWidth: 16,
      frameHeight: 16
    })
    // Player
    this.load.spritesheet('dude', dude, { frameWidth: 32, frameHeight: 48 })
  }

  create() {
    this.anims.create({
      key: "sprWater",
      frames: this.anims.generateFrameNumbers("sprWater"),
      frameRate: 5,
      repeat: -1
    })

    this.chunks = [] // Инициализация чанков
    this.chunkSize = 20 // Размер чанков 16x16
    this.tileSize = 16
    this.cameraSpeed = 3

    this.cameras.main.setZoom(2)
    this.followPoint = new Phaser.Math.Vector2(
      this.cameras.main.worldView.x + (this.cameras.main.worldView.width * 0.5),
      this.cameras.main.worldView.y + (this.cameras.main.worldView.height * 0.5)
    )
    // Player init
    this.player = new Player(this)

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'turn',
      frames: [ {key: 'dude', frame: 4 }],
      frameRate: 20
    })

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    })
  }

  getChunk(x, y) {
    let chunk = null

    for (let i = 0; i < this.chunks.length; i++) {
      if (this.chunks[i].x == x && this.chunks[i].y == y) {
        chunk = this.chunks[i]
      }
    }

    return chunk
  }

  update() {
    let snappedChunkX = (this.chunkSize * this.tileSize) * Math.round(this.followPoint.x / (this.chunkSize * this.tileSize))
    let snappedChunkY = (this.chunkSize * this.tileSize) * Math.round(this.followPoint.y / (this.chunkSize * this.tileSize))

    snappedChunkX = snappedChunkX / this.chunkSize / this.tileSize
    snappedChunkY = snappedChunkY / this.chunkSize / this.tileSize

    for (let x = snappedChunkX - 2; x < snappedChunkX + 2; x++) {
      for (let y = snappedChunkY - 2; y < snappedChunkY + 2; y++) {
        let existingChunk = this.getChunk(x, y)

        if (existingChunk == null) {
          const newChunk = new Chunk(this, x, y)
          this.chunks.push(newChunk)
        }
      }
    }

    for (let i = 0; i < this.chunks.length; i++) {
      let chunk = this.chunks[i]

      if (Phaser.Math.Distance.Between(snappedChunkX, snappedChunkY, chunk.x, chunk.y) < 3) {
        if (chunk !== null) {
          chunk.load()
        }
      } else {
        if (chunk !== null) {
          chunk.unload()
        }
      }
    }

    // Player navigation
    this.player.update(this.followPoint, this.cameraSpeed, this.cameras)
  }

  updateChunk() {
    return new Chunk(this, x, y)
  }
}