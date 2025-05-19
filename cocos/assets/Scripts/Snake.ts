import { _decorator, Component, Vec3 } from 'cc';
const { ccclass } = _decorator;

@ccclass('Snake')
export class Snake extends Component {
  direction: Vec3 = new Vec3(1, 0, 0);
  speed: number = 100;

  setDirection(dir: Vec3) {
    this.direction = dir.clone();
  }

  move(dt: number) {
    const delta = new Vec3(this.direction.x * this.speed * dt,
                           this.direction.y * this.speed * dt,
                           0);
    const pos = this.node.position.clone();
    pos.add(delta);
    this.node.setPosition(pos);
  }
}
