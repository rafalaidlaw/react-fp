import {
  HEALTH_BAR_ASSET_KEYS,
  BATTLE_ASSET_KEYS,
} from '../../assets/asset-keys.js';
import Phaser from '../../lib/phaser.js';

export class HealthBar {
  /** @type {Phaser.Scene} */
  #scene;
  /** @type {Phaser.GameObjects.Container} */
  #healthBarContainer;
  /** @type {number} */
  #fullWidth;
  /** @type {number} */
  #scaleY;
  /** @type {Phaser.GameObjects.Image} */
  #leftCap;
  /** @type {Phaser.GameObjects.Image} */
  #middle;
  /** @type {Phaser.GameObjects.Image} */
  #rightCap;

  /**
   * @param {Phaser.Scene} scene the Phaser 3 Scene the battle menu will be added to
   * @param {number} x
   * @param {number} y
   */
  constructor(scene, x, y, nubbins) {
    this.#scene = scene;

    let nub = [];
    nub = this.nubbinCreate(nubbins);

    this.#healthBarContainer = this.#scene.add.container(
      x,
      y,
      [].concat(
        nub
          .map((x) => eval(x))
          .concat(
            this.#scene.add
              .image(0, 0, BATTLE_ASSET_KEYS.HEALTH_BAR_BACKGROUND)
              .setOrigin(0)
          )
      )
    );
  }

  get container() {
    return this.#healthBarContainer;
  }

  createHealthBar(x, y) {
    const scaleY = 1;
    const leftCap = this.#scene.add.image(0, y, HEALTH_BAR_ASSET_KEYS.LEFT_CAP);

    return this.#scene.add.container(x, y, [leftCap]);
  }
  nubbinCreate(nubbins) {
    let nub = [];
    for (let i = 0; i <= nubbins; i++) {
      nub.push(`this.createHealthBar(3, 35 - 2 * ${i}).setDepth(-1)`);
    }

    return nub.slice();
  }
}
