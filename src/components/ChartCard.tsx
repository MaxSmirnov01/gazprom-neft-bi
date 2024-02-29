import { ReactECharts } from '../Echarts/ReactECharts';
import { Card } from '@consta/uikit/Card';
import { Text } from '@consta/uikit/Text';
import ButtonGroup from './ButtonGroup';
import { useEffect, useState } from 'react';
import { items } from '../data/data';
import type { Item, Data } from '../data/data';

const ChartCard = () => {
  const [value, setValue] = useState<Item>(items[0]);
  const [mockData, setMockData] = useState<Data | null>(null);

  useEffect(() => {
    const requestData = async () => {
      try {
        const response = await fetch(
          'https://65e0de8ad3db23f7624a35cb.mockapi.io/api/v1/data'
        );
        const data = await response.json();
        setMockData(data);
      } catch (error) {
        console.log(error);
      }
    };

    requestData();
  }, []);

  const data =
    mockData && mockData.filter((item) => item.indicator === value.value);

  const average =
    data &&
    (data.reduce((acc, item) => acc + item.value, 0) / data.length).toFixed(1);

  // к сожалению, не хватило времени разобраться как на видео одинаковые интервалы по оси Y для всех валют с числами из данных
  // у меня либо интервалы разные, либо числа не те
  // так же в макете и на видео немного разные график и данные, поэтому сделал вывод что можно сделать со своей небольшой погрешностью

  const minYValue = data && Math.min(...data.map((item) => item.value));
  const maxYValue = data && Math.max(...data.map((item) => item.value)) + 2;

  const interval = minYValue && maxYValue && (maxYValue - minYValue) / 4;

  const option = {
    title: {
      text: `${value.value.toUpperCase()}, ${value.name}/₽`,
      top: 8,
      left: 13,
      textStyle: {
        fontFamily: 'Inter',
        fontWeight: 700,
        fontSize: 20,
        color: 'rgba(0, 32, 51, 1)',
      },
    },
    tooltip: {
      trigger: 'axis',
      textStyle: {
        fontFamily: 'Inter',
        fontWeight: 700,
        color: 'rgba(0, 32, 51, 1)',
        fontSize: 12,
      },

      valueFormatter: (value: string | number) => `${value}₽`,
      extraCssText: 'width: 195px; height: 59px;',
    },
    xAxis: {
      type: 'category',
      data: data && data.map((item) => item.month),
      boundaryGap: false,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        alignMinLabel: 'center',
        color: 'rgba(0, 32, 51, 0.6)',
        fontFamily: 'Open Sans',
        fontSize: 10,
        fontWeight: 400,
        margin: 30,
      },
    },
    yAxis: {
      type: 'value',
      offset: 16,
      min: minYValue,
      max: maxYValue,
      axisTick: {
        show: true,
      },
      axisLabel: {
        color: 'rgba(0, 32, 51, 0.6)',
        fontFamily: 'Inter',
        fontSize: 10,
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: 'rgba(0, 65, 102, 0.2)',
          cap: 'round',
        },
      },
      interval: interval,
    },
    series: [
      {
        name: value.value,
        type: 'line',
        smooth: true,
        symbol: 'none',
        data: data && data.map((item) => item.value),
        lineStyle: {
          normal: {
            color: 'rgba(243, 139, 0, 1)',
            width: 2,
          },
        },
        itemStyle: {
          color: 'rgba(243, 139, 0, 1)',
        },
      },
    ],
  };

  return (
    <>
      {mockData && (
        <Card className="card">
          <ReactECharts
            option={option}
            style={{ width: '1000px', height: '100%' }}
          />
          <div className="cardSection">
            <ButtonGroup value={value} setValue={setValue} />
            <div className="cardText">
              <Text weight="regular" view="secondary">
                Среднее за период
              </Text>
              <div className="average">
                <Text size="4xl" style={{ color: 'rgba(243, 139, 0, 1)' }}>
                  {average}
                </Text>
                <Text view="secondary" size="xl">
                  ₽
                </Text>
              </div>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default ChartCard;
