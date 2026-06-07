## liuyao-mcp

liuyao is Chinese ancient fortune tell tool to help figure out people's fortune, especially in helping make decision when comes to crossroad in life.

## what include

1. standard mcp functionalites.
2. build liuyao's sheet.

## project startup

```shell
# 1. 装运行时依赖
npm install @modelcontextprotocol/server zod

# 2. 装开发依赖
npm install -D typescript @types/node tsx

# 3. 生成 tsconfig.json（自动生成，之后按需改几个关键字段）
npx tsc --init

# 4. 写好代码后，两种方式跑：

# 方式A：开发时，直接用 tsx 跑 TS 源码（不编译）
npx tsx src/index.ts

# 方式B：编译后跑 JS
npx tsc                    # 编译 src/*.ts → build/*.js
node build/index.js        # 运行编译产物
npx tsc --init

package.json 脚本配置
"scripts": {
  "build": "tsc",
  "dev": "tsx src/index.ts",
  "start": "node build/index.js"
}
这样你就可以 npm run dev 开发，npm run build && npm run start 跑生产。

```

## dev

```shell
npm run dev
npx @modelcontextprotocol/inspector
```

## json

```js
interface LiuyaoResult {
  // === 时间 ===
  datetime: {
    gregorian: string;          // "2026-06-06 14:30"
    timestamp: number;          // unix ms
  };

  // === 干支 ===
  ganzhi: {
    year:  [string, string];    // ["丙", "午"]
    month: [string, string];    // ["甲", "午"]
    day:   [string, string];    // ["辛", "酉"]
    hour:  [string, string];    // ["乙", "未"]
    empty: [string, string];    // 旬空 ["戌", "亥"]
  };

  // === 本卦 ===
  hexagram: {
    name:      string;          // "水火既济"
    symbol:    string;          // "䷾" (Unicode 卦符)
    upper:     string;          // "坎" (上卦)
    lower:     string;          // "离" (下卦)
    palace:    string;          // 所属宫 "坎宫"
    generation: string;         // 世爻在第几 "三世卦"

    lines: LiuyaoLine[];        // 6个爻，index 0 = 初爻
  };

  // === 变卦（如有动爻） ===
  changed?: {
    name:   string;
    symbol: string;
    lines:  LiuyaoLine[];
  };

  // === 神煞 ===
  shensha: string[];            // ["青龙", "天乙贵人", ...]
}

interface LiuyaoLine {
  position:   number;           // 0-5，对应初爻→上爻
  name:       string;           // "初九" | "六二" | ...
  yinyang:    "yin" | "yang";  // 阴/阳
  changing:   boolean;          // 是否动爻

  liuqin:     string;           // 六亲: "兄弟"|"子孙"|"妻财"|"官鬼"|"父母"|"兄弟"
  lioushou:   string;           // 六兽: "青龙"|"朱雀"|"勾陈"|"腾蛇"|"白虎"|"玄武"
  shiying:    "世" | "应" | null; // 世应标识
  fushen?:    string;           // 伏神（如有）
  feishen?:   string;           // 飞神（如有）
}
//输出时这样用：
return {
    content: [{
        type: "text",
        text: JSON.stringify(liuyaoResult, null, 2)
    }]
}
```

## todo list

1. lunar, provide calender search, convert.
2. build liuyao sheet
3. shensha sheet
4. important info shiyao, dongyao, shansha combine with liuyao.
5.
