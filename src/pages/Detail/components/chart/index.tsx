import Canvas from '@antv/f2-react';
import { Chart as ChartComp, Area, Line, Axis } from '@antv/f2';
import styles from './index.module.css';

export default function Chart({ hourList = [] }) {

  return (
    <div className={styles.chart}>
      <div className={styles.title}>Today</div>
      {
       hourList &&
       hourList.length > 0 ?
       (
          <Canvas pixelRatio={window.devicePixelRatio} height="87">
            <ChartComp
              data={hourList}
              scale={{
                time: {
                  tickCount: 6,
                },
                temp: {
                  min: 0,
                },
              }}
            >
              <Axis
                field="time"
                // nice={false}
                style={{
                  label: { align: 'between' },
                }}
              />
              <Area
                x="time"
                y="temp"
                color="l(90) 0:#E9C939 1:#ffffff"
                shape="smooth"
              />
              <Line
                x="time"
                y="temp"
                color="#E9C939"
                shape="smooth"
              />
            </ChartComp>
          </Canvas>
        ) : null
      }
    </div>
  );
}
