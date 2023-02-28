import React, {useEffect, useRef} from "react";
import * as echarts from 'echarts';
import {ECharts, EChartsType} from "echarts";
import styles from "./charts.module.less";
import {EChartsOption} from "echarts/types/dist/echarts";

interface Props {
  options?: EChartsOption
}

const CustomCharts = (props: Props) => {
  const {options} = props;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const instance = useRef<EChartsType | null>(null);
  useEffect(() => {
    instance.current = echarts.init(wrapperRef.current!);
    instance.current.setOption(options ? options : {
      title: {
        text: "Default Title"
      },
      tooltip: {},
      xAxis: {
        data: ['Java', 'Kotlin', 'PHP', 'Javascript', 'Typescript', 'Dart']
      },
      yAxis: {},
      series: [
        {
          name: 'Language',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    });

  }, [])
  return <div className={styles.wrapper} ref={wrapperRef}></div>
}

export default CustomCharts;
