---@type LazySpec
return {
  "AstroNvim/astrolsp",
  ---@type AstroLSPOpts
  opts = {
    formatting = {
      timeout_ms = 3000,
      disabled = {
        "lua_ls",
        "tsserver",
        "html",
      },
    },
    ---@diagnostic disable: missing-fields
    config = {
      eslint = {
        on_attach = function(_, bufnr)
          vim.api.nvim_create_autocmd("BufWritePre", {
            buffer = bufnr,
            command = "EslintFixAll",
          })
        end,
      },
    },
  },
}
