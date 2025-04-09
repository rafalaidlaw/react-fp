import { MONSTER_ASSET_KEYS, UI_ASSET_KEYS } from '../assets/asset-keys.js';
import Phaser from '../lib/phaser.js';
import { DIRECTION } from '../common/direction.js';
import { exhaustiveGuard } from '../utils/guard.js';
import {
  ATTACK_MOVE_OPTIONS,
  BATTLE_MENU_OPTIONS,
  ACTIVE_BATTLE_MENU,
} from '../battle/ui/menu/battle-menu-options.js';
//preparing the battle-menu

const BATTLE_MENU_CURSOR_POS = Object.freeze({
  x: -13,
  y: 13,
});
const ATTACK_MENU_CURSOR_POS = Object.freeze({
  x: 15,
  y: 12,
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
  /** @type {Phaser.GameObjects.Image} */
  #mainBattleMenuCursorPhaserImageGameObject;
  /** @type {Phaser.GameObjects.Image} */
  #attackBattleMenuCursorPhaserImageGameObject;
  /** @type {import('../battle/ui/menu/battle-menu-options.js').BattleMenuOptions} */
  #selectedBattleMenuOption;
  /** @type {Phaser.GameObjects.BitmapText} */
  #battleTextGameObjectDUEL;
  /** @type {Phaser.GameObjects.BitmapText} */
  #battleTextGameObjectSWITCH;
  /** @type {Phaser.GameObjects.BitmapText} */
  #battleTextGameObjectITEM;
  /** @type {Phaser.GameObjects.BitmapText} */
  #battleTextGameObjectFLEE;
  /** @type {import('./battle-menu-options.js').AttackMoveOptions} */
  #selectedAttackMenuOption;
  /** @type {import('./battle-menu-options.js').ActiveBattleMenu} */
  #activeBattleMenu;

  /**
   *
   *
   * @param {Phaser.Scene} scene the Phaser 3 Scene the battle menu will be added to
   */

  constructor(scene) {
    this.#scene = scene;
    this.#activeBattleMenu = ACTIVE_BATTLE_MENU.BATTLE_MAIN;
    this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.DUEL;
    this.#selectedAttackMenuOption = ATTACK_MOVE_OPTIONS.MOVE_1;
    this.#createMainInfoPane();
    this.#createMainBattleMenu();
    this.#createMonsterAttackSubMenu();
  }

  showMainBattleMenu() {
    //this.#battleTextGameObjectLine1.setText('what should');
    this.#activeBattleMenu = ACTIVE_BATTLE_MENU.BATTLE_MAIN;
    this.#mainBattleMenuPhaserContainerGameObject.setAlpha(1);
    this.#battleTextGameObjectLine1.setAlpha(1);
    this.#battleTextGameObjectLine2.setAlpha(1);
    this.#battleTextGameObjectDUEL.setAlpha(1);
    this.#battleTextGameObjectSWITCH.setAlpha(1);
    this.#battleTextGameObjectITEM.setAlpha(1);
    this.#battleTextGameObjectFLEE.setAlpha(1);

    this.#mainBattleMenuCursorPhaserImageGameObject.setPosition(
      BATTLE_MENU_CURSOR_POS.x,
      BATTLE_MENU_CURSOR_POS.y
    );
  }

  hideMainBattleMenu() {
    this.#mainBattleMenuPhaserContainerGameObject.setAlpha(0);
    this.#battleTextGameObjectLine1.setAlpha(0);
    this.#battleTextGameObjectLine2.setAlpha(0);
    this.#battleTextGameObjectDUEL.setAlpha(0);
    this.#battleTextGameObjectSWITCH.setAlpha(0);
    this.#battleTextGameObjectITEM.setAlpha(0);
    this.#battleTextGameObjectFLEE.setAlpha(0);
  }

  showMonsterAttackSubMenu() {
    this.#activeBattleMenu = ACTIVE_BATTLE_MENU.BATTLE_MOVE_SELECT;
    this.#moveSelectionSubBattleMenuPhaserContainerGameObject.setAlpha(1);
  }

  hideMonsterAttackSubMenu() {
    this.#moveSelectionSubBattleMenuPhaserContainerGameObject.setAlpha(0);
  }

  /**
   *
   * @param {import('../common/direction.js').Direction|'OK'|'CANCEL'} input
   */
  handlePlayerInput(input) {
    console.log(input);
    if (input === 'CANCEL') {
      this.hideMonsterAttackSubMenu();
      this.showMainBattleMenu();
      return;
    }
    if (input === 'OK') {
      this.hideMainBattleMenu();
      this.showMonsterAttackSubMenu();
      return;
    }
    this.#updateSelectedBattleMenuOptionFromInput(input);
    this.#moveMainBattleMenuCursor();
    this.#updateSelectedMoveMenuOptionFromInput(input);
    this.#moveMoveSelectBattleMenuCursor();
  }

  #createMainBattleMenu() {
    this.#mainBattleMenuCursorPhaserImageGameObject = this.#scene.add.image(
      BATTLE_MENU_CURSOR_POS.x,
      BATTLE_MENU_CURSOR_POS.y,
      UI_ASSET_KEYS.CURSOR,
      0
    );

    this.#mainBattleMenuPhaserContainerGameObject = this.#scene.add.container(
      this.#scene.scale.width / 2 - 2,
      this.#scene.scale.height - 47,
      [
        this.#createMainInfoSubPane(),

        this.#scene.add
          .bitmapText(-15, -124, 'Jacquard', 'Duel')
          .setFontSize(21),
        this.#mainBattleMenuCursorPhaserImageGameObject,
      ]
    );
    this.#txtColorDUEL(true);
    this.#txtColorSWITCH(false);
    this.#txtColorITEM(false);
    this.#txtColorFLEE(false);

    this.#battleTextGameObjectLine1 = this.#txtPINK(
      46,
      139,
      'What will you do'
    );
    // TODO update use orphan data to populate name with chosen orphan
    this.#battleTextGameObjectLine2 = this.#txtPINK(
      60,
      154,
      `${MONSTER_ASSET_KEYS.ORPHAN}?`
    );

    this.hideMainBattleMenu();
  }

  #createMonsterAttackSubMenu() {
    this.#attackBattleMenuCursorPhaserImageGameObject = this.#scene.add
      .image(9, 13, UI_ASSET_KEYS.CURSOR, 0)
      .setOrigin(0);

    this.#moveSelectionSubBattleMenuPhaserContainerGameObject =
      this.#scene.add.container(45, this.#scene.scale.height - 47, [
        this.#txtPINK(25, 5, 'Cough Red'),
        this.#txtPINK(110, 5, 'Forward March'),
        this.#txtPINK(25, 24, 'Riposte'),
        this.#txtPINK(110, 24, 'Fleche'),
        this.#attackBattleMenuCursorPhaserImageGameObject,
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
    const rectWidth = 99;
    const rectHeight = 44;

    return this.#scene.add
      .rectangle(-119, 0, rectWidth - 2, rectHeight, 0xcf5dac, 1)
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
  /**
   * @param {import('../common/direction.js').Direction} direction
   */
  #updateSelectedBattleMenuOptionFromInput(direction) {
    if (this.#activeBattleMenu !== ACTIVE_BATTLE_MENU.BATTLE_MAIN) {
      return;
    }
    if (this.#mainBattleMenuPhaserContainerGameObject.alpha == 1) {
      if (this.#selectedBattleMenuOption === BATTLE_MENU_OPTIONS.DUEL) {
        switch (direction) {
          case DIRECTION.RIGHT:
            this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.SWITCH;
            return;
          case DIRECTION.DOWN:
            this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.ITEM;
            return;
          case DIRECTION.LEFT:
          case DIRECTION.UP:
          case DIRECTION.NONE:
            return;
          default:
            exhaustiveGuard(direction);
        }
        return;
      }
      if (this.#selectedBattleMenuOption === BATTLE_MENU_OPTIONS.SWITCH) {
        switch (direction) {
          case DIRECTION.LEFT:
            this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.DUEL;
            return;
          case DIRECTION.DOWN:
            this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.FLEE;
            return;
          case DIRECTION.RIGHT:
          case DIRECTION.UP:
          case DIRECTION.NONE:
            return;
          default:
            exhaustiveGuard(direction);
        }
        return;
      }

      if (this.#selectedBattleMenuOption === BATTLE_MENU_OPTIONS.ITEM) {
        switch (direction) {
          case DIRECTION.RIGHT:
            this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.FLEE;
            return;
          case DIRECTION.UP:
            this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.DUEL;
            return;
          case DIRECTION.LEFT:
          case DIRECTION.DOWN:
          case DIRECTION.NONE:
            return;
          default:
            exhaustiveGuard(direction);
        }
        return;
      }

      if (this.#selectedBattleMenuOption === BATTLE_MENU_OPTIONS.FLEE) {
        switch (direction) {
          case DIRECTION.LEFT:
            this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.ITEM;
            return;
          case DIRECTION.UP:
            this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.SWITCH;
            return;
          case DIRECTION.RIGHT:
          case DIRECTION.DOWN:
          case DIRECTION.NONE:
            return;
          default:
            exhaustiveGuard(direction);
        }
        return;
      }
    }
  }
  #txtColorDUEL(blue) {
    if (this.#mainBattleMenuPhaserContainerGameObject.alpha == 1) {
      if (blue == true) {
        return (this.#battleTextGameObjectDUEL = this.#txtBLUE(
          151,
          138,
          'En Garde'
        ));
      }
      return (this.#battleTextGameObjectDUEL = this.#txtPINK(
        151,
        138,
        'En Garde'
      ));
    }
  }

  #txtColorSWITCH(blue) {
    if (this.#mainBattleMenuPhaserContainerGameObject.alpha == 1) {
      if (blue == true) {
        return (this.#battleTextGameObjectSWITCH = this.#txtBLUE(
          220,
          138,
          'Pray'
        ));
      }
      return (this.#battleTextGameObjectSWITCH = this.#txtPINK(
        220,
        138,
        'Pray'
      ));
    }
  }
  #txtColorITEM(blue) {
    if (this.#mainBattleMenuPhaserContainerGameObject.alpha == 1) {
      if (blue == true) {
        return (this.#battleTextGameObjectITEM = this.#txtBLUE(
          151,
          157,
          'Pneumatic'
        ));
      }
      return (this.#battleTextGameObjectITEM = this.#txtPINK(
        151,
        157,
        'Pneumatic'
      ));
    }
  }
  #txtColorFLEE(blue) {
    if (this.#mainBattleMenuPhaserContainerGameObject.alpha == 1) {
      if (blue == true) {
        return (this.#battleTextGameObjectFLEE = this.#txtBLUE(
          220,
          157,
          'Tincture'
        ));
      }
      return (this.#battleTextGameObjectFLEE = this.#txtPINK(
        220,
        157,
        'Tincture'
      ));
    }
  }

  #txtColorDESTROY() {
    if (this.#mainBattleMenuPhaserContainerGameObject.alpha == 1) {
      this.#battleTextGameObjectDUEL.destroy();
      this.#battleTextGameObjectSWITCH.destroy();
      this.#battleTextGameObjectITEM.destroy();
      this.#battleTextGameObjectFLEE.destroy();
    }
  }

  #moveMainBattleMenuCursor() {
    if (this.#activeBattleMenu !== ACTIVE_BATTLE_MENU.BATTLE_MAIN) {
      return;
    }
    switch (this.#selectedBattleMenuOption) {
      case BATTLE_MENU_OPTIONS.DUEL:
        this.#mainBattleMenuCursorPhaserImageGameObject
          .setPosition(BATTLE_MENU_CURSOR_POS.x, BATTLE_MENU_CURSOR_POS.y)
          .setRotation(0);
        this.#txtColorDESTROY();

        this.#txtColorDUEL(true);
        this.#txtColorSWITCH(false);
        this.#txtColorITEM(false);
        this.#txtColorFLEE(false);
        return;
      case BATTLE_MENU_OPTIONS.SWITCH:
        this.#mainBattleMenuCursorPhaserImageGameObject
          .setPosition(58, BATTLE_MENU_CURSOR_POS.y + 1)
          .setRotation(1.5708);
        this.#txtColorDESTROY();
        this.#txtColorDUEL(false);
        this.#txtColorSWITCH(true);
        this.#txtColorITEM(false);
        this.#txtColorFLEE(false);
        return;
      case BATTLE_MENU_OPTIONS.ITEM:
        this.#mainBattleMenuCursorPhaserImageGameObject
          .setPosition(BATTLE_MENU_CURSOR_POS.x, 32)
          .setRotation(0);
        this.#txtColorDESTROY();
        this.#txtColorDUEL(false);
        this.#txtColorSWITCH(false);
        this.#txtColorITEM(true);
        this.#txtColorFLEE(false);
        return;
      case BATTLE_MENU_OPTIONS.FLEE:
        this.#mainBattleMenuCursorPhaserImageGameObject
          .setPosition(56, 32)
          .setRotation(0);
        this.#txtColorDESTROY();
        this.#txtColorDUEL(false);
        this.#txtColorSWITCH(false);
        this.#txtColorITEM(false);
        this.#txtColorFLEE(true);
        return;
      default:
        exhaustiveGuard(this.#selectedBattleMenuOption);
    }
  }
  /**
   * @param {import('../common/direction.js').Direction} direction
   */
  #updateSelectedMoveMenuOptionFromInput(direction) {
    if (this.#activeBattleMenu !== ACTIVE_BATTLE_MENU.BATTLE_MOVE_SELECT) {
      return;
    }

    if (this.#selectedAttackMenuOption === ATTACK_MOVE_OPTIONS.MOVE_1) {
      switch (direction) {
        case DIRECTION.RIGHT:
          this.#selectedAttackMenuOption = ATTACK_MOVE_OPTIONS.MOVE_2;
          return;
        case DIRECTION.DOWN:
          this.#selectedAttackMenuOption = ATTACK_MOVE_OPTIONS.MOVE_3;
          return;
        case DIRECTION.LEFT:
        case DIRECTION.UP:
        case DIRECTION.NONE:
          return;
        default:
          exhaustiveGuard(direction);
      }
      return;
    }

    if (this.#selectedAttackMenuOption === ATTACK_MOVE_OPTIONS.MOVE_2) {
      switch (direction) {
        case DIRECTION.LEFT:
          this.#selectedAttackMenuOption = ATTACK_MOVE_OPTIONS.MOVE_1;
          return;
        case DIRECTION.DOWN:
          this.#selectedAttackMenuOption = ATTACK_MOVE_OPTIONS.MOVE_4;
          return;
        case DIRECTION.RIGHT:
        case DIRECTION.UP:
        case DIRECTION.NONE:
          return;
        default:
          exhaustiveGuard(direction);
      }
      return;
    }

    if (this.#selectedAttackMenuOption === ATTACK_MOVE_OPTIONS.MOVE_3) {
      switch (direction) {
        case DIRECTION.RIGHT:
          this.#selectedAttackMenuOption = ATTACK_MOVE_OPTIONS.MOVE_4;
          return;
        case DIRECTION.UP:
          this.#selectedAttackMenuOption = ATTACK_MOVE_OPTIONS.MOVE_1;
          return;
        case DIRECTION.LEFT:
        case DIRECTION.DOWN:
        case DIRECTION.NONE:
          return;
        default:
          exhaustiveGuard(direction);
      }
      return;
    }

    if (this.#selectedAttackMenuOption === ATTACK_MOVE_OPTIONS.MOVE_4) {
      switch (direction) {
        case DIRECTION.LEFT:
          this.#selectedAttackMenuOption = ATTACK_MOVE_OPTIONS.MOVE_3;
          return;
        case DIRECTION.UP:
          this.#selectedAttackMenuOption = ATTACK_MOVE_OPTIONS.MOVE_2;
          return;
        case DIRECTION.RIGHT:
        case DIRECTION.DOWN:
        case DIRECTION.NONE:
          return;
        default:
          exhaustiveGuard(direction);
      }
      return;
    }

    exhaustiveGuard(this.#selectedAttackMenuOption);
  }

  #moveMoveSelectBattleMenuCursor() {
    if (this.#activeBattleMenu !== ACTIVE_BATTLE_MENU.BATTLE_MOVE_SELECT) {
      return;
    }

    switch (this.#selectedAttackMenuOption) {
      case ATTACK_MOVE_OPTIONS.MOVE_1:
        this.#attackBattleMenuCursorPhaserImageGameObject.setPosition(
          ATTACK_MENU_CURSOR_POS.x,
          ATTACK_MENU_CURSOR_POS.y
        );
        return;
      case ATTACK_MOVE_OPTIONS.MOVE_2:
        this.#attackBattleMenuCursorPhaserImageGameObject.setPosition(
          100,
          ATTACK_MENU_CURSOR_POS.y
        );
        return;
      case ATTACK_MOVE_OPTIONS.MOVE_3:
        this.#attackBattleMenuCursorPhaserImageGameObject.setPosition(
          ATTACK_MENU_CURSOR_POS.x,
          31
        );
        return;
      case ATTACK_MOVE_OPTIONS.MOVE_4:
        this.#attackBattleMenuCursorPhaserImageGameObject.setPosition(100, 31);
        return;
      default:
        exhaustiveGuard(this.#selectedAttackMenuOption);
    }
  }
}
