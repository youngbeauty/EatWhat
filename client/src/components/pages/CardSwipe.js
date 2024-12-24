import React, { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import Card from "../modules/Card";
import { get } from "../../utilities";
const foodCategories = {
  protein: ["鸡胸肉", "鱼", "牛排", "豆腐"],
  carbs: ["米饭", "面条", "土豆", "全麦面包"],
  vegetables: ["西兰花", "菠菜", "胡萝卜", "番茄"],
  fruits: ["苹果", "香蕉", "橙子", "草莓"],
  rewards: ["巧克力", "冰淇淋", "蛋糕"],
};
const foodDatabase = [
  {
    id: 1,
    type: "蔬菜",
    name: "西兰花炒牛肉",
    description: "富含蛋白质和维生素C",
    image: "/placeholder.svg?height=200&width=200",
    nutritionalValue: "高蛋白,高纤维",
  },
  {
    id: 2,
    type: "蔬菜",
    name: "三文鱼沙拉",
    description: "富含omega-3脂肪酸",
    image: "/placeholder.svg?height=200&width=200",
    nutritionalValue: "高蛋白,高不饱和脂肪酸",
  },
  {
    id: 3,
    type: "蔬菜",
    name: "藜麦鸡肉碗",
    description: "全面的营养餐",
    image: "/placeholder.svg?height=200&width=200",
    nutritionalValue: "高蛋白,高纤维,富含矿物质",
  },
  {
    id: 4,
    type: "蔬菜",
    name: "番茄蛋汤",
    description: "简单而营养",
    image: "/placeholder.svg?height=200&width=200",
    nutritionalValue: "高维生素C,中等蛋白质",
  },
  {
    id: 5,
    type: "蔬菜",
    name: "全麦面包配鳄梨",
    description: "健康的碳水化合物和好脂肪",
    image: "/placeholder.svg?height=200&width=200",
    nutritionalValue: "高纤维,健康脂肪",
  },
];
const CardSwipe = () => {
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    get("/api/foods").then((foodObjs) => {
      setFoods(foodObjs);
    });
    // setFoods(foodDatabase);
  }, []);
  return (
    <div>
      <h2>选择完成!</h2>
      {foods.map((food) => {
        return<Card
          name={food.name}
          description={food.description}
          image={food.image}
          nutritionalValue={food.nutritionalValue}
        ></Card>;
      })}
    </div>
  );
};

export default CardSwipe;
