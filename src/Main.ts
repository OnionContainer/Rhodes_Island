import GameConfig from "./GameConfig";
import SceneManager from "./SceneManager";
import FixTime from "./Fix/FixTime";
import RhodesGame from "./Game/RhodesGame";
import { EventCentre } from "./Event/EventCentre";
import DodResourceMgr from "./Resources/DodResourceMgr";
import PerformanceCentre from "./Common/Graphics/Performance_Module/PerformanceCentre";
import { Vec2 } from "./Common/DodMath";
import Actor from "./Game/Actor/Actor";
import { ActorType } from "./Common/DodKey";

class Main {
	constructor() {
		//根据IDE设置初始化引擎		
		if (window["Laya3D"]) Laya3D.init(GameConfig.width, GameConfig.height);
		else Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
		Laya["Physics"] && Laya["Physics"].enable();
		Laya["DebugPanel"] && Laya["DebugPanel"].enable();
		Laya.stage.scaleMode = GameConfig.scaleMode;
		Laya.stage.screenMode = GameConfig.screenMode;
		//兼容微信不支持加载scene后缀场景
		Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;

		//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
		if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
		if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"]) Laya["PhysicsDebugDraw"].enable();
		if (GameConfig.stat) Laya.Stat.show();
		Laya.alertGlobalError = true;

		//GAME INIT (GLOBAL MODULE)
		console.log("PC init");
		PerformanceCentre.initialize(Laya.stage);

		//test
		PerformanceCentre.instance.initBoard([
			[0,0,0,0],
			[0,0,0,0]
		], new Vec2(50,50), new Vec2(100,100), "#ff00ff", "#ffff00");
		
		//test end

		FixTime.init();
		RhodesGame.Instance.init();
		DodResourceMgr.Instance.init();
		EventCentre.init();

		//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
		Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
	}

	public onVersionLoaded(): void {
		//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
		Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
	}

	public onConfigLoaded(): void {

		

		SceneManager.Instance.awake();
		

		//test
		DodResourceMgr.Instance.init();
		
		//Awake Game Engine Loop
		Laya.timer.loop(16, this, this._update);
		
	}

	private _update(): void {
		FixTime.update();
		RhodesGame.Instance.update();
		DodResourceMgr.Instance.update();
	}
}

//激活启动类
new Main();
