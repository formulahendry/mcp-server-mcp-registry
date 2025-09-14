import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

const DEFAULT_REGISTRY_URL = "https://registry.modelcontextprotocol.io/v0/servers";

export function registerSearchMcpServers(server: McpServer) {
    server.tool(
        "search_mcp_servers",
        "Search and discover MCP servers from the MCP Registry. You can search by keywords, filter by status, and paginate through results.",
        {
            query: z.string().optional().describe("Search query to filter servers by name or description"),
            limit: z.number().min(1).max(100).optional().describe("Maximum number of servers to return (1-100, default: 50)"),
            cursor: z.string().optional().describe("Pagination cursor for retrieving next set of results"),
            status: z.enum(["active", "deprecated"]).optional().describe("Filter servers by status (active or deprecated)"),
            registry_url: z.string().url().optional().describe("Base URL of the MCP Registry API (defaults to official registry - https://registry.modelcontextprotocol.io/v0/servers)")
        },
        async ({ query, limit = 50, cursor, status, registry_url = DEFAULT_REGISTRY_URL }) => {
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
            
            let filteredServers = data.servers;
            
            if (query) {
                const searchTerm = query.toLowerCase();
                filteredServers = filteredServers.filter((server: any) => 
                    server.name.toLowerCase().includes(searchTerm) ||
                    server.description.toLowerCase().includes(searchTerm)
                );
            }
            
            if (status) {
                filteredServers = filteredServers.filter((server: any) => server.status === status);
            }

            // Return the filtered array and metadata
            return {
                content: [
                    {
                        type: "text",
                        text: `Found ${filteredServers.length} MCP servers:\n\n${JSON.stringify({
                            servers: filteredServers,
                            metadata: data.metadata
                        }, null, 2)}`
                    }
                ]
            };
        }
    );
}