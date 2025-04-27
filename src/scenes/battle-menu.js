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

const BATTLE_MENU_FONT_PLACEMENT = Object.freeze({
  x: 88,
  y: 136,
  xx: 185,
  yy: 154,
});
const BATTLE_MENU_CURSOR_POS = Object.freeze({
  x: -76,
  y: 8,
  xx: 22,
  yy: 26,
});
const ATTACK_MENU_CURSOR_POS = Object.freeze({
  x: 34,
  y: 10,
  xx: 132,
  yy: 28,
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
  #TopTextBattleGameObject;
  /** @type {Phaser.GameObjects.BitmapText} */
  #battleTextGameObjectDUEL;
  /** @type {Phaser.GameObjects.BitmapText} */
  #battleTextGameObjectSWITCH;
  /** @type {Phaser.GameObjects.BitmapText} */
  #battleTextGameObjectITEM;
  /** @type {Phaser.GameObjects.BitmapText} */
  #battleTextGameObjectFLEE;
  /** @type {Phaser.GameObjects.BitmapText} */
  #battleTextGameObjectMove_1;
  /** @type {Phaser.GameObjects.BitmapText} */
  #battleTextGameObjectMove_2;
  /** @type {Phaser.GameObjects.BitmapText} */
  #battleTextGameObjectMove_3;
  /** @type {Phaser.GameObjects.BitmapText} */
  #battleTextGameObjectMove_4;
  /** @type {import('./battle-menu-options.js').AttackMoveOptions} */
  #selectedAttackMenuOption;
  /** @type {import('./battle-menu-options.js').ActiveBattleMenu} */
  #activeBattleMenu;
  /** @type {string[]} */
  #queuedInfoPanelMessages;
  /** @type {() => void | undefined} */
  #queuedInfoPanelCallback;
  /** @type {boolean} */
  #waitingForPlayerInput;
  /** @type {Phaser.GameObjects.Container} */
  #topTextContainer;
  /** @type {Phaser.GameObjects.Rectangle} */
  #HUDrect01;
  /** @type {Phaser.GameObjects.Rectangle} */
  #HUDrect02;
  /** @type {Phaser.GameObjects.Rectangle} */
  #HUDrect03;
  /** @type {Phaser.GameObjects.Rectangle} */
  #HUDrect04;
  /** @type {Phaser.GameObjects.Rectangle} */
  #HUDrect05;
  /** @type {Phaser.GameObjects.Image} */
  #TOPTEXT_CAP_LEFT;
  /** @type {Phaser.GameObjects.Image} */
  #TOPTEXT_CAP_RIGHT;

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
    this.#queuedInfoPanelCallback = undefined;
    this.#queuedInfoPanelMessages = [];
    this.#waitingForPlayerInput = false;
    this.#createMainInfoPane();
    this.#createMainBattleMenu();
    this.#createMonsterAttackSubMenu();
  }

  showMainBattleMenu() {
    // this.#battleTextGameObjectLine1.setText('What will you do').setX(46);
    // if (this.#mainBattleMenuPhaserContainerGameObject.alpha == 0) {
    //   this.#battleTextGameObjectLine1 = this.#txtPINK(
    //     46,
    //     139,
    //     'What will you do'
    //   );
    // }
    this.#activeBattleMenu = ACTIVE_BATTLE_MENU.BATTLE_MAIN;

    // this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.DUEL;
    this.#mainBattleMenuPhaserContainerGameObject.setAlpha(1);
    // this.#txtColorDESTROY();
    // this.#txtColorDUEL(true);
    // this.#txtColorSWITCH(false);
    // this.#txtColorITEM(false);
    // this.#txtColorFLEE(false);

    this.#battleTextGameObjectLine1.setAlpha(1);
    this.#battleTextGameObjectLine2.setAlpha(1);
    this.#battleTextGameObjectDUEL.setAlpha(1);
    this.#battleTextGameObjectSWITCH.setAlpha(1);
    this.#battleTextGameObjectITEM.setAlpha(1);
    this.#battleTextGameObjectFLEE.setAlpha(1);
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
    this.#battleTextGameObjectMove_1.setAlpha(1);
    this.#battleTextGameObjectMove_2.setAlpha(1);
    this.#battleTextGameObjectMove_3.setAlpha(1);
    this.#battleTextGameObjectMove_4.setAlpha(1);
  }

  hideMonsterAttackSubMenu() {
    this.#moveSelectionSubBattleMenuPhaserContainerGameObject.setAlpha(0);
    this.#battleTextGameObjectMove_1.setAlpha(0);
    this.#battleTextGameObjectMove_2.setAlpha(0);
    this.#battleTextGameObjectMove_3.setAlpha(0);
    this.#battleTextGameObjectMove_4.setAlpha(0);
  }

  /**
   *
   * @param {import('../common/direction.js').Direction|'OK'|'CANCEL'} input
   */
  handlePlayerInput(input) {
    if (this.#waitingForPlayerInput && (input === 'CANCEL' || input === 'OK')) {
      this.#updateInfoPaneWithMessage();
      return;
    }

    if (input === 'CANCEL') {
      this.#switchToMainBattleMenu();
      return;
    }
    if (input === 'OK') {
      if (this.#activeBattleMenu === ACTIVE_BATTLE_MENU.BATTLE_MAIN) {
        this.#handlePlayerChooseMainBattleOption();
        return;
      }
      if (this.#activeBattleMenu === ACTIVE_BATTLE_MENU.BATTLE_MOVE_SELECT) {
        // TODO
        return;
      }
      return;
    }
    this.#updateSelectedBattleMenuOptionFromInput(input);
    this.#moveMainBattleMenuCursor();
    this.#updateSelectedMoveMenuOptionFromInput(input);
    this.#moveMoveSelectBattleMenuCursor();
  }

  /**
   * @param {string[]} messages
   * @param {() => void} [callback]
   */
  updateInfoPaneMessagesAndWaitForInput(messages, callback) {
    this.#queuedInfoPanelMessages = messages;
    this.#queuedInfoPanelCallback = callback;

    this.#updateInfoPaneWithMessage();
  }

  #updateInfoPaneWithMessage() {
    this.#waitingForPlayerInput = false;

    this.#battleTextGameObjectLine1.setText('').setAlpha(1);

    // check if all messages have been displayed from the queue and call the callback
    if (this.#queuedInfoPanelMessages.length === 0) {
      if (this.#queuedInfoPanelCallback) {
        this.#queuedInfoPanelCallback();
        this.#queuedInfoPanelCallback = undefined;
        this.#TopTextBattleGameObject.destroy();
        this.#TopTextBattleGameObject = this.#scene.add
          .bitmapText(160, 16, 'Jacquard', 'What Now Orphan?')
          .setFontSize(21)
          .setOrigin(0.5);
        this.#handleTopTextContainer();
      }
      return;
    }

    // get first message from queue and animate message
    const messageToDisplay = this.#queuedInfoPanelMessages.shift();
    // this.#battleTextGameObjectLine1.setText(messageToDisplay);
    this.#TopTextBattleGameObject.destroy();

    this.#TopTextBattleGameObject = this.#scene.add
      .bitmapText(160, 16, 'Jacquard', messageToDisplay)
      .setFontSize(21)
      .setOrigin(0.5);

    this.#handleTopTextContainer();

    // this.#battleTextGameObjectLine1 = this.#txtBLUE(66, 139, messageToDisplay);
    this.#waitingForPlayerInput = true;
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
      this.#scene.scale.height - 44,
      [
        this.#createMainInfoSubPane(),

        this.#mainBattleMenuCursorPhaserImageGameObject,
      ]
    );
    (this.#HUDrect01 = this.#scene.add
      .rectangle(160.5, 17, 1, 20, 0xedc4ff, 1)
      .setOrigin(0.5)),
      (this.#HUDrect02 = this.#scene.add
        .rectangle(160.5, 6.5, 1, 1, 0xedc4ff, 1)
        .setOrigin(0.5)),
      (this.#HUDrect03 = this.#scene.add
        .rectangle(160.5, 27.5, 1, 1, 0xde92ff, 1)
        .setOrigin(0.5)),
      (this.#HUDrect04 = this.#scene.add
        .rectangle(160.5, 5.5, 1, 1, 0xde92ff, 1)
        .setOrigin(0.5)),
      (this.#HUDrect05 = this.#scene.add
        .rectangle(160.5, 28.5, 1, 1, 0x9749b8, 1)
        .setOrigin(0.5)),
      (this.#TOPTEXT_CAP_LEFT = this.#scene.add
        .image(71, 37, UI_ASSET_KEYS.TOPTEXT_CAP_RIGHT)
        .setOrigin(1));
    this.#TOPTEXT_CAP_RIGHT = this.#scene.add
      .image(237.5, 1, UI_ASSET_KEYS.TOPTEXT_CAP_LEFT)
      .setOrigin(0)
      .setFlipX(true);
    this.#TopTextBattleGameObject = this.#scene.add
      .bitmapText(160, 16, 'Jacquard', 'What Now Orphan?')
      .setFontSize(21)
      .setOrigin(0.5);

    this.#handleTopTextContainer();

    this.#txtColorDUEL(true);
    this.#txtColorSWITCH(false);
    this.#txtColorITEM(false);
    this.#txtColorFLEE(false);

    this.#battleTextGameObjectLine1 = this.#txtPINK(
      -146,
      139,
      'What will you do sailor'
    );
    // TODO update use orphan data to populate name with chosen orphan
    this.#battleTextGameObjectLine2 = this.#txtPINK(
      -60,
      154,
      `${MONSTER_ASSET_KEYS.ORPHAN}?`
    );

    this.hideMainBattleMenu();
  }

  #createMonsterAttackSubMenu() {
    this.#attackBattleMenuCursorPhaserImageGameObject = this.#scene.add
      .image(
        ATTACK_MENU_CURSOR_POS.x,
        ATTACK_MENU_CURSOR_POS.y,
        UI_ASSET_KEYS.CURSOR,
        0
      )
      .setOrigin(0);
    // .setRotation(1.58);

    this.#moveSelectionSubBattleMenuPhaserContainerGameObject =
      this.#scene.add.container(45, this.#scene.scale.height - 47, [
        this.#attackBattleMenuCursorPhaserImageGameObject,
      ]);
    this.#txtColorMove_1(true);
    this.#txtColorMove_2(false);
    this.#txtColorMove_3(false);
    this.#txtColorMove_4(false);

    this.hideMonsterAttackSubMenu();
  }
  #createMainInfoPane() {
    const padding = 39;
    const rectHeight = 43;

    this.#scene.add
      .rectangle(
        padding,
        this.#scene.scale.height - rectHeight - 3,
        this.#scene.scale.width - padding * 2,
        rectHeight - 2,
        //0xd551b1,
        0xcf5dac,
        1
      )
      .setOrigin(0)
      .setStrokeStyle(2, /*0xe768fb*/ 0x620044, 1)
      .setAlpha(0);
  }

  #createMainInfoSubPane() {
    const rectWidth = 100;
    const rectHeight = 41;

    return this.#scene.add
      .rectangle(-119, -2, rectWidth - 2, rectHeight, 0xcf5dac, 1)
      .setOrigin(0)
      .setStrokeStyle(2, 0x8d1f6a, 1)
      .setAlpha(0);
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
  #txtColorMove_1(blue) {
    if (blue == true) {
      return (this.#battleTextGameObjectMove_1 = this.#txtBLUE(
        BATTLE_MENU_FONT_PLACEMENT.x,
        BATTLE_MENU_FONT_PLACEMENT.y,
        'Cough Blood'
      ));
    }
    return (this.#battleTextGameObjectMove_1 = this.#txtPINK(
      BATTLE_MENU_FONT_PLACEMENT.x,
      BATTLE_MENU_FONT_PLACEMENT.y,
      'Cough Blood'
    ));
  }
  #txtColorMove_2(blue) {
    if (blue == true) {
      return (this.#battleTextGameObjectMove_2 = this.#txtBLUE(
        BATTLE_MENU_FONT_PLACEMENT.xx,
        BATTLE_MENU_FONT_PLACEMENT.y,
        'Kick Can'
      ));
    }
    return (this.#battleTextGameObjectMove_2 = this.#txtPINK(
      BATTLE_MENU_FONT_PLACEMENT.xx,
      BATTLE_MENU_FONT_PLACEMENT.y,
      'Kick Can'
    ));
  }
  #txtColorMove_3(blue) {
    if (blue == true) {
      return (this.#battleTextGameObjectMove_3 = this.#txtBLUE(
        BATTLE_MENU_FONT_PLACEMENT.x,
        BATTLE_MENU_FONT_PLACEMENT.yy,
        'Pout'
      ));
    }
    return (this.#battleTextGameObjectMove_3 = this.#txtPINK(
      BATTLE_MENU_FONT_PLACEMENT.x,
      BATTLE_MENU_FONT_PLACEMENT.yy,
      'Pout'
    ));
  }
  #txtColorMove_4(blue) {
    if (blue == true) {
      return (this.#battleTextGameObjectMove_4 = this.#txtBLUE(
        BATTLE_MENU_FONT_PLACEMENT.xx,
        BATTLE_MENU_FONT_PLACEMENT.yy,
        'Despair'
      ));
    }
    return (this.#battleTextGameObjectMove_4 = this.#txtPINK(
      BATTLE_MENU_FONT_PLACEMENT.xx,
      BATTLE_MENU_FONT_PLACEMENT.yy,
      'Despair'
    ));
  }
  #txtColorDUEL(blue) {
    if (this.#mainBattleMenuPhaserContainerGameObject.alpha == 1) {
      if (blue == true) {
        return (this.#battleTextGameObjectDUEL = this.#txtBLUE(
          BATTLE_MENU_FONT_PLACEMENT.x,
          BATTLE_MENU_FONT_PLACEMENT.y,
          'En Garde'
        ));
      }
      return (this.#battleTextGameObjectDUEL = this.#txtPINK(
        BATTLE_MENU_FONT_PLACEMENT.x,
        BATTLE_MENU_FONT_PLACEMENT.y,
        'En Garde'
      ));
    }
  }

  #txtColorSWITCH(blue) {
    if (this.#mainBattleMenuPhaserContainerGameObject.alpha == 1) {
      if (blue == true) {
        return (this.#battleTextGameObjectSWITCH = this.#txtBLUE(
          BATTLE_MENU_FONT_PLACEMENT.xx,
          BATTLE_MENU_FONT_PLACEMENT.y,
          'Prayers'
        ));
      }
      return (this.#battleTextGameObjectSWITCH = this.#txtPINK(
        BATTLE_MENU_FONT_PLACEMENT.xx,
        BATTLE_MENU_FONT_PLACEMENT.y,
        'Prayers'
      ));
    }
  }
  #txtColorITEM(blue) {
    if (this.#mainBattleMenuPhaserContainerGameObject.alpha == 1) {
      if (blue == true) {
        return (this.#battleTextGameObjectITEM = this.#txtBLUE(
          BATTLE_MENU_FONT_PLACEMENT.x,
          BATTLE_MENU_FONT_PLACEMENT.yy,
          'Pneumatic'
        ));
      }
      return (this.#battleTextGameObjectITEM = this.#txtPINK(
        BATTLE_MENU_FONT_PLACEMENT.x,
        BATTLE_MENU_FONT_PLACEMENT.yy,
        'Pneumatic'
      ));
    }
  }
  #txtColorFLEE(blue) {
    if (this.#mainBattleMenuPhaserContainerGameObject.alpha == 1) {
      if (blue == true) {
        return (this.#battleTextGameObjectFLEE = this.#txtBLUE(
          BATTLE_MENU_FONT_PLACEMENT.xx,
          BATTLE_MENU_FONT_PLACEMENT.yy,
          'Tincture'
        ));
      }
      return (this.#battleTextGameObjectFLEE = this.#txtPINK(
        BATTLE_MENU_FONT_PLACEMENT.xx,
        BATTLE_MENU_FONT_PLACEMENT.yy,
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
  #txtColorDESTROYmove() {
    this.#battleTextGameObjectMove_1.destroy();
    this.#battleTextGameObjectMove_2.destroy();
    this.#battleTextGameObjectMove_3.destroy();
    this.#battleTextGameObjectMove_4.destroy();
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
          .setPosition(BATTLE_MENU_CURSOR_POS.xx, BATTLE_MENU_CURSOR_POS.y)
          .setRotation(0);
        this.#txtColorDESTROY();
        this.#txtColorDUEL(false);
        this.#txtColorSWITCH(true);
        this.#txtColorITEM(false);
        this.#txtColorFLEE(false);
        return;
      case BATTLE_MENU_OPTIONS.ITEM:
        this.#mainBattleMenuCursorPhaserImageGameObject
          .setPosition(BATTLE_MENU_CURSOR_POS.x, BATTLE_MENU_CURSOR_POS.yy)
          .setRotation(0);
        this.#txtColorDESTROY();
        this.#txtColorDUEL(false);
        this.#txtColorSWITCH(false);
        this.#txtColorITEM(true);
        this.#txtColorFLEE(false);
        return;
      case BATTLE_MENU_OPTIONS.FLEE:
        this.#mainBattleMenuCursorPhaserImageGameObject
          .setPosition(BATTLE_MENU_CURSOR_POS.xx, BATTLE_MENU_CURSOR_POS.yy)
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
      this.#txtColorDESTROYmove();

      this.#txtColorMove_1(true);
      this.#txtColorMove_2(false);
      this.#txtColorMove_3(false);
      this.#txtColorMove_4(false);
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
      this.#txtColorDESTROYmove();

      this.#txtColorMove_1(false);
      this.#txtColorMove_2(true);
      this.#txtColorMove_3(false);
      this.#txtColorMove_4(false);
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
      this.#txtColorDESTROYmove();

      this.#txtColorMove_1(false);
      this.#txtColorMove_2(false);
      this.#txtColorMove_3(true);
      this.#txtColorMove_4(false);
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
      this.#txtColorDESTROYmove();

      this.#txtColorMove_1(false);
      this.#txtColorMove_2(false);
      this.#txtColorMove_3(false);
      this.#txtColorMove_4(true);
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
          ATTACK_MENU_CURSOR_POS.xx,
          ATTACK_MENU_CURSOR_POS.y
        );
        return;
      case ATTACK_MOVE_OPTIONS.MOVE_3:
        this.#attackBattleMenuCursorPhaserImageGameObject.setPosition(
          ATTACK_MENU_CURSOR_POS.x,
          ATTACK_MENU_CURSOR_POS.yy
        );
        return;
      case ATTACK_MOVE_OPTIONS.MOVE_4:
        this.#attackBattleMenuCursorPhaserImageGameObject.setPosition(
          ATTACK_MENU_CURSOR_POS.xx,
          ATTACK_MENU_CURSOR_POS.yy
        );
        return;
      default:
        exhaustiveGuard(this.#selectedAttackMenuOption);
    }
  }
  #switchToMainBattleMenu() {
    this.hideMonsterAttackSubMenu();
    this.showMainBattleMenu();
  }
  #handlePlayerChooseMainBattleOption() {
    this.hideMainBattleMenu();

    if (this.#selectedBattleMenuOption === BATTLE_MENU_OPTIONS.DUEL) {
      this.showMonsterAttackSubMenu();
      return;
    }

    if (this.#selectedBattleMenuOption === BATTLE_MENU_OPTIONS.ITEM) {
      // TODO
      this.updateInfoPaneMessagesAndWaitForInput(['Pneumatic Tube'], () => {
        this.#switchToMainBattleMenu();
      });
      return;
    }

    if (this.#selectedBattleMenuOption === BATTLE_MENU_OPTIONS.SWITCH) {
      this.updateInfoPaneMessagesAndWaitForInput(
        ['God is Dead..', 'His Angels are Starving..'],
        () => {
          this.#switchToMainBattleMenu();
        }
      );
      return;
    }

    if (this.#selectedBattleMenuOption === BATTLE_MENU_OPTIONS.FLEE) {
      this.updateInfoPaneMessagesAndWaitForInput(
        [
          "The Medicine Bag's Latch is Stuck...",
          'You try to wiggle it loose...',
          'If only you had some whale blubber...',
        ],
        () => {
          this.#switchToMainBattleMenu();
        }
      );
      return;
    }

    exhaustiveGuard(this.#selectedBattleMenuOption);
  }
  #handleTopTextContainer() {
    let topTextBgWidth = this.#TopTextBattleGameObject.width - 70;
    let leftCap = 160 - topTextBgWidth / 2 + 1;
    let rightCap = 160 + topTextBgWidth / 2;

    this.#HUDrect01.width = topTextBgWidth;
    this.#HUDrect01.setOrigin(0.5);
    this.#HUDrect02.width = topTextBgWidth;
    this.#HUDrect02.setOrigin(0.5);
    this.#HUDrect03.width = topTextBgWidth;
    this.#HUDrect03.setOrigin(0.5);
    this.#HUDrect04.width = topTextBgWidth;
    this.#HUDrect04.setOrigin(0.5);
    this.#HUDrect05.width = topTextBgWidth;
    this.#HUDrect05.setOrigin(0.5);

    this.#TOPTEXT_CAP_LEFT.setX(leftCap);
    this.#TOPTEXT_CAP_RIGHT.setX(rightCap);

    console.log(this.#HUDrect01);

    // this.#topTextContainer = this.#scene.add.container(160.5, 0, [
    //   this.#scene.add.rectangle(0, 16, topTextBgWidth, 20, 0xedc4ff, 1),
    //   this.#scene.add.rectangle(0, 5.5, topTextBgWidth, 1, 0xb163d2, 1),
    //   this.#scene.add.rectangle(0, 26.5, topTextBgWidth, 1, 0xde92ff, 1),
    //   this.#scene.add.rectangle(0, 4.5, topTextBgWidth, 1, 0xde92ff, 1),
    //   this.#scene.add.rectangle(0, 27.5, topTextBgWidth, 1, 0x9749b8, 1),
    // ]);
  }
  //edc4ff
  //0xde92ff
}
