import {
  BATTLE_ASSET_KEYS,
  BATTLE_BACKGROUND_ASSET_KEYS,
  HEALTH_BAR_ASSET_KEYS,
  MONSTER_ASSET_KEYS,
  UI_ASSET_KEYS,
} from '../assets/asset-keys.js';
import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from './scene-keys.js';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({
      key: SCENE_KEYS.PRELOAD_SCENE,
    });
  }

  preload() {
    console.log(`[${PreloadScene.name}:preload] invoked`);

    const monsterTamerAssetPath = 'assets/images/monster-tamer';
    const kenneysAssetPath = 'assets/images/kenneys-assets';

    // battle backgrounds
    this.load.image(
      BATTLE_BACKGROUND_ASSET_KEYS.FOREST,
      `${monsterTamerAssetPath}/battle-backgrounds/forest-background.png`
    );

    // battle assets
    this.load.image(
      BATTLE_ASSET_KEYS.HEALTH_BAR_BACKGROUND,
      `${monsterTamerAssetPath}/battle-backgrounds/syringe-healthbar.png`
    );

    // health bar assets
    this.load.image(
      HEALTH_BAR_ASSET_KEYS.RIGHT_CAP,
      `${kenneysAssetPath}/ui-space-expansion/barHorizontal_green_right.png`
    );
    this.load.image(
      HEALTH_BAR_ASSET_KEYS.MIDDLE,
      `${kenneysAssetPath}/ui-space-expansion/barHorizontal_green_mid.png`
    );
    this.load.image(
      HEALTH_BAR_ASSET_KEYS.LEFT_CAP,
      `${monsterTamerAssetPath}/battle-backgrounds/syringe-nubbin.png`
    );

    // monster assets
    this.load.spritesheet(
      MONSTER_ASSET_KEYS.ENEMY,
      `${monsterTamerAssetPath}/monsters/carnodusk.png`,
      {
        frameWidth: 64,
        frameHeight: 64,
      }
    );
    //monster asset
    this.load.spritesheet(
      MONSTER_ASSET_KEYS.ORPHAN,
      `${monsterTamerAssetPath}/monsters/iguanignite.png`,
      {
        frameWidth: 58,
        frameHeight: 70,
      }
    );

    //ui assets
    this.load.image(
      UI_ASSET_KEYS.CURSOR,
      `${monsterTamerAssetPath}/cursor.png`
    );

    this.load.image(
      UI_ASSET_KEYS.TOPTEXTCONTAINER,
      `${monsterTamerAssetPath}/top-texture-container-gameobject.png`
    );
  }

  create() {
    console.log(`[${PreloadScene.name}:create] invoked`);
    this.scene.start(SCENE_KEYS.BATTLE_SCENE);
  }
}
