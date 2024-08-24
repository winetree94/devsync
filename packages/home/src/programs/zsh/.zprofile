OS_TYPE=$(uname)
ARCH=$(arch)

if [ -d /proc/version ]; then
  if grep -qEi "(microsoft|wsl)" /proc/version; then
      echo "WSL Environment"
      WSL=true
  else
      WSL=false
  fi
fi

# register local bin
export PATH=~/.local/bin:$PATH

source ~/.zprofile.sh

# load homebrew
if [ -f /opt/homebrew/bin/brew ]; then
  eval "$(/opt/homebrew/bin/brew shellenv)"
elif [ -f /home/linuxbrew/.linuxbrew/bin/brew ]; then
  eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
fi

# WSLg 사용 시 fcitx 사용
export QT_IM_MODULE=fcitx
export GTK_IM_MODULE=fcitx
export XMODIFIERS=@im=fcitx
export DefaultIMModule=fcitx

if which fcitx-autostart >/dev/null 2>&1; then
  fcitx-autostart >/dev/null 2>&1
fi

export EMSDK_QUIET=1

if [ -f ~/GitPrograms/emsdk/emsdk_env.sh ]; then
  source "/home/winetree94/GitPrograms/emsdk/emsdk_env.sh"
fi

# Volta 설치 디렉토리
VOLTA_HOME="$HOME/.volta"

# Volta 디렉토리 존재 여부 확인
if [ -d "$VOLTA_HOME" ]; then
  export VOLTA_FEATURE_PNPM=1
  export PATH="$VOLTA_HOME/bin:$PATH"
fi

# load nvm
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
