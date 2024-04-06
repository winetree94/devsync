---@type LazySpec
return {
  "AstroNvim/astrocommunity",
  { import = "astrocommunity.pack.rust" },
  { import = "astrocommunity.pack.lua" },
  -- catppuccin theme
  { import = "astrocommunity.colorscheme.catppuccin" },
  { "catppuccin/nvim" },
  { import = "astrocommunity.completion.copilot-lua" },
  {
    "zbirenbaum/copilot.lua",
    opts = {
      suggestion = {
        keymap = {
          accept = "<C-l>",
          accept_word = false,
          accept_line = false,
          next = "<C-.>",
          prev = "<C-,>",
          dismiss = "<C/>",
        },
      },
    },
  },
}
