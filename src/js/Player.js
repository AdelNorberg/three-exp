import { Input } from 'phaser'

export default class Player {
  constructor(scene) {
    this.scene = scene
    this.player = scene.physics.add.sprite(980, 500, 'dude')
    this.player.setDepth(1)
    scene.cameras.main.startFollow(this.player, true, 0.08, 0.08)
    // Биндинг WSAD
    this.keyW = scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.W) 
    this.keyS = scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.S)
    this.keyA = scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.A)
    this.keyD = scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.D)
  }

  update(followPoint, cameraSpeed, cameras) {
    // Движение с анимациями
    if (this.keyW.isDown || this.keyS.isDown || this.keyA.isDown || this.keyD.isDown) {
      if (this.keyW.isDown) {
        followPoint.y -= cameraSpeed
        this.player.y -= cameraSpeed
      }
  
      if (this.keyS.isDown) {
        followPoint.y += cameraSpeed
        this.player.y += cameraSpeed
      }
      
      if (this.keyA.isDown) {
        followPoint.x -= cameraSpeed
        this.player.x -= cameraSpeed
        this.player.anims.play('left', true)
      }
  
      if (this.keyD.isDown) {
        followPoint.x += cameraSpeed
        this.player.x += cameraSpeed
        this.player.anims.play('right', true)
      }
    } else {
      this.player.anims.play('turn');
    }

    //cameras.main.startFollow(this.player, true, 0.08, 0.08)
  }
}