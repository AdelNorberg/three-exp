import { Noise } from 'noisejs'
import Tile from './Tile'

console.log(Noise)
var noise = new Noise(Math.random())

export default class Chunk {
  constructor(scene, x, y) {
    this.x = x
    this.y = y
    this.scene = scene
    this.tiles = this.scene.add.group()
    this.isLoaded = false
  }

  unload() {
    if (this.isLoaded) {
      this.tiles.clear(true, true)

      this.isLoaded = false
    }
  }

  load() {
    if(!this.isLoaded) {
      for (let x = 0; x < this.scene.chunkSize; x++) {
        for (let y = 0; y < this.scene.chunkSize; y++) {
          let tileX = (this.x * (this.scene.chunkSize * this.scene.tileSize)) + (x * this.scene.tileSize)
          let tileY = (this.y * (this.scene.chunkSize * this.scene.tileSize)) + (y * this.scene.tileSize)

          let perlinValue = noise.perlin2(tileX / 100, tileY / 100)
          let key = ""
          let animationKey = ""

          if (perlinValue < 0.2) {
            key = "sprWater"
            animationKey = "sprWater"
          }

          else if (perlinValue >= 0.2 && perlinValue < 0.3) {
            key = "sprSand"
          }

          else if (perlinValue >= 0.3) {
            key = "sprGrass"
          }

          let tile = new Tile(this.scene, tileX, tileY, key)

          if (animationKey !== "") {
            tile.play(animationKey)
          }

          this.tiles.add(tile)
        }
      }

      this.isLoaded = true
    }
  }
}