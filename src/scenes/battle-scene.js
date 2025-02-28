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
  let;
  create() {
    let bill = [
      this.add
        .image(0, 0, BATTLE_ASSET_KEYS.HEALTH_BAR_BACKGROUND)
        .setOrigin(0),
      this.add
        .image(0, 0, BATTLE_ASSET_KEYS.HEALTH_BAR_BACKGROUND)
        .setOrigin(0),
    ];
    let bob = [];
    bob = this.#nubbinCreate();
    console.log(bob.map((x) => eval(x)));
    console.log(`[${BattleScene.name}:create] invoked`);
    // create main background
    this.add.sprite(0, 0, BATTLE_BACKGROUND_ASSET_KEYS.FOREST).setOrigin(0);

    // render out the player and enemy monsters
    this.add.sprite(239, 98, MONSTER_ASSET_KEYS.ENEMY, 0).setScale(1);
    this.add
      .image(86, 102, MONSTER_ASSET_KEYS.ORPHAN, 0)
      .setFlipX(true)
      .setScale(1);

    this.add.container(
      1,
      2,
      [].concat(bob.map((x) => eval(x)).concat(bill[0]))
    );

    this.add
      .container(319, 2, [].concat(bob.map((x) => eval(x)).concat(bill[1])))
      .setScale(-1, 1);
  }

  #createHealth(x, y) {
    const scaleY = 1;
    const leftCap = this.add
      .image(x, y, HEALTH_BAR_ASSET_KEYS.LEFT_CAP)
      .setOrigin(1, 0.5)
      .setScale(1, scaleY);

    return this.add.container(x, y, [leftCap]);
  }

  #nubbinCreate() {
    let bob = [];
    for (let i = 0; i <= 7; i++) {
      bob.push(`this.#createHealth(16 + 2 * ${i}, 9).setDepth(-1)`);
    }
    //console.log(bob);
    return bob.slice();
  }
}
