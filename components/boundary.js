import Matter from 'matter-js';
import { View } from 'react-native';

const Boundary = (props) => {
  const width = props.body.bounds.max.x - props.body.bounds.min.x;
  const height = props.body.bounds.max.y - props.body.bounds.min.y;
  const xPos = props.body.position.x - width / 2;
  const yPos = props.body.position.y - height / 2;

  return (
    <View
      style={{
        position: 'absolute',
        left: xPos,
        top: yPos,
        width: width,
        height: height,
        overflow: 'hidden',
        backgroundColor: props.color,
      }}>
    </View>
  );
};

export default (world, color, pos, size, extraOptions) => {
  const TheBoundary = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {
      label: extraOptions.label,
      isStatic: true,
      mass: 10000,
      density: 10000,
      restitution: 1
    }
  );
  

  Matter.World.add(world, TheBoundary);
  
  return {
    body: TheBoundary,
    color,
    pos,
    size,
    extraOptions,
    renderer: <Boundary />,
  };
};
