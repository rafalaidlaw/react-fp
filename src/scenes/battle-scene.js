import {
  BATTLE_ASSET_KEYS,
  BATTLE_BACKGROUND_ASSET_KEYS,
  HEALTH_BAR_ASSET_KEYS,
  MONSTER_ASSET_KEYS,
} from '../assets/asset-keys.js';
import Phaser from '../lib/phaser.js';
import { BattleMenu } from './battle-menu.js';
import { SCENE_KEYS } from './scene-keys.js';

export class BattleScene extends Phaser.Scene {
  #battleMenu;
  constructor() {
    super({
      key: SCENE_KEYS.BATTLE_SCENE,
    });
  }
  let;

  preload() {
    this.load.bitmapFont(
      'Jacquard',
      'assets/fonts/bitmap/Jacquard21.png',
      'assets/fonts/bitmap/Jacquard21.xml'
    );

    this.load.bitmapFont(
      'Lookout16',
      'assets/fonts/bitmap/Lookout16.png',
      'assets/fonts/bitmap/Lookout16.xml'
    );
    this.load.bitmapFont(
      'Lookout16PINK',
      'assets/fonts/bitmap/Lookout16PINK.png',
      'assets/fonts/bitmap/Lookout16PINK.xml'
    );
  }

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
    this.add.sprite(239, 58, MONSTER_ASSET_KEYS.ENEMY, 0).setScale(1);
    this.add
      .image(85, 95, MONSTER_ASSET_KEYS.ORPHAN, 0)
      .setFlipX(true)
      .setScale(1);

    this.add.container(
      1000,
      2,
      [].concat(bob.map((x) => eval(x)).concat(bill[0]))
    );

    this.add
      .container(319000, 2, [].concat(bob.map((x) => eval(x)).concat(bill[1])))
      .setScale(-1, 1);

    //render main info and sub info panes
    this.#battleMenu = new BattleMenu(this);
    this.#battleMenu.showMainBattleMenu();
  }

  #createHealthBar(x, y) {
    const scaleY = 1;
    const leftCap = this.add
      .image(x, y, HEALTH_BAR_ASSET_KEYS.LEFT_CAP)
      .setOrigin(1, 0.5)
      .setScale(1, scaleY);

    return this.add.container(x, y, [leftCap]);
  }

  #nubbinCreate() {
    let bob = [];
    for (let i = 0; i <= 9; i++) {
      bob.push(`this.#createHealthBar(16 + 2 * ${i}, 9).setDepth(-1)`);
    }
    //console.log(bob);
    return bob.slice();
  }
}
