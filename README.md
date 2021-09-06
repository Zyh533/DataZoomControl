## DataZoomControl

> 简介：一个模拟[Echarts](https://echarts.apache.org)的datazoom功能的组件

* **功能说明**\
实现了一个datazoom组件，可以通过滚动条的移动修改视图的展示位置，也可以通过修改滚动条的大小，对视图进行缩放\
  _（本组件提供了滚动条移动和缩放的接口，需要开发者自行书写移动缩放逻辑）_
---

* **安装使用**

```
npm install datazoomcontrol
或者
yarn add datazoomcontrol
```
```
// 在react项目中引入组件
import DataZoomControl from 'datazoomcontrol';
```

---

* **代码代码案例**

```
<DataZoomControl
    width={500}
    height={24}
    orientation={"horizontal"}
    onBarMove={handleBarMove}
    onBarMoveEnd={handleBarMoveEnd}
    onBarResize={handleBarResize}
    onBarResizeEnd={handleBarResizeEnd}/>
```
---

* **参数详解**

```
export interface DataZoomControlProps {
    width: number,
    height: number,
    orientation?: "horizontal" | "vertical",
    styleConfg?: StyleType,
    onBarMove?: (starta: number, end: number) => void,
    onBarMoveEnd?: (starta: number, end: number) => void,
    onBarResize?: (starta: number, end: number) => void,
    onBarResizeEnd?: (starta: number, end: number) => void
}
```

1. width为组件的宽度。
2. heigh为组件的高度。
3. orientation为组件的布局方式，支持两种类型水平布局(horizontal)和垂直布局（vertical），默认是水平布局。
4. styleConfig为组件的样式，其传入类型如下，目前仅可以修改滑动条颜色和背景轨道的颜色，默认为蓝色和灰色。
5. onBarMove为滑动条移动触发的事件。
6. onBarMoveEnd为滑动条移动结束触发的事件。
7. onBarResize为滚动条长度改变触发的事件。
8. onBarResizeEnd为滚动条长度修改结束触发的事件。/

以上事件传入的参数均为滚动条前后端的位置start,end。
```
export interface StyleType {
    trail?: {
        background: string
    },
    slideBar?: {
        background: string
    }
}
```
