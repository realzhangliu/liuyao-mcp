import { McpServer, StdioServerTransport } from "@modelcontextprotocol/server";
import * as z from "zod";
import * as Liuyao from "./liuyao.js";

//创建服务器
const server = new McpServer({
  name: "liuyao-mcp",
  version: "1.0.0",
});

//注册
//获取干支
server.registerTool(
  "lunar",
  {
    title: "获取指定时间的干支",
    description: "获取指定时间的干支,年干支,月干支,日干支,时干支",
    inputSchema: z.object({
      timestamp: z.number().describe("unix timestamp milliseconds"),
    }),
  },
  async ({ timestamp }) => {
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(
            {
              bazi: {
                year: ["甲", "子"],
                month: ["乙", "丑"],
                day: ["丙", "寅"],
                hour: ["丁", "卯"],
              },
            },
            null,
            2,
          ),
        },
      ],
    };
  },
);

server.registerTool(
  "getDateTime",
  {
    title: "获取当前时间（上海）",
    description: "获取当前时间（上海）,以RFC3339和unix time stamp格式返回",
    outputSchema: z.object({
      datetime: z.string().describe("当前时间（上海）,格式是RFC3339"),
      timestamp: z
        .number()
        .describe("当前（上海）时间,格式是unix timestamp milliseconds"),
    }),
  },
  async () => {
    const now = new Date();
    const result = {
      datetime: now.toLocaleString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Shanghai",
      }),
      timestamp: now.getTime(),
    };
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify({ result }),
        },
      ],
      structuredContent: result,
    };
  },
);
//获取六爻排盘
server.registerTool(
  "getLiuYaoByCoins",
  {
    title: "根据硬币/摇钱获取六爻排盘",
    description: "根据硬币/摇钱获取六爻排盘",
    inputSchema: z.object({
      chuyao: z.number().describe("初爻,取值:6|7|8|9"),
      eryao: z.number().describe("二爻,取值:6|7|8|9"),
      sanyao: z.number().describe("三爻,取值:6|7|8|9"),
      siyao: z.number().describe("四爻,取值:6|7|8|9"),
      wuyao: z.number().describe("五爻,取值:6|7|8|9"),
      shangyao: z.number().describe("上爻,取值:6|7|8|9"),
    }),
  },
  async ({ chuyao, eryao, sanyao, siyao, wuyao, shangyao }) => {
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify({}, null, 2),
        },
      ],
    };
  },
);
server.registerTool(
  "getLuyaoByBagua",
  {
    title: "根据两个八卦获取六爻排盘",
    description: "指定下卦,上卦和动爻来排出六爻盘",
    inputSchema: z.object({
      xiagua: z.string().describe("八卦名字,乾兑离震巽坎艮坤"),
      shanggua: z.string().describe("八卦名字,乾兑离震巽坎艮坤"),
      dongyao: z.number().describe("动爻的位置,1到6"),
    }),
  },
  async ({ xiagua, shanggua, dongyao }) => {
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify({}),
        },
      ],
    };
  },
);
const transport = new StdioServerTransport();
await server.connect(transport);

console.error("✅ MCP Server 已启动 (stdio)"); // stderr 不会被协议干扰
