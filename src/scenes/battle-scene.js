import {
  BATTLE_ASSET_KEYS,
  BATTLE_BACKGROUND_ASSET_KEYS,
  HEALTH_BAR_ASSET_KEYS,
  MONSTER_ASSET_KEYS,
} from '../assets/asset-keys.js';
import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from './scene-keys.js';

const BATTLE_MENU_OPTIONS = Object.freeze({
  FIGHT: 'Duel',
  SWITCH: 'Pray',
  ITEM: 'Tincture',
  FLEE: 'Flee',
});

export class BattleScene extends Phaser.Scene {
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
      .image(86, 95, MONSTER_ASSET_KEYS.ORPHAN, 0)
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
    this.#createMainInfoPane();
    this.add.container(this.scale.width / 2 - 2, this.scale.height - 47, [
      this.#createMainInfoSubPane(),

      this.#txt(10, 5, 'Pounce'),
      this.#txtPINK(65, 5, 'Ensare'),
      this.#txtPINK(10, 24, 'Tincture'),
      this.#txtPINK(65, 24, 'Flee'),
      this.add
        .bitmapText(-15, -124, 'Jacquard', 'Duel')
        .setFontSize(21)
        .setCharacterTint(0, -1, true, 0xff0000),
    ]);
    this.add.container(45, this.scale.height - 47, [
      this.#txtPINK(13, 5, 'Cough'),
      this.#txtPINK(63, 5, 'Pray'),
      this.#txtPINK(13, 24, 'Extoll'),
      this.#txtPINK(63, 24, 'Laudanum'),
    ]);
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

  #createMainInfoPane() {
    const padding = 50;
    const rectHeight = 43;

    this.add
      .rectangle(
        padding,
        this.scale.height - rectHeight - 2,
        this.scale.width - 96,
        rectHeight - 2,
        //0xd551b1,
        0xcf5dac,
        1
      )
      .setOrigin(0)
      .setStrokeStyle(2, /*0xe768fb*/ 0x620044, 1);
  }

  #createMainInfoSubPane() {
    const rectWidth = (this.scale.width - 98) / 2;
    const rectHeight = 41;

    return this.add
      .rectangle(-106, 4, rectWidth - 2, rectHeight - 4, 0xcf5dac, 1)
      .setOrigin(0)
      .setStrokeStyle(2, 0x8d1f6a, 1);
  }
  #txt(x, y, txt) {
    return this.add.bitmapText(x, y, 'Lookout16', `${txt}`).setFontSize(16);
  }
  #txtPINK(x, y, txt) {
    return this.add.bitmapText(x, y, 'Lookout16PINK', `${txt}`).setFontSize(16);
  }
}
