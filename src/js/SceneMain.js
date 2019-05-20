import { Scene } from 'phaser'

import sprSand from '../assets/sprSand.png'
import sprGrass from '../assets/sprGrass.png'
import sprWater from '../assets/sprWater.png'

import Chunk from './Chunk'

export default class SceneMain extends Scene {
  constructor() {
    super({ key: "SceneMain" });
  }

  preload() {
    this.load.image("sprSand", sprSand)
    this.load.image("sprGrass", sprGrass)
    this.load.spritesheet("sprWater", sprWater, {
      frameWidth: 16,
      frameHeight: 16
    })
  }

  create() {
    this.anims.create({
      key: "sprWater",
      frames: this.anims.generateFrameNumbers("sprWater"),
      frameRate: 5,
      repeat: -1
    });

    this.chunkSize = 16;
    this.tileSize = 16;
    this.cameraSpeed = 10;

    this.cameras.main.setZoom(2)
    this.followPoint = new Phaser.Math.Vector2(
      this.cameras.main.worldView.x + (this.cameras.main.worldView.width * 0.5),
      this.cameras.main.worldView.y + (this.cameras.main.worldView.height * 0.5)
    );

    this.chunks = []

    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
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
          let newChunk = new Chunk(this, x, y)
          this.chunks.push(newChunk)
        }
      }
    }

    for (let i = 0; i < this.chunks.length; i++) {
      let chunk = this.chunks[i];

      if (Phaser.Math.Distance.Between(
        snappedChunkX,
        snappedChunkY,
        chunk.x,
        chunk.y
      ) < 3) {
        if (chunk !== null) {
          chunk.load();
        }
      } else {
        if (chunk !== null) {
          chunk.unload();
        }
      }
    }

    if (this.keyW.isDown) {
      this.followPoint.y -= this.cameraSpeed;
    }

    if (this.keyS.isDown) {
      this.followPoint.y += this.cameraSpeed;
    }
    
    if (this.keyA.isDown) {
      this.followPoint.x -= this.cameraSpeed;
    }

    if (this.keyD.isDown) {
      this.followPoint.x += this.cameraSpeed;
    }

    this.cameras.main.centerOn(this.followPoint.x, this.followPoint.y);
  }
}