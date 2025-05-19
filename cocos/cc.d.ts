declare module 'cc' {
  export const _decorator: any;
  export class Component { node: any; }
  export class Node {
    position: any;
    addChild(child: Node): void;
    destroy(): void;
    setPosition(x: number | any, y?: number, z?: number): void;
    getComponent<T>(cls: { new(...args: any[]): T }): T;
  }
  export class Prefab {}
  export class Vec3 {
    x: number; y: number; z: number;
    constructor(x?: number, y?: number, z?: number);
    static distance(a: Vec3, b: Vec3): number;
    clone(): Vec3;
    add(v: Vec3): Vec3;
  }
  export const input: any;
  export namespace Input { const EventType: any; }
  export enum KeyCode { KEY_W, KEY_S, KEY_A, KEY_D }
  export class EventKeyboard { keyCode: number; }
  export function instantiate(prefab: Prefab): Node;
}
