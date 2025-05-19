import { _decorator, Component, Node, Prefab, instantiate, Vec3, input, Input, KeyCode, EventKeyboard } from 'cc';
import { Snake } from './Snake';
import { Food } from './Food';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
  @property(Prefab)
  snakePrefab: Prefab | null = null;

  @property(Prefab)
  foodPrefab: Prefab | null = null;

  private snake: Node | null = null;
  private food: Node | null = null;

  start() {
    if (this.snakePrefab) {
      this.snake = instantiate(this.snakePrefab);
      this.node.addChild(this.snake);
    }
    this.spawnFood();
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
  }

  onDestroy() {
    input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
  }

  spawnFood() {
    if (!this.foodPrefab) return;
    if (this.food) this.food.destroy();
    this.food = instantiate(this.foodPrefab);
    this.node.addChild(this.food);
    this.food.setPosition(Math.random() * 300 - 150, Math.random() * 300 - 150, 0);
  }

  onKeyDown(event: EventKeyboard) {
    const comp = this.snake?.getComponent(Snake);
    if (!comp) return;
    switch (event.keyCode) {
      case KeyCode.KEY_W:
        comp.setDirection(new Vec3(0, 1, 0));
        break;
      case KeyCode.KEY_S:
        comp.setDirection(new Vec3(0, -1, 0));
        break;
      case KeyCode.KEY_A:
        comp.setDirection(new Vec3(-1, 0, 0));
        break;
      case KeyCode.KEY_D:
        comp.setDirection(new Vec3(1, 0, 0));
        break;
    }
  }

  update(dt: number) {
    const snakeComp = this.snake?.getComponent(Snake);
    snakeComp?.move(dt);
    if (!this.food || !this.snake) return;
    if (Vec3.distance(this.snake.position, this.food.position) < 10) {
      this.spawnFood();
    }
  }
}
