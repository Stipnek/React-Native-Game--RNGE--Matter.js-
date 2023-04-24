import Matter from 'matter-js';
import Constants from './Constants';

let ballKicked = false;

let moveLeft = true;
let moveRight = false;
let backPlace = false;

const Physics = (entities, { touches, time, dispatch, events }) => {
  let engine = entities.physics.engine;

  Matter.Engine.update(engine, 1000 / 60);

  //enemy goalKeeper movement
  if (moveLeft === true) {
    Matter.Body.translate(entities.TheEnemyGoalkeeper.body, { x: -0.5, y: 0 });
    timeOutLeft = setTimeout(() => {
      moveLeft = false;
      moveRight = true;
    }, 1000);
  } else if (moveRight === true) {
    Matter.Body.translate(entities.TheEnemyGoalkeeper.body, { x: 1.0, y: 0 });
    timeOutRight = setTimeout(() => {
      moveLeft = false;
      moveRight = false;
      backPlace = true;
    }, 1000);
  } else if (backPlace === true) {
    Matter.Body.translate(entities.TheEnemyGoalkeeper.body, { x: -0.5, y: 0 });
    timeOutBack = setTimeout(() => {
      moveLeft = true;
      moveRight = false;
      backPlace = false;
    }, 1000);
  }

  //first kick
  setInterval(() => {
    if (!ballKicked) {
      Matter.Body.setVelocity(entities.TheBall.body, {
        x: (Math.random() < 0.5 ? -1 : 1) * Math.ceil(Math.random() * 9),
        y: (Math.random() < 0.5 ? -1 : 1) * Math.ceil(Math.random() * 9),
      });
      ballKicked = true;
    }
  }, 1000);

  // kick the ball
  // touches
  //   .filter((t) => t.type === 'press')
  //   .forEach((t) => {
  //     Matter.Body.setVelocity(entities.TheBall.body, {
  //       x: Math.floor(Math.random() * 10 + 1) * (Math.random() < 0.5 ? -1 : 1),
  //       // x: 0,
  //       y: Math.floor(Math.random() * 10 + 1) * (Math.random() < 0.5 ? -1 : 1),
  //     });
  //   });

  //touch the ball
  // let x = entities.TheBall.body.position.x;
  // let y = entities.TheBall.body.position.y;
  // touches
  //   .filter((t) => t.type === 'move')
  //   .forEach((t) => {
  //     x += t.delta.pageX;
  //     y += t.delta.pageY;
  //     Matter.Body.setPosition(entities.TheBall.body, {
  //       x: x,
  //       y: y,
  //     });
  //   });

  //Player Control
  if (events.length) {
    for (let i = 0; i < events.length; i++) {
      if (events[i].type === 'move-left') {
        Matter.Body.translate(entities.ThePlayer.body, { x: -7, y: 0 });
      }
      if (events[i].type === 'move-right') {
        Matter.Body.translate(entities.ThePlayer.body, { x: 7, y: 0 });
      }
    }
  }

  //COLLUSIONS

  //player save
  Matter.Events.on(engine, 'collisionStart', (event) => {
    const pairs = event.pairs;

    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i];
      const bodyA = pair.bodyA;
      const bodyB = pair.bodyB;

      if (bodyA.label === 'TheBall' && bodyB.label === 'Player') {
        dispatch({ type: 'score' });

        Matter.Body.setVelocity(entities.TheBall.body, {
          x: Math.floor(Math.random() * 2) * 2 - 3,
          // y: Math.floor(Math.random() * 4) - 8,
          y: 8,
        });
      }
    }
  });

  //player goal
  Matter.Events.on(engine, 'collisionStart', (event) => {
    const pairs = event.pairs;

    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i];
      const bodyA = pair.bodyA;
      const bodyB = pair.bodyB;

      if (bodyA.label === 'TheBall' && bodyB.label === 'FootballGoal') {
        dispatch({ type: 'score' });
      }
    }
  });

  //Enemy goalkeeper hits
  Matter.Events.on(engine, 'collisionStart', (event) => {
    const pairs = event.pairs;

    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i];
      const bodyA = pair.bodyA;
      const bodyB = pair.bodyB;

      if (bodyA.label === 'TheBall' && bodyB.label === 'EnemyGoalkeeper') {
        Matter.Body.setVelocity(entities.TheBall.body, {
          x: Math.floor(Math.random() * 2) * 2 - 3,
          y: Math.floor(Math.random() * 4) - 7,
        });
      }
    }
  });

  //enemy kick
  Matter.Events.on(engine, 'collisionStart', (event) => {
    const pairs = event.pairs;

    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i];
      const bodyA = pair.bodyA;
      const bodyB = pair.bodyB;

      if (bodyA.label === 'TheBall' && bodyB.label === 'Enemy1') {
        Matter.Body.setVelocity(entities.TheBall.body, {
          x: Math.floor(Math.random() * 2) + 3,
          y: Math.floor(Math.random() * 3) + 4,
        });
      }
      if (bodyA.label === 'TheBall' && bodyB.label === 'Enemy2') {
        Matter.Body.setVelocity(entities.TheBall.body, {
          x: Math.floor(Math.random() * 2) + 3,
          y: Math.floor(Math.random() * 3) + 4,
        });
      }
      if (bodyA.label === 'TheBall' && bodyB.label === 'Enemy3') {
        Matter.Body.setVelocity(entities.TheBall.body, {
          x: Math.floor(Math.random() * 2) + 3,
          y: Math.floor(Math.random() * 3) + 4,
        });
      }
      if (bodyA.label === 'TheBall' && bodyB.label === 'Enemy4') {
        Matter.Body.setVelocity(entities.TheBall.body, {
          x: Math.floor(Math.random() * 2) + 3,
          y: Math.floor(Math.random() * 3) + 4,
        });
      }
      if (bodyA.label === 'TheBall' && bodyB.label === 'Enemy5') {
        Matter.Body.setVelocity(entities.TheBall.body, {
          x: Math.floor(Math.random() * 2) + 3,
          y: Math.floor(Math.random() * 3) + 4,
        });
      }
    }
  });

  //GAME OVER
  Matter.Events.on(engine, 'collisionStart', (event) => {
    const pairs = event.pairs;

    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i];
      const bodyA = pair.bodyA;
      const bodyB = pair.bodyB;

      if (bodyA.label === 'TheBall' && bodyB.label === 'BottomBoundary') {
        dispatch({ type: 'game_over' });

        Matter.Body.setPosition(entities.TheBall.body, {
          x: Constants.WINDOW_WIDTH / 2,
          y: Constants.WINDOW_HEIGHT / 3,
        });
        Matter.Body.setVelocity(entities.TheBall.body, {
          x: 0,
          y: 0,
        });
        Matter.Body.setPosition(entities.ThePlayer.body, {
          x: Constants.WINDOW_WIDTH / 2,
          y: Constants.WINDOW_HEIGHT / 1.1,
        });
        Matter.Body.setPosition(entities.TheEnemy1.body, {
          x: Math.floor(Math.random() * 231) + 50,
          y: Math.floor(Math.random() * 301) + 100,
        });
        Matter.Body.setPosition(entities.TheEnemy2.body, {
          x: Math.floor(Math.random() * 231) + 50,
          y: Math.floor(Math.random() * 301) + 100,
        });
        Matter.Body.setPosition(entities.TheEnemy3.body, {
          x: Math.floor(Math.random() * 231) + 50,
          y: Math.floor(Math.random() * 301) + 100,
        });
        Matter.Body.setPosition(entities.TheEnemy4.body, {
          x: Math.floor(Math.random() * 231) + 50,
          y: Math.floor(Math.random() * 301) + 100,
        });
        Matter.Body.setPosition(entities.TheEnemy5.body, {
          x: Math.floor(Math.random() * 231) + 50,
          y: Math.floor(Math.random() * 301) + 100,
        });
        Matter.Body.setPosition(entities.TheEnemyGoalkeeper.body, {
          x: Constants.WINDOW_WIDTH / 2,
          y: Constants.WINDOW_HEIGHT / 24,
        });

        ballKicked = false;
      }
    }
  });

  return entities;
};
export default Physics;
