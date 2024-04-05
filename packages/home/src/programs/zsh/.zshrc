#
# @description
#
# This is zsh configuration that can be synchronize with other platforms or devices
# it will automatically install plugin manager "antigen"
#
# if you want to use with your personal configurations, just fork and edit gist variables
# after first setup, you can use 'updateProfile' function in the shell
# 'updateProfile' will update your .zshrc profile automatically
#
# curl -L https://gist.github.com/winetree94/f251dac4a5e57b125967d6c27b4e76b1/raw/.zshrc > ~/.zshrc
#

# Download Configuration
GIST_USERNAME="winetree94"
GIST_ID_ZSHRC="f251dac4a5e57b125967d6c27b4e76b1"
GIST_FILENAME_ZSHRC=".zshrc"
GIST_ID_TMUX_CONF="6af3028ad825fe6dd5cfc1e72573b596"
GIST_FILENAME_TMUX_CONF=".tmux.conf"

# update function 
function downloadProfile {
  curl -L https://gist.github.com/$GIST_USERNAME/$GIST_ID_ZSHRC/raw/$GIST_FILENAME_ZSHRC > ~/.zshrc
}

# automatically install antigen
function updateNvim {
  if [ ! -d $HOME/.config/nvim ]
  then
    rm -rf $HOME/.config/nvim
  fi
  git clone --depth 1 https://github.com/AstroNvim/AstroNvim ~/.config/nvim
  git clone --depth 1 winetree94:winetree94/AstroVimWebDevelopment.git ~/.config/nvim/lua/user
}

# update tmux conf
function downloadTmuxConf {
  if [ ! -d "$HOME/.tmux/plugins/tpm" ]; then
    mkdir -p ~/.tmux/plugins
    git clone --depth 1 https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm
  fi
  curl -L https://gist.github.com/$GIST_USERNAME/$GIST_ID_TMUX_CONF/raw/$GIST_FILENAME_TMUX_CONF > ~/.tmux.conf
}

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
