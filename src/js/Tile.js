import { GameObjects } from 'phaser'

export default class Tile extends GameObjects.Sprite {
  constructor(scene, x, y, key) {
      super(scene, x, y, key)
      this.scene = scene
      this.scene.add.existing(this)
      this.setOrigin(0)
  }
}