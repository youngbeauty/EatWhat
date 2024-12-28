import React, { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import Card from "../modules/Card";
import { get } from "../../utilities";
import "./CardSwipe.css";
import "../../utilities";

const CardSwipe = () => {
  const [foods, setFoods] = useState([]);

  // 添加当前卡片索引
  const [currentIndex, setCurrentIndex] = useState(0);
  // 添加用户选择记录
  const [selections, setSelections] = useState({
    accepted: [],
    rejected: [],
  });

  // Fisher-Yates 洗牌算法
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    get("/api/foods").then((foodObjs) => {
      const shuffledFoods = shuffleArray([...foodObjs]);
      setFoods(shuffledFoods);
    });
  }, []);

  // 添加动画属性
  const [{ x, opacity }, cardSwipeApi] = useSpring(() => ({
    x: 0,
    opacity: 1,
  }));

  // 处理卡片操作
  const handleCardAction = (isAccepted) => {
    if (currentIndex >= foods.length) return;

    const currentFood = foods[currentIndex];

    // 更新选择记录
    setSelections((prev) => ({
      accepted: isAccepted ? [...prev.accepted, currentFood] : prev.accepted,
      rejected: isAccepted ? prev.rejected : [...prev.rejected, currentFood],
    }));

    // 设置动画方向
    const direction = isAccepted ? 1 : -1;

    // 播放划出动画
    cardSwipeApi.start({
      to: [
        {
          x: direction * window.innerWidth,
          opacity: 0,
          config: { duration: 300 },
        },
        {
          x: 0,
          opacity: 1,
          immediate: true,
        },
      ],
      onRest: () => {
        // 动画结束后更新索引
        setCurrentIndex((prev) => prev + 1);
      },
    });
  };

  return (
    <div className="Cardswipe-container ">
      {currentIndex < foods.length ? (
        <>
          <animated.div
            style={{
              transform: x.to((x) => `translateX(${x}px)`),
              opacity: opacity,
            }}
          >
            <Card
              name={foods[currentIndex].name}
              description={foods[currentIndex].description}
              image={foods[currentIndex].image}
              nutritionalValue={foods[currentIndex].nutritionalValue}
            />
          </animated.div>

          <div className="Button-container">
            <button className="Button-reject" onClick={() => handleCardAction(false)}>
              拒绝
            </button>
            <button className="Button-accept" onClick={() => handleCardAction(true)}>
              接受
            </button>
          </div>
        </>
      ) : (
        <div className="u-textCenter">
          <h2>没有更多卡片了！</h2>
          <p>接受: {selections.accepted.length} 个</p>
          <p>拒绝: {selections.rejected.length} 个</p>
          {/* 可以显示选择的食物列表 */}
        </div>
      )}

      <div>
        <h3>已接受的食物：</h3>
        {selections.accepted.map((food) => (
          <div className="u-flexColumn" key={food.id}>
            {food.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSwipe;
