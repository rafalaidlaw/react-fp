import {
  BATTLE_BACKGROUND_ASSET_KEYS,
  MONSTER_ASSET_KEYS,
} from '../assets/asset-keys.js';
import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from './scene-keys.js';

export class BattleScene extends Phaser.Scene {
  constructor() {
    super({
      key: SCENE_KEYS.BATTLE_SCENE,
    });
  }

  create() {
    console.log(`[${BattleScene.name}:create] invoked`);
    // create main background
    this.add.sprite(0, 0, BATTLE_BACKGROUND_ASSET_KEYS.FOREST).setOrigin(0);

    // render out the player and enemy monsters
    this.add.sprite(240, 50, MONSTER_ASSET_KEYS.ENEMY, 0).setScale(1.5);
    this.add
      .image(75, 112, MONSTER_ASSET_KEYS.ORPHAN, 0)
      .setFlipX(true)
      .setScale(2);
  }
}
