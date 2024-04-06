# Download Configuration
GIST_USERNAME="winetree94"
GIST_ID_ZSHRC="f251dac4a5e57b125967d6c27b4e76b1"
GIST_FILENAME_ZSHRC=".zshrc"
GIST_ID_TMUX_CONF="6af3028ad825fe6dd5cfc1e72573b596"
GIST_FILENAME_TMUX_CONF=".tmux.conf"

# automatically install antigen
if [ ! -f ~/.antigen.zsh ]
then
  echo "antigen not found, automatically installing..."
  curl -L git.io/antigen > ~/.antigen.zsh
fi

# setup plugin manager
source ~/.antigen.zsh

# Load the oh-my-zsh's library.
antigen use oh-my-zsh

# Bundles from the default repo (robbyrussell's oh-my-zsh).
antigen bundle git
antigen bundle command-not-found

# Syntax highlighting bundle.
antigen bundle zsh-users/zsh-autosuggestions
antigen bundle zsh-users/zsh-completions

# Dev environment
antigen bundle lukechilds/zsh-nvm

# Load the theme.
antigen theme robbyrussell

# Tell Antigen that you're done.
antigen apply

# register local bin
export PATH=~/.local/bin:$PATH
