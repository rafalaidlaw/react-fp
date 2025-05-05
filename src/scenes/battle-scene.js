import {
  BATTLE_ASSET_KEYS,
  BATTLE_BACKGROUND_ASSET_KEYS,
  HEALTH_BAR_ASSET_KEYS,
  MONSTER_ASSET_KEYS,
} from '../assets/asset-keys.js';
import Phaser from '../lib/phaser.js';
import { BattleMenu } from './battle-menu.js';
import { SCENE_KEYS } from './scene-keys.js';
import { DIRECTION } from '../common/direction.js';
import { Background } from '../battle/background.js';
import { HealthBar } from '../battle/ui/health-bar.js';

export class BattleScene extends Phaser.Scene {
  /** @type {BattleMenu} */
  #battleMenu;
  /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
  #cursorKeys;
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
    let healthBarRender = [
      this.add
        .image(0, 0, BATTLE_ASSET_KEYS.HEALTH_BAR_BACKGROUND)
        .setOrigin(0),
      this.add
        .image(0, 0, BATTLE_ASSET_KEYS.HEALTH_BAR_BACKGROUND)
        .setOrigin(0),
    ];
    let nub = [];
    nub = this.#nubbinCreate();

    // create main background
    const background = new Background(this);
    background.showForest();

    // render out the player and enemy monsters
    this.add.sprite(230, 58, MONSTER_ASSET_KEYS.ENEMY, 0).setScale(1);
    this.add
      .sprite(87, 96, MONSTER_ASSET_KEYS.ORPHAN, 0)
      .setFlipX(true)
      .setScale(1);

    this.add.container(
      11,
      44,
      [].concat(nub.map((x) => eval(x)).concat(healthBarRender[0]))
    );

    this.add
      .container(
        310,
        44,
        [].concat(nub.map((x) => eval(x)).concat(healthBarRender[1]))
      )
      .setScale(-1, 1);

    //render main info and sub info panes
    this.#battleMenu = new BattleMenu(this);
    this.#battleMenu.showMainBattleMenu();

    this.#cursorKeys = this.input.keyboard.createCursorKeys();
  }

  update() {
    const wasSpaceKeyPressed = Phaser.Input.Keyboard.JustDown(
      this.#cursorKeys.space
    );
    if (wasSpaceKeyPressed) {
      this.#battleMenu.handlePlayerInput('OK');

      //check if the player selected an attack, and update display text
      if (this.#battleMenu.selectedAttack === undefined) {
        return;
      }
      console.log(
        `Player selected the following move: ${this.#battleMenu.selectedAttack}`
      );
      this.#battleMenu.hideMonsterAttackSubMenu();
      this.#battleMenu.updateInfoPaneMessagesAndWaitForInput(
        ['Orphan Begins to cry'],
        ['Attack!'],
        () => {
          this.#battleMenu.showMainBattleMenu();
        }
      );
    }

    if (Phaser.Input.Keyboard.JustDown(this.#cursorKeys.shift)) {
      this.#battleMenu.handlePlayerInput('CANCEL');
      return;
    }

    /** @type {import('../common/direction.js').Direction} */
    let selectedDirection = DIRECTION.NONE;
    if (this.#cursorKeys.left.isDown) {
      selectedDirection = DIRECTION.LEFT;
    } else if (this.#cursorKeys.right.isDown) {
      selectedDirection = DIRECTION.RIGHT;
    } else if (this.#cursorKeys.up.isDown) {
      selectedDirection = DIRECTION.UP;
    } else if (this.#cursorKeys.down.isDown) {
      selectedDirection = DIRECTION.DOWN;
    }

    if (selectedDirection !== DIRECTION.NONE) {
      this.#battleMenu.handlePlayerInput(selectedDirection);
    }
  }

  /**
   *
   * @param {number} x the x position to place the health bar container
   * @param {number} y the y position to place the health bar container
   * @returns {Phaser.GameObjects.Container}
   */

  #createHealthBar(x, y) {
    const scaleY = 1;
    const leftCap = this.add.image(0, y, HEALTH_BAR_ASSET_KEYS.LEFT_CAP);

    return this.add.container(x, y, [leftCap]);
  }

  #nubbinCreate() {
    let nub = [];
    for (let i = 0; i <= 9; i++) {
      nub.push(`this.#createHealthBar(5, 35 - 2 * ${i}).setDepth(-1)`);
    }

    return nub.slice();
  }
}
