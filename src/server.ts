import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerSearchMcpServers } from "./tools/searchMcpServers.js";

export function createServer(): McpServer {
  const server = new McpServer({
    name: "MCP Server for MCP Registry",
    version: "0.1.0",
  });

  registerSearchMcpServers(server);

  return server;
}
