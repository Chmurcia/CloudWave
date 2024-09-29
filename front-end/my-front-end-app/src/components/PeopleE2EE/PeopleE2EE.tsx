import { useEffect } from "react";
import Person from "../Person/Person";
import { motion, useAnimate } from "framer-motion";

const PeopleE2EE = () => {
  const [scope, animate] = useAnimate();
  const [scope2, animate2] = useAnimate();
  const [scope3, animate3] = useAnimate();
  const [scope4, animate4] = useAnimate();

  const myAnimation = async () => {
    while (true) {
      await animate(scope.current, { opacity: 1, x: -100 }, { duration: 0.3 });
      await animate(
        scope.current,
        { opacity: 0, y: 70 },
        { delay: 0.3, duration: 0.3 }
      );
      await animate2(scope2.current, { opacity: 1, y: 80 }, { duration: 0.3 });
      await animate2(scope2.current, { x: 80 }, { delay: 0.3, duration: 0.5 });
      await animate2(
        scope2.current,
        { opacity: 0, y: 70 },
        { delay: 0.3, duration: 0.3 }
      );
      await animate(scope.current, { x: 80, y: 70 }, { duration: 0.1 });
      await animate(scope.current, { opacity: 1, y: 80 }, { duration: 0.3 });
      await animate(
        scope.current,
        { opacity: 0, x: 120 },
        { delay: 0.3, duration: 0.3 }
      );
      await animate(scope.current, { x: -120 }, { duration: 0.1 });
      await animate2(scope2.current, { x: -80 }, { duration: 0.1 });
      await animate3(
        scope3.current,
        { opacity: 1, x: 80 },
        { delay: 0.3, duration: 0.3 }
      );
      await animate3(
        scope3.current,
        { opacity: 0, y: 70 },
        { delay: 0.3, duration: 0.3 }
      );
      await animate4(scope4.current, { opacity: 1, y: 80 }, { duration: 0.3 });
      await animate4(
        scope4.current,
        { x: -100 },
        { delay: 0.3, duration: 0.5 }
      );
      await animate4(
        scope4.current,
        { opacity: 0, y: 70 },
        { delay: 0.3, duration: 0.3 }
      );
      await animate4(scope4.current, { x: 80 }, { duration: 0.1 });
      await animate3(scope3.current, { x: -100, y: 70 }, { duration: 0.1 });
      await animate3(scope3.current, { opacity: 1, y: 80 }, { duration: 0.3 });
      await animate3(
        scope3.current,
        { opacity: 0, x: -150 },
        { delay: 0.3, duration: 0.3 }
      );
      await animate3(scope3.current, { x: 120 }, { duration: 0.1 });
    }
  };

  useEffect(() => {
    myAnimation();
  });
  return (
    <div className="flex justify-around w-full h-[200px] gap-40 relative ">
      <Person color="#DBEAFE" className="fixed left-[-100px]" />
      <motion.p
        initial={{ opacity: 0, x: -120, y: 80 }}
        ref={scope}
        className="absolute text-blue-100 text-xl rounded-md px-4"
      >
        Hi!
      </motion.p>
      <motion.p
        initial={{ opacity: 0, x: -80, y: 70 }}
        ref={scope2}
        className="absolute text-blue-100  rounded-md px-4 text-xl font-normal"
      >
        &234i*7hfj
      </motion.p>
      <motion.p
        initial={{ opacity: 0, x: 120, y: 80 }}
        ref={scope3}
        className="absolute text-slate-500 text-xl"
      >
        Hello!
      </motion.p>
      <motion.p
        initial={{ opacity: 0, x: 80, y: 70 }}
        ref={scope4}
        className="absolute text-xl text-slate-500 font-normal"
      >
        6d*&#b?$#5
      </motion.p>
      <Person color="#475569 " className="fixed right-[-100px]" />
    </div>
  );
};

export default PeopleE2EE;
