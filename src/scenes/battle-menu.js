import { MONSTER_ASSET_KEYS } from '../assets/asset-keys.js';
import Phaser from '../lib/phaser.js';
//preparing the battle-menu

const BATTLE_MENU_OPTIONS = Object.freeze({
  FIGHT: 'Duel',
  SWITCH: 'Pray',
  ITEM: 'Tincture',
  FLEE: 'Flee',
});

export class BattleMenu {
  /** @type {Phaser.Scene} */
  #scene;
  /** @type {Phaser.GameObjects.Container} */
  #mainBattleMenuPhaserContainerGameObject;
  /** @type {Phaser.GameObjects.Container} */
  #moveSelectionSubBattleMenuPhaserContainerGameObject;
  /** @type {Phaser.GameObjects.BitmapText} */
  #battleTextGameObjectLine1;
  /** @type {Phaser.GameObjects.BitmapText} */
  #battleTextGameObjectLine2;

  /**
   *
   *
   * @param {Phaser.Scene} scene the Phaser 3 Scene the battle menu will be added to
   */

  constructor(scene) {
    this.#scene = scene;
    this.#createMainInfoPane();
    this.#createMainBattleMenu();
    this.#createMonsterAttackSubMenu();
  }

  showMainBattleMenu() {
    //this.#battleTextGameObjectLine1.setText('what should');
    this.#mainBattleMenuPhaserContainerGameObject.setAlpha(1);
    this.#battleTextGameObjectLine1.setAlpha(1);
    this.#battleTextGameObjectLine2.setAlpha(1);
  }

  hideMainBattleMenu() {
    this.#mainBattleMenuPhaserContainerGameObject.setAlpha(0);
    this.#battleTextGameObjectLine1.setAlpha(0);
    this.#battleTextGameObjectLine2.setAlpha(0);
  }

  showMonsterAttackSubMenu() {
    this.#moveSelectionSubBattleMenuPhaserContainerGameObject.setAlpha(1);
  }

  hideMonsterAttackSubMenu() {
    this.#moveSelectionSubBattleMenuPhaserContainerGameObject.setAlpha(0);
  }

  #createMainBattleMenu() {
    this.#mainBattleMenuPhaserContainerGameObject = this.#scene.add.container(
      this.#scene.scale.width / 2 - 2,
      this.#scene.scale.height - 47,
      [
        this.#createMainInfoSubPane(),

        this.#txtBLUE(10, 5, 'Pounce'),
        this.#txtPINK(65, 5, 'Tincture'),
        this.#txtPINK(10, 24, 'Pneuma'),
        this.#txtPINK(65, 24, 'Plead'),
        this.#scene.add
          .bitmapText(-15, -124, 'Jacquard', 'Duel')
          .setFontSize(21),
      ]
    );
    this.#battleTextGameObjectLine1 = this.#txtPINK(
      66,
      139,
      'What will you do'
    );
    // TODO update use orphan data to populate name with chosen orphan
    this.#battleTextGameObjectLine2 = this.#txtPINK(
      80,
      154,
      `${MONSTER_ASSET_KEYS.ORPHAN}?`
    );

    this.hideMainBattleMenu();
  }

  #createMonsterAttackSubMenu() {
    this.#moveSelectionSubBattleMenuPhaserContainerGameObject =
      this.#scene.add.container(45, this.#scene.scale.height - 47, [
        this.#txtPINK(13, 5, 'Cough'),
        this.#txtPINK(63, 5, 'Pray'),
        this.#txtPINK(13, 24, 'Extol'),
        this.#txtPINK(63, 24, 'Laudanum'),
      ]);
    this.hideMonsterAttackSubMenu();
  }
  #createMainInfoPane() {
    const padding = 50;
    const rectHeight = 43;

    this.#scene.add
      .rectangle(
        padding,
        this.#scene.scale.height - rectHeight - 2,
        this.#scene.scale.width - 96,
        rectHeight - 2,
        //0xd551b1,
        0xcf5dac,
        1
      )
      .setOrigin(0)
      .setStrokeStyle(2, /*0xe768fb*/ 0x620044, 1);
  }

  #createMainInfoSubPane() {
    const rectWidth = (this.#scene.scale.width - 90) / 2;
    const rectHeight = 41;

    return this.#scene.add
      .rectangle(-106, 2, rectWidth - 2, rectHeight, 0xcf5dac, 1)
      .setOrigin(0)
      .setStrokeStyle(2, 0x8d1f6a, 1);
  }
  #txtBLUE(x, y, txt) {
    return this.#scene.add
      .bitmapText(x, y, 'Lookout16', `${txt}`)
      .setFontSize(16);
  }
  #txtPINK(x, y, txt) {
    return this.#scene.add
      .bitmapText(x, y, 'Lookout16PINK', `${txt}`)
      .setFontSize(16);
  }
}
