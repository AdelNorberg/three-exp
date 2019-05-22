import Phaser from "phaser"
import SceneMain from './js/SceneMain'

const config = {
  type: Phaser.AUTO,
  width: '100%',
  height: '100%',
  backgroundColor: 'white',
  physics: {
    default: 'arcade',
    arcade: {Gravity: { x: 0, y: 0 }}
  },
  scene: [ SceneMain ],
  pixelArt: true,
  roundPixels: true
}

const game = new Phaser.Game(config)