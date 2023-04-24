import ball from '../components/ball';
import boundary from '../components/boundary';
import player from '../components/player';
import enemy from '../components/enemy';
import Matter from 'matter-js';
import Constants from '../Constants';
import Images from '../Images';

const Ball = Images.ball;
const Goalkeeper = Images.goalkeeper;
const Boy = Images.boy;
const Man = Images.man;
const Woman = Images.woman;

export default (gameWorld) => {
  let engine = Matter.Engine.create({ enableSleeping: false });
  engine.constraintIterations = 10;
  engine.positionIterations = 10;
  engine.velocityIterations = 10;

  let world = engine.world;

  engine.gravity.x = 0;
  engine.gravity.y = 0;

  return {
    physics: { engine, world },

    TheBall: ball(
      world,
      'none',
      { x: Constants.WINDOW_WIDTH / 2, y: Constants.WINDOW_HEIGHT / 3 },
      { height: 20, width: 20 },
      {
        label: 'TheBall',
        source: Ball,
      }
    ),

    ThePlayer: player(
      world,
      'none',
      { x: Constants.WINDOW_WIDTH / 2, y: Constants.WINDOW_HEIGHT / 1.1 },
      { width: 50, height: 10 },
      {
        label: 'Player',
        source: Goalkeeper,
      }
    ),

    TheEnemyGoalkeeper: enemy(
      world,
      'none',
      { x: Constants.WINDOW_WIDTH / 2, y: Constants.WINDOW_HEIGHT / 24 },
      { width: 30, height: 10 },
      {
        label: 'EnemyGoalkeeper',
        source: Goalkeeper,
        isStatic: true,
      }
    ),

    TheEnemy1: enemy(
      world,
      'none',
      {
        x: Math.floor(Math.random() * 231) + 50,
        y: Math.floor(Math.random() * 401) + 100,
      },
      { width: 30, height: 30 },
      {
        label: 'Enemy1',
        source: Boy,
      }
    ),

    TheEnemy2: enemy(
      world,
      'none',
      {
        x: Math.floor(Math.random() * 231) + 50,
        y: Math.floor(Math.random() * 401) + 100,
      },
      { width: 30, height: 30 },
      {
        label: 'Enemy2',
        source: Woman,
      }
    ),

    TheEnemy3: enemy(
      world,
      'none',
      {
        x: Math.floor(Math.random() * 231) + 50,
        y: Math.floor(Math.random() * 401) + 100,
      },
      { width: 30, height: 30 },
      {
        label: 'Enemy3',
        source: Boy,
      }
    ),

    TheEnemy4: enemy(
      world,
      'none',
      {
        x: Math.floor(Math.random() * 231) + 50,
        y: Math.floor(Math.random() * 401) + 100,
      },
      { width: 30, height: 30 },
      {
        label: 'Enemy4',
        source: Man,
      }
    ),

    TheEnemy5: enemy(
      world,
      'none',
      {
        x: Math.floor(Math.random() * 231) + 50,
        y: Math.floor(Math.random() * 401) + 100,
      },
      { width: 30, height: 30 },
      {
        label: 'Enemy5',
        source: Woman,
      }
    ),

    LeftBoundary: boundary(
      world,
      'white',
      { x: Constants.WINDOW_WIDTH / 10, y: Constants.WINDOW_HEIGHT / 2 },
      { height: Constants.WINDOW_HEIGHT, width: 5 },
      { label: 'LeftBoundary' }
    ),

    RightBoundary: boundary(
      world,
      'white',
      { x: Constants.WINDOW_WIDTH / 1.1, y: Constants.WINDOW_HEIGHT / 2 },
      { height: Constants.WINDOW_HEIGHT, width: 5 },
      { label: 'RightBoundary' }
    ),

    TopBoundary: boundary(
      world,
      'white',
      { x: Constants.WINDOW_WIDTH / 2, y: 5 },
      { height: 5, width: Constants.WINDOW_WIDTH },
      { label: 'TopBoundary' }
    ),

    BottomBoundary: boundary(
      world,
      'white',
      { x: Constants.WINDOW_WIDTH / 2, y: Constants.WINDOW_HEIGHT },
      { height: 5, width: Constants.WINDOW_WIDTH },
      { label: 'BottomBoundary' }
    ),

    FootballGoal: boundary(
      world,
      'grey',
      { x: Constants.WINDOW_WIDTH / 2, y: 10 },
      { height: 5, width: Constants.WINDOW_WIDTH / 5 },
      { label: 'FootballGoal' }
    ),
  };
};
