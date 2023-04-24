import { View, Image } from "react-native";
import Matter from "matter-js";

const Enemy = (props) => {
  const width = props.body.bounds.max.x - props.body.bounds.min.x;
  const height = props.body.bounds.max.y - props.body.bounds.min.y;
  const xPos = props.body.position.x - width / 2;
  const yPos = props.body.position.y - height / 2;

  
  return (
    <View
      style={{
        width: props.size.width,
        height: props.size.height,
        left: xPos,
        top: yPos,
        backgroundColor: props.color,
        position: "absolute",
      }}>
      <Image
        style={{
          resizeMode: 'cover',
          height: 30,
          width: 30,
        }}
        source={props.extraOptions.source}
      />
      </View>
  );
};

export default (world, color, pos, size, extraOptions) => {
  const TheEnemy = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {
      label: extraOptions.label,
      friction: 1,
      frictionAir: 0,
      frictionStatic: 0,
      restitution: 1,
      mass: 5000,
      density: 5000,
      isStatic: extraOptions.isStatic,
    }
  );
  Matter.World.add(world, TheEnemy);
  return { body: TheEnemy, color, pos, size, extraOptions, renderer: <Enemy /> };
};