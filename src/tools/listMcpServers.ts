import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

const DEFAULT_REGISTRY_URL = "https://registry.modelcontextprotocol.io/v0/servers";

export function registerListMcpServers(server: McpServer) {
    server.tool(
        "list_mcp_servers",
        "List MCP servers from the MCP Registry with optional pagination. Returns raw server data for semantic analysis.",
        {
            limit: z.number().min(1).max(100).optional().describe("Maximum number of servers to return (1-100, default: 50)"),
            cursor: z.string().optional().describe("Pagination cursor for retrieving next set of results"),
            registry_url: z.string().url().optional().describe("Base URL of the MCP Registry API (defaults to official registry - https://registry.modelcontextprotocol.io/v0/servers)")
        },
        async ({ limit = 50, cursor, registry_url = DEFAULT_REGISTRY_URL }) => {
            const url = new URL(registry_url);
            
            if (cursor) {
                url.searchParams.set("cursor", cursor);
            }
            
            if (limit) {
                url.searchParams.set("limit", limit.toString());
            }

            const response = await fetch(url.toString());
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            
            // Return all servers without filtering - let semantic search handle matching
            const hasMoreData = data.metadata && data.metadata.next_cursor;
            const paginationHint = hasMoreData 
                ? `Note: This is a paginated result. There are more MCP servers available. Use cursor "${data.metadata.next_cursor}" to retrieve the next page.\n\n`
                : '';
            
            const totalCount = data.servers ? data.servers.length : 0;
            const countInfo = `Total MCP servers in this response: ${totalCount}\n\n`;
            
            return {
                content: [
                    {
                        type: "text",
                        text: `${countInfo}${paginationHint}${JSON.stringify({
                            servers: data.servers,
                            metadata: data.metadata
                        }, null, 2)}`
                    }
                ]
            };
        }
    );
}