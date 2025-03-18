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
const battleUiTextStyle = {
  color: 'rgb(251, 199, 238)',
  fontSize: '16px',
  fontFamily: 'PressStart2P',
};

export class BattleScene extends Phaser.Scene {
  constructor() {
    super({
      key: SCENE_KEYS.BATTLE_SCENE,
    });
  }
  let;
  preload() {
    this.load.font(
      'PressStart2P',
      'assets/fonts/Jacquard12-Regular.ttf',
      'truetype'
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
      this.add.text(15, 2, BATTLE_MENU_OPTIONS.FIGHT, battleUiTextStyle),
      this.add.text(70, 2, BATTLE_MENU_OPTIONS.SWITCH, battleUiTextStyle),
      this.add.text(15, 25, BATTLE_MENU_OPTIONS.ITEM, battleUiTextStyle),
      this.add.text(70, 25, BATTLE_MENU_OPTIONS.FLEE, battleUiTextStyle),
    ]);
    this.add.container(45, this.scale.height - 47, [
      this.add.text(15, 2, 'Cough', battleUiTextStyle),
      this.add.text(70, 2, 'Pray', battleUiTextStyle),
      this.add.text(15, 25, 'Extoll', battleUiTextStyle),
      this.add.text(70, 25, 'laudanum', battleUiTextStyle),
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
    for (let i = 0; i <= 7; i++) {
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
        0x719dca,
        1
      )
      .setOrigin(0)
      .setStrokeStyle(2, /*0xe768fb*/ 0x5657ba, 1);
  }

  #createMainInfoSubPane() {
    const rectWidth = (this.scale.width - 98) / 2;
    const rectHeight = 41;

    return this.add
      .rectangle(-108, 2, rectWidth, rectHeight, 0x719dca, 1)
      .setOrigin(0)
      .setStrokeStyle(2, 0x5657ba, 1);
  }
}
