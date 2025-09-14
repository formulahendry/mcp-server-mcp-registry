# MCP Server for MCP Registry

A Model Context Protocol (MCP) server that provides tools to interact with the MCP Registry. This server allows you to discover and search for available MCP servers in the registry.

## ✨ Features

- **List MCP Servers**: Browse and search through available MCP servers in the registry
- **Pagination Support**: Handle large result sets with cursor-based pagination
- **Custom Registry URLs**: Support for custom MCP registry endpoints
- **Semantic Search Ready**: Returns raw server data optimized for semantic analysis

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ 

### Installation

#### VS Code

Install the MCP server in VS Code using below buttons:

[![Install in VS Code](https://img.shields.io/badge/Install_MCP_Server_(npx)-VS_Code-0098FF)](https://insiders.vscode.dev/redirect?url=vscode%3Amcp%2Finstall%3F%257B%2522name%2522%253A%2522mcp-registry%2522%252C%2522command%2522%253A%2522npx%2522%252C%2522args%2522%253A%255B%2522-y%2522%252C%2522mcp-server-mcp-registry%2540latest%2522%255D%257D) [![Install in VS Code Insiders](https://img.shields.io/badge/Install_MCP_Server_(npx)-VS_Code_Insiders-24bfa5)](https://insiders.vscode.dev/redirect?url=vscode-insiders%3Amcp%2Finstall%3F%257B%2522name%2522%253A%2522mcp-registry%2522%252C%2522command%2522%253A%2522npx%2522%252C%2522args%2522%253A%255B%2522-y%2522%252C%2522mcp-server-mcp-registry%2540latest%2522%255D%257D)

Alternatively, you can add configuration in `mcp.json`:

```json
{
    "servers": {
        "mcp-registry": {
            "command": "npx",
            "args": [
                "-y",
                "mcp-server-mcp-registry@latest"
            ]
        }
    }
}
```

### 📋 Available Tools

#### `list_mcp_servers`

Lists MCP servers from the MCP Registry with optional pagination and filtering.

**Parameters:**
- `limit` (optional): Maximum number of servers to return (1-100, default: 50)
- `cursor` (optional): Pagination cursor for retrieving next set of results
- `registry_url` (optional): Base URL of the MCP Registry API (defaults to https://registry.modelcontextprotocol.io/v0/servers)

## 📚 Related

- [Model Context Protocol](https://modelcontextprotocol.io/)
- [MCP Registry](https://github.com/modelcontextprotocol/registry)
