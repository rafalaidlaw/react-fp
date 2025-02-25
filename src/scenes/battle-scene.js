import {
  BATTLE_ASSET_KEYS,
  BATTLE_BACKGROUND_ASSET_KEYS,
  HEALTH_BAR_ASSET_KEYS,
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

    // render out the player health bar
    const playerMonsterName = this.add.text(30, 20, MONSTER_ASSET_KEYS.ORPHAN, {
      color: '#7E3D3F',
      fontSize: '32px',
    });
    this.add
      .container(130, 110, [
        this.add
          .image(0, 0, BATTLE_ASSET_KEYS.HEALTH_BAR_BACKGROUND)
          .setOrigin(0),
        playerMonsterName,
        this.#createHealth(34, 34),
        this.add.text(playerMonsterName.width + 35, 23, 'L5', {
          color: '#ED474B',
          fontSize: '28px',
        }),
        this.add.text(30, 55, 'HP', {
          color: '#FF6505',
          fontSize: '24px',
          fontStyle: 'italic',
        }),
        this.add
          .text(443, 80, '25/25', {
            color: '#7E3D3F',
            fontSize: '16px',
          })
          .setOrigin(1, 0),
      ])
      .setScale(0.3, 0.3);

    // render out the enemy health bar
    const enemyMonsterName = this.add.text(30, 20, MONSTER_ASSET_KEYS.ENEMY, {
      color: '#7E3D3F',
      fontSize: '32px',
    });
    this.add
      .container(30, 13, [
        this.add
          .image(0, 0, BATTLE_ASSET_KEYS.HEALTH_BAR_BACKGROUND)
          .setOrigin(0)
          .setScale(1, 0.8),
        enemyMonsterName,
        this.#createHealth(34, 34),
        this.add.text(enemyMonsterName.width + 35, 23, 'L5', {
          color: '#ED474B',
          fontSize: '28px',
        }),
        this.add.text(30, 55, 'HP', {
          color: '#FF6505',
          fontSize: '24px',
          fontStyle: 'italic',
        }),
      ])
      .setScale(0.3, 0.3);
  }

  #createHealth(x, y) {
    const scaleY = 0.7;
    const leftCap = this.add
      .image(x, y, HEALTH_BAR_ASSET_KEYS.LEFT_CAP)
      .setOrigin(0, 0.5)
      .setScale(1, scaleY);
    const middle = this.add
      .image(leftCap.x + leftCap.width, y, HEALTH_BAR_ASSET_KEYS.MIDDLE)
      .setOrigin(0, 0.5)
      .setScale(1, scaleY);
    middle.displayWidth = 360;
    const rightCap = this.add
      .image(middle.x + middle.displayWidth, y, HEALTH_BAR_ASSET_KEYS.RIGHT_CAP)
      .setOrigin(0, 0.5)
      .setScale(1, scaleY);

    return this.add.container(x, y, [leftCap, middle, rightCap]);
  }
}
