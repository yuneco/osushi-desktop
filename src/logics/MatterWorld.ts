import Matter from 'matter-js'

type PosEventHandler = (pos: { x: number; y: number; r: number }) => void

export default class MatterEngine {
  private engine: Matter.Engine
  private world: Matter.World

  /**
   * 新しい物理演算エンジンのインスタンスとデバッグ用のビューを生成します
   * @param selector デバッグ用のビューを置くhtml要素のセレクター
   */
  constructor(selector: string, mouseControllerSelector: string) {
    const Render = Matter.Render as any
    const parent = document.querySelector(selector)
    const WORLD_WIDTH = parent?.clientWidth || 400
    const WORLD_HEIGHT = parent?.clientHeight || 600
    const engine = (this.engine = Matter.Engine.create())
    const world = (this.world = engine.world)
    const render = Render.create({
      element: parent,
      engine: engine,
      options: {
        width: WORLD_WIDTH * 1,
        height: WORLD_HEIGHT * 1,
        showAngleIndicator: true,
        showCollisions: true,
        showVelocity: true
      }
    })
    Render.lookAt(render, {
      min: { x: WORLD_WIDTH * 0, y: WORLD_HEIGHT * 0 },
      max: { x: WORLD_WIDTH * 1, y: WORLD_HEIGHT * 1 }
    })
    Render.run(render)

    const runner = Matter.Runner.create({})
    Matter.Runner.run(runner, engine)

    // 床を作る
    const wallThickness = 50
    const floor = Matter.Bodies.rectangle(
      WORLD_WIDTH / 2,
      WORLD_HEIGHT + wallThickness / 2,
      WORLD_WIDTH + wallThickness,
      wallThickness,
      {
        isStatic: true,
        restitution: 0,
        friction: 1,
        density: 1000
      }
    )
    console.log(WORLD_HEIGHT)
    const wallLeft = Matter.Bodies.rectangle(
      -wallThickness / 2,
      WORLD_HEIGHT / 2,
      wallThickness,
      WORLD_HEIGHT + wallThickness,
      {
        isStatic: true,
        restitution: 0,
        friction: 1,
        density: 1000
      }
    )
    const wallRight = Matter.Bodies.rectangle(
      WORLD_WIDTH + wallThickness / 2,
      WORLD_HEIGHT / 2,
      wallThickness,
      WORLD_HEIGHT + wallThickness,
      {
        isStatic: true,
        restitution: 0,
        friction: 1,
        density: 1000
      }
    )
    Matter.World.add(world, [floor, wallLeft, wallRight])

    // デバッグ用のマウスコントローラ
    const contElem = document.querySelector(mouseControllerSelector)
    const mouse = Matter.Mouse.create(contElem || render.canvas)
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.9,
        render: {
          visible: true,
          lineWidth: 1,
          strokeStyle: 'red'
        }
      } as any
    })
    Matter.World.add(world, mouseConstraint)
    render.mouse = mouse
  }

  addRect(
    x: number,
    y: number,
    w: number,
    h: number,
    onMoveHandler: PosEventHandler
  ) {
    const rect = Matter.Bodies.rectangle(x, y, w, h, {
      density: 1000
    })
    let lastPos = Matter.Vector.clone(rect.position)
    let lastAngle = 0
    Matter.World.add(this.world, rect)
    Matter.Events.on(this.engine, 'afterUpdate', () => {
      if (
        lastPos.x === rect.position.x &&
        lastPos.y === rect.position.y &&
        lastAngle === rect.angle
      ) {
        return
      }
      lastPos = Matter.Vector.clone(rect.position)
      lastAngle = rect.angle
      onMoveHandler({ x: lastPos.x, y: lastPos.y, r: lastAngle })
    })
    return rect
  }
}
