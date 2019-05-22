import * as dat from 'dat.gui'

const gui = new dat.GUI()

export const map = {
  generationMapX: 1000,
  generationMapY: 1000
}

const chunk = gui.addFolder('Map')
chunk.add(map, 'generationMapX').min(100).max(5000).step(10)
chunk.add(map, 'generationMapY').min(100).max(5000).step(10)
