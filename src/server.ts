import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerListMcpServers } from "./tools/listMcpServers.js";

export function createServer(): McpServer {
  const server = new McpServer({
    name: "MCP Server for MCP Registry",
    version: "0.1.0",
  });

  registerListMcpServers(server);

  return server;
}
